import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ─── Bedrock client ──────────────────────────────────────────────────────────
if (!process.env.AWS_BEARER_TOKEN_BEDROCK) {
  console.error('❌ Missing AWS_BEARER_TOKEN_BEDROCK environment variable.');
  process.exit(1);
}

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

// ─── Model config ────────────────────────────────────────────────────────────
// Two separate models: fast/cheap for selection, quality for generation
const MODELS = {
  selection: 'us.anthropic.claude-haiku-4-5-20251001-v1:0',   // Step 1: pick skills
  generation: 'us.anthropic.claude-sonnet-4-6',               // Step 2: answer user
};

// ─── Frontmatter parser ──────────────────────────────────────────────────────
// Reads only the first 600 bytes of each SKILL.md — never loads full content
function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const meta = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    meta[key] = value;
  }
  return meta;
}

// ─── Skill index: built from frontmatter only ────────────────────────────────
// Scans skills/ for subdirectories containing SKILL.md
// Reads only first 600 bytes per file — the index never loads full content
let skillIndex = [];

async function buildSkillIndex() {
  const skillsDir = process.env.SKILLS_DIR || path.join(__dirname, 'skills');
  let entries;

  try {
    entries = await fs.readdir(skillsDir, { withFileTypes: true });
  } catch {
    console.error('❌ skills/ directory not found');
    return [];
  }

  const folders = entries.filter(e => e.isDirectory());

  const parsed = await Promise.all(folders.map(async (folder) => {
    const skillMdPath = path.join(skillsDir, folder.name, 'SKILL.md');

    try {
      // Read only first 600 bytes — enough for frontmatter, never full content
      const fd = await fs.open(skillMdPath);
      const buf = Buffer.alloc(600);
      const { bytesRead } = await fd.read(buf, 0, 600, 0);
      await fd.close();

      const head = buf.slice(0, bytesRead).toString('utf-8');
      const meta = parseFrontmatter(head);
      if (!meta?.name || !meta?.description) return null;

      return {
        id: folder.name,       // folder name is the stable ID
        name: meta.name,
        description: meta.description,
        file: skillMdPath,     // stored for lazy-loading later
      };
    } catch {
      return null;             // folder exists but no SKILL.md — skip silently
    }
  }));

  return parsed.filter(Boolean);
}

// ─── Lazy content loader ─────────────────────────────────────────────────────
// Only called AFTER a skill is selected — strips frontmatter, trims to limit
async function loadSkillContent(skill, charLimit = 2000) {
  try {
    const raw = await fs.readFile(skill.file, 'utf-8');
    // Strip frontmatter block before sending content to LLM
    const content = raw.replace(/^---[\s\S]*?---\n/, '').trim();
    return content.slice(0, charLimit);
  } catch {
    return '';
  }
}

// ─── Step 1: Skill selection — uses Haiku (fast, cheap) ─────────────────────
async function selectRelevantSkills(userPrompt) {
  const prompt = `You are a skill selection agent. Given a user prompt and available skills, select only the most relevant ones.

User Prompt: "${userPrompt}"

Available Skills:
${skillIndex.map((s, i) => `${i + 1}. ID="${s.id}" | Name="${s.name}"
   Description: ${s.description}`).join('\n\n')}

Return a JSON array of selected skills ranked by relevance.
Include confidence (0-1) and a short reason for each.

Format: [{"id": "skill-id", "confidence": 0.95, "reason": "why relevant"}]

Return ONLY the JSON array, no other text.`;

  try {
    const command = new InvokeModelCommand({
      modelId: MODELS.selection,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const response = await bedrockClient.send(command);
    const body = JSON.parse(new TextDecoder().decode(response.body));
    const text = body.content[0].text;

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];

    const selected = JSON.parse(jsonMatch[0]);

    // Enrich with index metadata so frontend has everything it needs
    return selected.map(s => ({
      ...s,
      name: skillIndex.find(si => si.id === s.id)?.name || s.id,
      description: skillIndex.find(si => si.id === s.id)?.description || '',
      modelUsed: MODELS.selection,
    }));
  } catch (error) {
    console.error('Error selecting skills:', error);
    return [];
  }
}

// ─── Step 2: Response generation — uses Sonnet (quality) ─────────────────────
async function generateResponse(userPrompt, selectedSkills) {
  // Lazy-load full content only for the selected skills
  const skillContents = (await Promise.all(
    selectedSkills.map(async (s) => {
      const skill = skillIndex.find(si => si.id === s.id);
      if (!skill) return null;
      const content = await loadSkillContent(skill);
      return { id: s.id, name: s.name, content };
    })
  )).filter(Boolean);

  const augmentedPrompt = skillContents.length > 0
    ? `You are an expert developer assistant with access to the following project documentation:

${skillContents.map((sc, i) => `[SKILL ${i + 1}: ${sc.name}]
${sc.content}
---`).join('\n\n')}

User Request: "${userPrompt}"

Please provide a helpful response based on the documentation above.`
    : `You are an expert developer assistant.\n\nUser Request: "${userPrompt}"\n\nPlease provide a helpful response.`;

  try {
    const command = new InvokeModelCommand({
      modelId: MODELS.generation,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 4000,
        messages: [{ role: 'user', content: augmentedPrompt }],
      }),
    });

    const response = await bedrockClient.send(command);
    const body = JSON.parse(new TextDecoder().decode(response.body));

    return {
      text: body.content[0].text,
      augmentedPrompt,
      skillContents,
      modelUsed: MODELS.generation,
    };
  } catch (error) {
    console.error('Error generating response:', error);
    return {
      text: 'Error generating response',
      augmentedPrompt,
      skillContents,
      modelUsed: MODELS.generation,
    };
  }
}

// ─── SSE endpoint with streaming updates ─────────────────────────────────────
app.post('/api/process-prompt-stream', async (req, res) => {
  try {
    const { prompt, skillsEnabled = true } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const sendEvent = (eventType, data) => {
      res.write(`event: ${eventType}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    console.log('\n🔍 Processing prompt:', prompt);

    // Send initial event
    sendEvent('start', {
      message: 'Starting to process your prompt',
      userPrompt: prompt,
      allSkills: skillIndex.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description,
        selected: false,
      })),
    });

    // Step 1 — Skill selection (Haiku) or skip if disabled
    let selectedSkills = [];

    if (skillsEnabled) {
      sendEvent('selection-start', {
        message: 'Analyzing your prompt and selecting relevant skills...',
        model: MODELS.selection,
      });

      console.log(`📚 [${MODELS.selection}] Selecting skills...`);
      selectedSkills = await selectRelevantSkills(prompt);
      console.log(`✓ Selected: ${selectedSkills.map(s => s.id).join(', ') || 'none'}`);

      sendEvent('selection-complete', {
        message: `Selected ${selectedSkills.length} relevant skill${selectedSkills.length !== 1 ? 's' : ''}`,
        selectedSkills: selectedSkills.map(s => ({
          id: s.id,
          name: s.name,
          description: s.description,
          confidence: s.confidence,
          reason: s.reason,
          selected: true,
        })),
        allSkills: skillIndex.map(s => ({
          id: s.id,
          name: s.name,
          description: s.description,
          selected: selectedSkills.some(ss => ss.id === s.id),
        })),
      });

      // Step 2 — Load skill contents
      sendEvent('augmentation-start', {
        message: 'Loading skill documentation and augmenting prompt...',
        skillCount: selectedSkills.length,
      });
    } else {
      console.log('⏩ Skills disabled - skipping selection');
      sendEvent('selection-complete', {
        message: 'Skills disabled - generating direct response',
        selectedSkills: [],
        allSkills: skillIndex.map(s => ({
          id: s.id,
          name: s.name,
          description: s.description,
          selected: false,
        })),
        skillsEnabled: false,
      });
    }

    // Step 3 — Generate response (Sonnet)
    sendEvent('generation-start', {
      message: 'Generating response with augmented context...',
      model: MODELS.generation,
    });

    console.log(`🤖 [${MODELS.generation}] Generating response...`);
    const { text, augmentedPrompt, skillContents, modelUsed } = await generateResponse(prompt, selectedSkills);
    console.log('✓ Response generated\n');

    // Send final result
    sendEvent('complete', {
      success: true,
      flow: {
        userPrompt: prompt,
        allSkills: skillIndex.map(s => ({
          id: s.id,
          name: s.name,
          description: s.description,
          selected: selectedSkills.some(ss => ss.id === s.id),
        })),
        selectedSkills: selectedSkills.map(s => ({
          id: s.id,
          name: s.name,
          description: s.description,
          confidence: s.confidence,
          reason: s.reason,
          selected: true,
        })),
        skillContents,
        augmentedPrompt,
        llmResponse: text,
        skillsEnabled,
        models: {
          selection: {
            id: MODELS.selection,
            label: 'Haiku 4.5',
            step: 'Skill selection',
          },
          generation: {
            id: MODELS.generation,
            label: 'Sonnet 4.6',
            step: 'Response generation',
            modelUsed,
          },
        },
      },
    });

    res.end();
  } catch (error) {
    console.error('Error processing prompt:', error);
    res.write(`event: error\n`);
    res.write(`data: ${JSON.stringify({ error: 'Internal server error', message: error.message })}\n\n`);
    res.end();
  }
});

// ─── Main endpoint (kept for backwards compatibility) ─────────────────────────
app.post('/api/process-prompt', async (req, res) => {
  try {
    const { prompt, skillsEnabled = true } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    console.log('\n🔍 Processing prompt:', prompt);

    // Step 1 — Skill selection (Haiku) or skip if disabled
    let selectedSkills = [];

    if (skillsEnabled) {
      console.log(`📚 [${MODELS.selection}] Selecting skills...`);
      selectedSkills = await selectRelevantSkills(prompt);
      console.log(`✓ Selected: ${selectedSkills.map(s => s.id).join(', ') || 'none'}`);
    } else {
      console.log('⏩ Skills disabled - skipping selection');
    }

    // Step 2 — Generate response (Sonnet)
    console.log(`🤖 [${MODELS.generation}] Generating response...`);
    const { text, augmentedPrompt, skillContents, modelUsed } = await generateResponse(prompt, selectedSkills);
    console.log('✓ Response generated\n');

    // ── Response shape designed for flow diagram highlighting ─────────────────
    //
    // flow.allSkills        → render ALL skill nodes in the diagram (unselected = grey)
    // flow.selectedSkills   → highlight these nodes
    //   .confidence         → use for highlight intensity (0 = dim, 1 = bright)
    //   .reason             → show in tooltip on hover
    //   .selected           → boolean flag for easy filtering
    // flow.models           → annotate each pipeline step with which model ran it
    //
    res.json({
      success: true,
      flow: {
        // Input
        userPrompt: prompt,

        // All skill nodes for the diagram (so unselected ones still render)
        allSkills: skillIndex.map(s => ({
          id: s.id,
          name: s.name,
          description: s.description,
          selected: selectedSkills.some(ss => ss.id === s.id),
        })),

        // Selected skills with confidence + reason for highlighting
        selectedSkills: selectedSkills.map(s => ({
          id: s.id,
          name: s.name,
          description: s.description,
          confidence: s.confidence,   // 0–1, use for glow/opacity intensity
          reason: s.reason,           // show in tooltip
          selected: true,
        })),

        // Content injected into the prompt (for debug/augmented prompt panel)
        skillContents,
        augmentedPrompt,

        // Final answer
        llmResponse: text,

        // Skills enabled flag
        skillsEnabled,

        // Model metadata — annotate flow diagram steps
        models: {
          selection: {
            id: MODELS.selection,
            label: 'Haiku 4.5',
            step: 'Skill selection',
          },
          generation: {
            id: MODELS.generation,
            label: 'Sonnet 4.6',
            step: 'Response generation',
            modelUsed,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error processing prompt:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// ─── Skills endpoint — load all nodes for initial diagram render ──────────────
app.get('/api/skills', (req, res) => {
  res.json({
    skills: skillIndex.map(s => ({
      id: s.id,
      name: s.name,
      description: s.description,
    })),
  });
});

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', skillsLoaded: skillIndex.length, models: MODELS });
});

// ─── Startup ──────────────────────────────────────────────────────────────────
async function startServer() {
  skillIndex = await buildSkillIndex();

  console.log(`\n🚀 Agent Skill Visualizer Backend`);
  console.log(`📍 Running on http://localhost:${PORT}`);
  console.log(`📚 Skills indexed: ${skillIndex.length} (frontmatter only)`);
  console.log(`🎯 Selection model : ${MODELS.selection}`);
  console.log(`✨ Generation model: ${MODELS.generation}`);
  if (skillIndex.length > 0) {
    console.log(`\nSkills found:`);
    skillIndex.forEach(s => console.log(`  • ${s.id}: ${s.description.slice(0, 65)}...`));
  }
  console.log('');

  app.listen(PORT);
}

startServer();