import { OpenAIService } from './openai';
import { Agent, ChatRoomConfig, Message, ChatAnalytics, AgentCreationOptions } from '../types';
import { config } from '../config/config';
import inquirer from 'inquirer';
import { StorageService } from './storage';
import chalk from 'chalk';
import { inquirerTheme } from '../utils/inquirer-theme';


export class ChatRoomService {
  private openAIService: OpenAIService;
  private storageService: StorageService;
  private agents: Agent[] = [];
  private messages: Message[] = [];
  private config: ChatRoomConfig;

  constructor(chatConfig: ChatRoomConfig) {
    this.openAIService = new OpenAIService();
    this.storageService = new StorageService();
    this.config = chatConfig;
  }

  async createAgent(options: AgentCreationOptions): Promise<Agent> {
    return await this.openAIService.generateRandomAgent(options);
  }

  async initializeAgents(topic: string): Promise<void> {
    for (let i = 0; i < this.config.numberOfAgents; i++) {
      const agentOptions = await this.promptForAgentOptions(topic, i + 1);
      const agent = await this.createAgent(agentOptions);
      this.agents.push(agent);
    }
  }

  async initializeRandomAgents(topic: string): Promise<void> {
    for (let i = 0; i < this.config.numberOfAgents; i++) {
      const agentOptions = { 
        isRandom: true, 
        conversationTopic: topic 
      };
      const agent = await this.createAgent(agentOptions);
      this.agents.push(agent);
    }
  }

  private async promptForAgentOptions(topic: string, agentNumber: number): Promise<AgentCreationOptions> {
    
    const { creationType } = await inquirer.prompt([{
      type: 'list',
      name: 'creationType',
      message: 'How would you like to create this agent?',
      choices: [
        { name: 'Quick Random Generation', value: 'random' },
        { name: 'Basic Customization', value: 'basic' },
        { name: 'Advanced Customization', value: 'advanced' }
      ],
      prefix: chalk.white('?'),
      theme: inquirerTheme
    }]);

    if (creationType === 'random') {
      return { isRandom: true, conversationTopic: topic };
    }

    const basicOptions = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name (Enter to randomize):',
      },
      {
        type: 'input',
        name: 'profession',
        message: 'Profession (Enter to randomize):',
      }
    ]);

    if (creationType === 'basic') {
      return {
        isRandom: false,
        conversationTopic: topic,
        name: basicOptions.name || undefined,
        background: basicOptions.profession ? `Professional ${basicOptions.profession}` : undefined,
        personality: basicOptions.profession ? `Professional with expertise in ${basicOptions.profession}` : undefined,
        traits: basicOptions.profession ? [`knowledgeable about ${basicOptions.profession}`, 'professional', 'experienced'] : undefined
      };
    }

    const advancedOptions = await inquirer.prompt([
      {
        type: 'input',
        name: 'personality',
        message: 'Personality traits (Enter to randomize):',
      },
      {
        type: 'input',
        name: 'background',
        message: 'Detailed background (Enter to randomize):',
      },
      {
        type: 'input',
        name: 'expertise',
        message: 'Areas of expertise (Enter to randomize):',
      },
      {
        type: 'input',
        name: 'beliefs',
        message: 'Core beliefs/values (Enter to randomize):',
      },
      {
        type: 'input',
        name: 'quirks',
        message: 'Unique quirks/habits (Enter to randomize):',
      },
      {
        type: 'input',
        name: 'communication',
        message: 'Communication style (Enter to randomize):',
      }
    ]);

    return {
      isRandom: false,
      conversationTopic: topic,
      name: basicOptions.name || undefined,
      personality: advancedOptions.personality || undefined,
      background: advancedOptions.background || undefined,
      traits: [
        'professional',
        'experienced',
        'knowledgeable',
        advancedOptions.expertise,
        advancedOptions.communication
      ].filter(Boolean)
    };
  }

  async simulateConversation(metadata?: any): Promise<void> {
    if (!this.agents || this.agents.length === 0) {
      return;
    }
    
    let isFirstMessage = true;
    for (let round = 0; round < this.config.messagesPerAgent; round++) {
      for (const agent of this.agents) {
        const message = await this.openAIService.generateMessage(
          agent,
          this.messages,
          this.config.topic,
        );

        const newMessage: Message = {
          agentName: agent.name,
          content: message.content,
          timestamp: new Date(),
          ...(isFirstMessage && metadata ? { metadata } : {})
        };

        this.messages.push(newMessage);
        
        isFirstMessage = false;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(chalk.white('\n=== Conversation Ended ===\n'));
  }

  async analyzeConversation(): Promise<ChatAnalytics> {
    return await this.openAIService.analyzeConversation(this.messages);
  }

  getMessages(): Message[] {
    return this.messages;
  }

  getAgents(): Agent[] {
    return this.agents;
  }

  async saveSession(metadata?: any): Promise<string> {
    return await this.storageService.saveSession({
      timestamp: new Date().toISOString(),
      topic: this.config.topic,
      agents: this.agents,
      messages: this.messages,
      analytics: await this.analyzeConversation(),
      metadata: metadata || {
        system: {
          platform: 'unknown',
          timestamp: new Date().toISOString()
        }
      }
    });
  }

  setAgents(agents: Agent[]): void {
    this.agents = agents;
  }

  resetMessages(): void {
    this.messages = [];
  }

  setConfig(config: ChatRoomConfig): void {
    this.config = config;
  }

  getConfig(): ChatRoomConfig {
    return this.config;
  }
}
