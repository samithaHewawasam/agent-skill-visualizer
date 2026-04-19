# Agent Skill Visualizer

An interactive visualization tool to demonstrate how an LLM agent selects skills and augments prompts. Perfect for Knowledge Transfer (KT) sessions and educational purposes.

## Features

- 🎯 **Dynamic Flow Visualization**: See the complete flow from user prompt to LLM response using React Flow
- 🧠 **Skill Selection**: Watch how the LLM analyzes your prompt and selects relevant skills
- ✨ **Prompt Augmentation**: Visualize how the original prompt is enhanced with skill documentation
- 📊 **Confidence Metrics**: See confidence scores for each selected skill
- 🎨 **Beautiful UI**: Modern, dark-themed interface with smooth animations
- 🔄 **Real-time Processing**: Process prompts with AWS Bedrock Claude in real-time

## Architecture

```
┌─────────────┐      HTTP      ┌─────────────┐      AWS SDK    ┌─────────────┐
│   React     │ ─────────────> │   Node.js   │ ─────────────> │     AWS     │
│   Frontend  │   (Axios)      │   Backend   │   (Bedrock)    │   Bedrock   │
└─────────────┘                └─────────────┘                └─────────────┘
     │                                │                              │
     │                                │                              │
     v                                v                              v
React Flow                      Skills JSON                   Claude 3.5
Visualization                   Skills MD Files                 Sonnet
```

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Flow** for flow diagrams
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **AWS SDK** for Bedrock
- **Claude 3.5 Sonnet** via AWS Bedrock
- **CORS** enabled for local development

## Prerequisites

- Node.js 18+ and npm
- AWS Account with Bedrock access
- AWS IAM credentials with Bedrock permissions

## Installation

### 1. Clone the repository (if applicable)
```bash
cd agent-skill-visualizer
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Configure Environment Variables

#### Backend Configuration
Create `backend/.env` file:
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and add your AWS credentials:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
PORT=3001
```

#### Frontend Configuration
Create `.env` file in the root:
```bash
cp .env.example .env
```

The default configuration should work:
```env
VITE_API_URL=http://localhost:3001
```

## Running the Application

### Option 1: Run Both Servers Separately

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
Backend will start on http://localhost:3001

#### Terminal 2 - Frontend Server
```bash
npm run dev
```
Frontend will start on http://localhost:5173

### Option 2: Use Concurrently (Optional)
You can install `concurrently` to run both servers with one command:
```bash
npm install -D concurrently
```

Add this script to root `package.json`:
```json
"scripts": {
  "dev:all": "concurrently \"cd backend && npm run dev\" \"npm run dev\""
}
```

Then run:
```bash
npm run dev:all
```

## Usage

1. **Open the Application**: Navigate to http://localhost:5173
2. **Enter a Prompt**: Type a development task in the textarea (or click an example prompt)
3. **Submit**: Click "Visualize Flow" button
4. **Watch the Magic**:
   - The system analyzes your prompt
   - Selects relevant skills with confidence scores
   - Augments the prompt with skill documentation
   - Generates an LLM response
   - Displays everything in an animated flow diagram

## Example Prompts

Try these prompts to see different skill selections:

- "Create a new list page with search and pagination"
- "Build a form with validation using react-hook-form"
- "Implement a card-based layout with GenericCard"
- "Add a new route and menu item to the application"
- "Set up state management with Zustand"
- "Create a multi-step wizard with form validation"

## Project Structure

```
agent-skill-visualizer/
├── backend/
│   ├── skills/
│   │   ├── skills.json              # Structured skill metadata
│   │   └── *.md                     # Original documentation files
│   ├── server.js                    # Express server with AWS Bedrock
│   ├── package.json
│   └── .env                         # AWS credentials (not in git)
├── src/
│   ├── api/
│   │   └── index.ts                 # API client
│   ├── components/
│   │   ├── FlowDiagram.tsx          # Main flow visualization
│   │   └── FlowNodes.tsx            # Custom node components
│   ├── types/
│   │   └── index.ts                 # TypeScript types
│   ├── App.tsx                      # Main React component
│   ├── index.css                    # Tailwind imports
│   └── main.tsx                     # React entry point
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## How It Works

### 1. User Input
User enters a prompt in the textarea describing what they want to build.

### 2. Skill Selection
The backend sends the prompt to Claude via AWS Bedrock with instructions to:
- Analyze the prompt
- Review available skills (from `skills.json`)
- Select relevant skills with confidence scores
- Provide reasons for each selection

### 3. Prompt Augmentation
The backend:
- Loads the full documentation for selected skills
- Combines the original prompt with skill content
- Creates an augmented prompt with context

### 4. LLM Response
The augmented prompt is sent to Claude to generate a helpful response.

### 5. Visualization
The frontend displays the entire flow in an animated React Flow diagram:
- **Blue Node**: User's original prompt
- **Purple Node**: Skill analysis step
- **Green Nodes**: Individual selected skills with confidence bars
- **Orange Node**: Prompt augmentation step
- **Teal Node**: Final LLM response

## Skills Included

The demo includes IntelliOps documentation covering:
- Component Patterns (panels, cards, tables, lists)
- Design System (tokens, colors, spacing)
- Form Patterns (react-hook-form validation)
- Layout Patterns (PageLayout, ContentLayout)
- API & Types (React Query, TypeScript)
- State Management (Zustand)
- Navigation (routing, menus)
- Project Structure
- Specialized Features

## AWS Bedrock Setup

### Required Permissions
Your AWS IAM user needs these permissions:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel"
      ],
      "Resource": "arn:aws:bedrock:*::foundation-model/anthropic.claude-*"
    }
  ]
}
```

### Model Access
1. Go to AWS Bedrock console
2. Navigate to "Model access"
3. Request access to "Claude 3.5 Sonnet"
4. Wait for approval (usually instant)

## Troubleshooting

### Backend won't start
- Verify AWS credentials in `backend/.env`
- Check if port 3001 is available
- Ensure AWS Bedrock access is granted

### Frontend can't connect to backend
- Verify backend is running on http://localhost:3001
- Check `VITE_API_URL` in `.env`
- Look for CORS errors in browser console

### Skills not loading
- Check `backend/skills/skills.json` exists
- Verify markdown files are in `backend/skills/`
- Review backend logs for file reading errors

### AWS Bedrock errors
- Verify IAM permissions
- Check model access in Bedrock console
- Ensure region is correct (us-east-1)
- Verify credentials are valid

## Customization

### Adding New Skills
1. Add markdown documentation to `backend/skills/`
2. Update `backend/skills/skills.json` with metadata:
```json
{
  "id": "new-skill",
  "name": "New Skill Name",
  "description": "What this skill covers",
  "keywords": ["keyword1", "keyword2"],
  "category": "Category",
  "file": "new-skill.md",
  "useCases": ["Use case 1", "Use case 2"]
}
```

### Changing LLM Model
Edit `backend/server.js` and change the `modelId`:
```javascript
modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0'
// or
modelId: 'anthropic.claude-opus-4-5-20251101-v2:0'
```

### Customizing Flow Appearance
Edit node styles in `src/components/FlowNodes.tsx`:
- Change colors
- Adjust sizes
- Modify layouts
- Add new node types

## Performance Tips

- Skills are limited to first 1500 characters to avoid token limits
- Flow animation intervals can be adjusted in `FlowDiagram.tsx`
- Consider caching skill content on backend for faster responses

## License

MIT

## Contributing

This is a demo project for educational purposes. Feel free to fork and customize for your own use cases!

## Support

For issues or questions, please create an issue in the repository or contact the maintainers.

---

Built with ❤️ for Knowledge Transfer sessions
