import OpenAI from 'openai';
import { config } from '../config/config';
import { Agent, Message, ChatAnalytics, AgentCreationOptions } from '../types';

export class OpenAIService {
  private openai: OpenAI;
  private model: string;

  constructor() {
    this.openai = new OpenAI({
      apiKey: config.openAI.apiKey
    });
    this.model = config.openAI.model;
  }

  async generateRandomAgent(options: AgentCreationOptions): Promise<Agent> {
    let systemPrompt = '';
    
    if (options.isRandom) {
      systemPrompt = `Create a unique chat agent that would be interesting in a conversation about "${options.conversationTopic}".
      The agent should have relevant expertise and complex characteristics.`;
    } else {
      const userProvidedFields = {
        name: options.name,
        personality: options.personality,
        background: options.background,
        expertise: options.expertise,
        beliefs: options.beliefs,
        quirks: options.quirks,
        communication: options.communication,
        traits: options.traits
      };

      const fieldsToGenerate = Object.entries(userProvidedFields)
        .filter(([_, value]) => !value)
        .map(([field]) => field);

      systemPrompt = `Create a chat agent with these exact characteristics:
      ${options.name ? `Name: ${options.name} (must keep exactly as specified)` : 'Generate a suitable name'}
      ${options.personality ? `Personality: ${options.personality} (must keep exactly as specified)` : 'Generate a detailed personality'}
      ${options.background ? `Background: ${options.background} (must keep exactly as specified)` : 'Generate a relevant background'}
      ${options.expertise ? `Expertise: ${options.expertise} (must keep exactly as specified)` : 'Generate relevant areas of expertise'}
      ${options.beliefs ? `Beliefs: ${options.beliefs} (must keep exactly as specified)` : 'Generate core beliefs'}
      ${options.quirks ? `Quirks: ${options.quirks} (must keep exactly as specified)` : 'Generate unique quirks'}
      ${options.communication ? `Communication: ${options.communication} (must keep exactly as specified)` : 'Generate communication style'}
      
      Only generate content for unspecified fields. The specified fields must remain exactly as provided.
      Generate content that aligns with the topic: "${options.conversationTopic}" and complements the existing characteristics.`;
    }

    systemPrompt += `\n\nProvide the response in this JSON format:
    {
      "name": "Full name",
      "personality": "Detailed personality description",
      "background": "Rich life history",
      "expertise": ["Primary expertise", "Secondary expertise", "Other areas"],
      "beliefs": ["Core belief 1", "Core belief 2", "Core belief 3"],
      "quirks": ["Unique habit 1", "Quirk 2", "Trait 3"],
      "communication": "Detailed communication style",
      "traits": ["trait1", "trait2", "trait3", "trait4"]
    }`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: "system",
          content: systemPrompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const agent = JSON.parse(response.choices[0].message.content || '{}');
    
    if (!options.isRandom) {
      if (options.name) agent.name = options.name;
      if (options.personality) agent.personality = options.personality;
      if (options.background) agent.background = options.background;
      if (options.expertise) agent.expertise = [options.expertise];
      if (options.beliefs) agent.beliefs = [options.beliefs];
      if (options.quirks) agent.quirks = [options.quirks];
      if (options.communication) agent.communication = options.communication;
      if (options.traits) agent.traits = options.traits;
    }
    
    return agent;
  }

  async generateMessage(
    agent: Agent,
    previousMessages: Message[],
    topic: string
  ): Promise<Message> {
    const systemPrompt = `You are ${agent.name}, with the following characteristics:
    - Personality: ${agent.personality}
    - Background: ${agent.background}
    - Expertise: ${agent.expertise?.join(', ') || 'Not specified'}
    - Beliefs: ${agent.beliefs?.join(', ') || 'Not specified'}
    - Quirks: ${agent.quirks?.join(', ') || 'Not specified'}
    - Communication Style: ${agent.communication || 'Not specified'}
    - Traits: ${agent.traits.join(', ')}

    You are participating in a conversation about "${topic}".
    Respond in character, maintaining consistency with your personality and background.
    Keep responses concise but meaningful (2-3 sentences).
    React to previous messages when appropriate.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...previousMessages.map(msg => ({
        role: "assistant",
        content: `${msg.agentName}: ${msg.content}`
      }))
    ];

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: messages as any,
      max_tokens: 150
    });

    return {
      agentName: agent.name,
      content: response.choices[0].message?.content || '',
      timestamp: new Date()
    };
  }

  async analyzeConversation(messages: Message[]): Promise<ChatAnalytics> {
    const uniqueAgents = [...new Set(messages.map(m => m.agentName))];
    const systemPrompt = `As an expert conversation analyst, analyze this multi-agent dialogue comprehensively.

    CRITICAL REQUIREMENTS:
    1. You MUST analyze EVERY agent in the conversation: ${uniqueAgents.join(', ')}
    2. All numeric scores MUST be between 0-100 and follow these criteria:
       - Adaptability: ability to adjust to new information and perspectives
       - Idea Diversity: uniqueness and variety of concepts introduced
       - Conversation Depth: complexity and sophistication of discussion
       - Emotional Intelligence: awareness and appropriate emotional responses
       - Logical Consistency: coherence and rational progression of ideas
       - Creativity: novel approaches and innovative thinking

    Format your response EXACTLY as this JSON structure:
    {
      "mainTopics": ["specific topic 1", "specific topic 2"],
      "agentBehaviorAnalysis": {
        "[EACH_AGENT_NAME]": {
          "cognitivePatterns": "detailed analysis of thinking and reasoning patterns",
          "emotionalResponses": "analysis of emotional intelligence and reactions",
          "biasesObserved": ["specific bias 1", "specific bias 2"],
          "adaptabilityScore": "0-100 based on flexibility and response to new ideas",
          "consistencyWithRole": "how well they maintained their character",
          "uniqueCharacteristics": ["specific trait 1", "specific trait 2"]
        }
      },
      "interactionDynamics": {
        "powerDynamics": "analysis of influence and authority patterns",
        "influencePatterns": ["specific pattern 1", "specific pattern 2"],
        "groupPolarization": "analysis of opinion shifts and group thinking",
        "cognitiveAlignment": "analysis of shared understanding development"
      },
      "experimentMetrics": {
        "ideaDiversity": "0-100 based on variety and uniqueness of ideas",
        "conversationDepth": "0-100 based on complexity and sophistication",
        "emotionalIntelligence": "0-100 based on emotional awareness and response",
        "logicalConsistency": "0-100 based on coherence and rationality",
        "creativityScore": "0-100 based on innovation and novel thinking"
      },
      "emergentBehaviors": ["specific behavior 1", "specific behavior 2"],
      "researchImplications": ["specific implication 1", "specific implication 2"],
      "summary": {
        "mainConclusions": ["specific conclusion 1", "specific conclusion 2"],
        "keyDiscussionPoints": ["specific point 1", "specific point 2"],
        "agreements": ["specific agreement 1", "specific agreement 2"],
        "disagreements": ["specific disagreement 1", "specific disagreement 2"],
        "overallTone": "detailed analysis of conversation tone",
        "suggestedNextTopics": ["specific topic 1", "specific topic 2"]
      }
    }

    Conversation to analyze:
    ${messages.map(m => `${m.agentName}: ${m.content}`).join('\n')}`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{
        role: "system",
        content: systemPrompt
      }],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  }
}