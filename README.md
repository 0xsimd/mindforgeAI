<div align="center">
  <a href="https://mindforgeai.app">
    <img src="https://raw.githubusercontent.com/0xsimd/mindforgeAI/refs/heads/main/frontend/public/mindforge.png" style="margin: 15px; max-width: 150px" width="15%" alt="Logo">
  </a>
</div>
<p align="center">
  <em>Open-Source AI Agent Research Platform</em>
</p>

<p align="center">
  <a href="https://www.mindforgeai.app/"><img src="https://img.shields.io/badge/App-mindforgeai.app-blue?style=for-the-badge" alt="Try it out"></a>
  <a href="https://x.com/mindforge__ai"><img src="https://img.shields.io/badge/X.com-Follow-1DA1F2?style=for-the-badge&logo=x&logoColor=white" alt="Follow on X.com"></a>
</p>

## Mindforge Overview

Mindforge is an open-source AI agent research platform designed for conducting experiments that analyze the behavior of multi-agent AI systems.

App: [mindforgeai.app](https://mindforgeai.app)

CA: H96vSNGEEXgc2vUkz2rcHxt7FAoFMnRfsiZfHL8epump

Dev: [0xsimd](https://github.com/0xsimd)

Docs: [mindforgeai.gitbook.io](https://mindforgeai.gitbook.io/mindforgeai)

## Mindforge Setup  

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4 # or your preferred model
```
4. Build and start the server:
```bash
npm run build
npm start
```

For development:
```bash
npm run dev
```

## API Endpoints

### Sessions

#### GET /api/sessions
Get all previous conversation sessions.

Response:
```json
[
  {
    "id": "session_123",
    "timestamp": "2023-12-20T12:00:00Z",
    "topic": "Space Exploration",
    "agents": [...],
    "messages": [...],
    "analytics": {...}
  }
]
```

#### GET /api/sessions/:sessionId
Get a specific session by ID.

Response:
```json
{
  "id": "session_123",
  "timestamp": "2023-12-20T12:00:00Z",
  "topic": "Space Exploration",
  "agents": [...],
  "messages": [...],
  "analytics": {...}
}
```

### Agents

#### POST /api/agents
Create a custom agent.

Request body:
```json
{
  "isRandom": false,
  "conversationTopic": "Space Exploration",
  "name": "Dr. Sarah",
  "personality": "Analytical and curious",
  "background": "Astrophysicist",
  "expertise": ["astronomy", "physics"],
  "beliefs": ["scientific method", "space exploration"],
  "quirks": ["uses space metaphors"],
  "communication": "Technical but clear"
}
```

Response:
```json
{
  "name": "Dr. Sarah",
  "personality": "Analytical and curious",
  "background": "Astrophysicist",
  "expertise": ["astronomy", "physics"],
  "beliefs": ["scientific method", "space exploration"],
  "quirks": ["uses space metaphors"],
  "communication": "Technical but clear",
  "traits": ["analytical", "curious", "expert"]
}
```

#### POST /api/agents/random
Generate random agents for a conversation.

Request body:
```json
{
  "topic": "Space Exploration",
  "numberOfAgents": 3
}
```

Response:
```json
[
  {
    "name": "Dr. Sarah",
    "personality": "...",
    "background": "...",
    "traits": [...]
  },
  ...
]
```

### Conversation

#### POST /api/conversation
Start a new conversation.

Request body:
```json
{
  "topic": "Space Exploration",
  "messagesPerAgent": 3
}
```

Response:
```json
{
  "id": "session_123",
  "timestamp": "2023-12-20T12:00:00Z",
  "topic": "Space Exploration",
  "agents": [...],
  "messages": [
    {
      "agentName": "Dr. Sarah",
      "content": "The possibilities of interstellar travel fascinate me...",
      "timestamp": "2023-12-20T12:00:01Z"
    },
    ...
  ],
  "analytics": {...}
}
```

#### GET /api/conversation/:sessionId/analysis
Get detailed analysis of a conversation.

Response:
```json
{
  "mainTopics": [...],
  "agentBehaviorAnalysis": {
    "Dr. Sarah": {
      "cognitivePatterns": "...",
      "emotionalResponses": "...",
      "biasesObserved": [...],
      "adaptabilityScore": 85,
      "consistencyWithRole": "...",
      "uniqueCharacteristics": [...]
    }
  },
  "interactionDynamics": {
    "powerDynamics": "...",
    "influencePatterns": [...],
    "groupPolarization": "...",
    "cognitiveAlignment": "..."
  },
  "experimentMetrics": {
    "ideaDiversity": 80,
    "conversationDepth": 75,
    "emotionalIntelligence": 85,
    "logicalConsistency": 90,
    "creativityScore": 80
  },
  "emergentBehaviors": [...],
  "researchImplications": [...],
  "summary": {
    "mainConclusions": [...],
    "keyDiscussionPoints": [...],
    "agreements": [...],
    "disagreements": [...],
    "overallTone": "...",
    "suggestedNextTopics": [...]
  }
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 400: Bad Request (invalid input)
- 404: Not Found
- 500: Internal Server Error

Error responses include a message:
```json
{
  "error": "Error message here"
}
``` 
