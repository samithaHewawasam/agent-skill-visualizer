export interface Skill {
  id: string;
  name: string;
  description: string;
  selected: boolean;
}

export interface SelectedSkill {
  id: string;
  name: string;
  description: string;
  confidence: number;
  reason: string;
  selected: true;
}

export interface SkillContent {
  id: string;
  name: string;
  content: string;
}

export interface ModelInfo {
  id: string;
  label: string;
  step: string;
  modelUsed?: string;
}

export interface FlowData {
  userPrompt: string;
  allSkills: Skill[];
  selectedSkills: SelectedSkill[];
  augmentedPrompt: string;
  skillContents: SkillContent[];
  llmResponse: string;
  skillsEnabled: boolean;
  models: {
    selection: ModelInfo;
    generation: ModelInfo;
  };
}

export interface ProcessPromptResponse {
  success: boolean;
  flow: FlowData;
}

export interface FlowNodeData {
  label: string;
  description?: string;
  type: 'prompt' | 'skill-selection' | 'skill' | 'augmentation' | 'llm-response';
  data?: any;
}

export type StreamEventType =
  | 'start'
  | 'selection-start'
  | 'selection-complete'
  | 'augmentation-start'
  | 'generation-start'
  | 'complete'
  | 'error';

export interface StreamEvent {
  message?: string;
  userPrompt?: string;
  allSkills?: Skill[];
  selectedSkills?: SelectedSkill[];
  model?: string;
  skillCount?: number;
  skillsEnabled?: boolean;
  flow?: FlowData;
  success?: boolean;
  error?: string;
}
