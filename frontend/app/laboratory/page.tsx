'use client';

import { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { Agent } from '../../../src/types';
import Terminal from '../../components/Terminal';
import AgentCard from '../../components/AgentCard';
import CustomAgentModal from '../../components/CustomAgentModal';
import LoadSessionModal from '../../components/LoadSessionModal';
import AppLayout from '../../components/AppLayout';

type ExperimentState = 'initial' | 'create' | 'configure' | 'running' | 'analysis';

export default function Laboratory() {
  const [state, setState] = useState<ExperimentState>('initial');
  const [experimentId, setExperimentId] = useState('');
  const [topic, setTopic] = useState('');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [messagesPerAgent, setMessagesPerAgent] = useState(3);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isLoadSessionModalOpen, setIsLoadSessionModalOpen] = useState(false);

  const resetState = () => {
    setTopic('');
    setAgents([]);
    setMessagesPerAgent(3);
    setError('');
    setIsLoading(false);
    setIsCustomModalOpen(false);
    setSession(null);
    setIsCreatingAgent(false);
    setCurrentMessageIndex(0);
    setIsSimulating(false);
    setExperimentId('');
    setState('create');
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session');
    if (sessionId) {
      setExperimentId(sessionId);
      handleLoadExperiment(sessionId);
    }
  }, []);

  const handleLoadExperiment = async (id?: string) => {
    try {
      setError('');
      setIsLoading(true);
      const loadedSession = await apiService.getSession(id || experimentId);
      if (loadedSession) {
        setSession(loadedSession);
        setState('analysis');
      }
    } catch (err) {
      setError('Failed to load experiment. Please check the ID and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRandomAgent = async () => {
    if (!topic) {
      setError('Please enter a topic first');
      return;
    }
    try {
      setError('');
      setIsCreatingAgent(true);
      const newAgent = await apiService.createRandomAgent(topic);
      setAgents(prev => [...prev, newAgent]);
    } catch (err) {
      setError('Failed to create random agent');
    } finally {
      setIsCreatingAgent(false);
    }
  };

  const handleCreateCustomAgent = async (agentData: any) => {
    if (!topic) {
      setError('Please enter a topic first');
      return;
    }
    try {
      setError('');
      setIsCreatingAgent(true);
      const newAgent = await apiService.createAgent({
        ...agentData,
        conversationTopic: topic,
        isRandom: false,
        expertise: agentData.expertise.split(',').map((s: string) => s.trim()),
        beliefs: agentData.beliefs.split(',').map((s: string) => s.trim()),
        quirks: agentData.quirks.split(',').map((s: string) => s.trim())
      });
      setAgents([...agents, newAgent]);
    } catch (err) {
      setError('Failed to create custom agent');
    } finally {
      setIsCreatingAgent(false);
      setIsCustomModalOpen(false);
    }
  };

  const handleStartConversation = async () => {
    try {
      setError('');
      setIsLoading(true);
      setState('running');
      const newSession = await apiService.startConversation({
        topic,
        messagesPerAgent,
        agents
      });
      setSession(newSession);
    } catch (err) {
      setError('Failed to start conversation');
      setState('configure');
    } finally {
      setIsLoading(false);
    }
  };

  const renderInitialState = () => (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">
              AI Experiments Laboratory
            </h1>
            <p className="text-xl text-gray-400">
              Enter the simulation chamber and witness AI agents interact
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* New Experiment Card */}
            <div className="bg-terminal-black border border-cyber-blue/30 rounded-lg p-8 hover:border-cyber-blue/60 transition-all group">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center group-hover:animate-glow">
                  <span className="text-3xl">🧪</span>
                </div>
                <h2 className="text-2xl font-bold text-cyber-blue">New Experiment</h2>
                <p className="text-gray-400">Create a new AI conversation experiment from scratch.</p>
                <button
                  onClick={resetState}
                  className="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Initialize New Experiment
                </button>
              </div>
            </div>

            {/* Load Experiment Card */}
            <div className="bg-terminal-black border border-cyber-blue/30 rounded-lg p-8 hover:border-cyber-blue/60 transition-all group">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyber-pink to-cyber-purple rounded-lg flex items-center justify-center group-hover:animate-glow">
                  <span className="text-3xl">📂</span>
                </div>
                <h2 className="text-2xl font-bold text-cyber-pink">Load Experiment</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={experimentId}
                    onChange={(e) => setExperimentId(e.target.value)}
                    placeholder="Enter experiment ID"
                    className="w-full bg-black/50 border border-cyber-pink/30 rounded-lg px-4 py-3 focus:border-cyber-pink/60 outline-none text-white placeholder-gray-500"
                  />
                  <button
                    onClick={() => handleLoadExperiment()}
                    disabled={!experimentId || isLoading}
                    className="w-full bg-gradient-to-r from-cyber-pink to-cyber-purple text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isLoading ? 'Loading...' : 'Access Experiment'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );

  const renderCreateState = () => (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              Agent Creation Chamber
            </h1>
            <p className="text-xl text-gray-400">
              Define your AI agents and their conversation parameters
            </p>
          </div>

          {/* Topic Input */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-terminal-black border border-cyber-blue/30 rounded-lg p-6">
              <label className="block text-cyber-blue mb-2">Conversation Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 'Space Exploration', 'Climate Change'"
                className="w-full bg-black/50 border border-cyber-blue/30 rounded-lg px-4 py-3 focus:border-cyber-blue/60 outline-none text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Agent Creation Options */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Random Agent */}
            <button
              onClick={handleCreateRandomAgent}
              disabled={!topic || isCreatingAgent}
              className="bg-terminal-black border border-cyber-blue/30 rounded-lg p-8 hover:border-cyber-blue/60 transition-all text-left group disabled:opacity-50"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center group-hover:animate-glow">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-cyber-blue">Random Agent</h3>
                <p className="text-gray-400">Generate an AI agent with randomized traits and personality</p>
              </div>
            </button>

            {/* Custom Agent */}
            <button
              onClick={() => setIsCustomModalOpen(true)}
              disabled={!topic || isCreatingAgent}
              className="bg-terminal-black border border-cyber-purple/30 rounded-lg p-8 hover:border-cyber-purple/60 transition-all text-left group disabled:opacity-50"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-lg flex items-center justify-center group-hover:animate-glow">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="text-xl font-bold text-cyber-purple">Custom Agent</h3>
                <p className="text-gray-400">Create an AI agent with specific traits and personality</p>
              </div>
            </button>

            {/* Load from Session */}
            <button
              onClick={() => setIsLoadSessionModalOpen(true)}
              disabled={!topic || isCreatingAgent}
              className="bg-terminal-black border border-cyber-pink/30 rounded-lg p-8 hover:border-cyber-pink/60 transition-all text-left group disabled:opacity-50"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyber-pink to-cyber-purple rounded-lg flex items-center justify-center group-hover:animate-glow">
                  <span className="text-3xl">📂</span>
                </div>
                <h3 className="text-xl font-bold text-cyber-pink">Load Agents</h3>
                <p className="text-gray-400">Import agents from a previous experiment session</p>
              </div>
            </button>
          </div>

          {/* Created Agents */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-cyber-purple">Created Agents</h3>
              <span className="text-gray-400">
                {agents.length < 2 ? `Create at least ${2 - agents.length} more agent${2 - agents.length === 1 ? '' : 's'} to continue` : 'Ready to proceed'}
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent, index) => (
                <AgentCard
                  key={index}
                  agent={agent}
                  onRemove={() => {
                    const newAgents = [...agents];
                    newAgents.splice(index, 1);
                    setAgents(newAgents);
                  }}
                />
              ))}
              {isCreatingAgent && <AgentCard isLoading />}
            </div>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => {
                resetState();
                setState('initial');
              }}
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setState('configure')}
              disabled={agents.length < 2}
              className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Continue to Configuration
            </button>
          </div>
        </div>

        <CustomAgentModal
          isOpen={isCustomModalOpen}
          onClose={() => setIsCustomModalOpen(false)}
          onSubmit={handleCreateCustomAgent}
        />

        <LoadSessionModal
          isOpen={isLoadSessionModalOpen}
          onClose={() => setIsLoadSessionModalOpen(false)}
          onLoadAgents={async (sessionId) => {
            try {
              const loadedAgents = await apiService.getSessionAgents(sessionId);
              setAgents(prev => [...prev, ...loadedAgents]);
              setIsLoadSessionModalOpen(false);
            } catch (err) {
              setError('Failed to load agents from session');
            }
          }}
        />
      </div>
    </AppLayout>
  );

  const renderConfigureState = () => (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              Simulation Configuration
            </h1>
            <p className="text-xl text-gray-400">
              Fine-tune your experiment parameters
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* Selected Agents */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-cyber-purple">Selected Agents</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {agents.map((agent, index) => (
                  <AgentCard key={index} agent={agent} />
                ))}
              </div>
            </div>

            {/* Messages Per Agent */}
            <div className="bg-terminal-black border border-cyber-blue/30 rounded-lg p-6">
              <label className="block text-cyber-blue mb-4">Messages Per Agent</label>
              <input
                type="range"
                min="1"
                max="10"
                value={messagesPerAgent}
                onChange={(e) => setMessagesPerAgent(parseInt(e.target.value))}
                className="w-full h-2 bg-cyber-blue/20 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-gray-400 mt-2">
                <span>1</span>
                <span>{messagesPerAgent}</span>
                <span>10</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg">
                {error}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setState('create')}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleStartConversation}
                disabled={isLoading}
                className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? 'Initializing...' : 'Start Simulation'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );

  const renderRunningState = () => {
    const handleProgress = (index: number, isComplete: boolean) => {
      setCurrentMessageIndex(index);
      if (isComplete) {
        setIsSimulating(false);
      }
    };

    const isConversationComplete = session?.messages?.length > 0 && !isSimulating;

    return (
      <AppLayout>
        <div className="p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
                Simulation in Progress
              </h1>
              <p className="text-xl text-gray-400">
                {isSimulating ? 'Observing AI agent interactions' : 'Conversation complete'}
              </p>
            </div>

            <Terminal
              messages={session?.messages || []}
              isSimulating={!session?.messages?.length}
              onProgress={handleProgress}
              sessionId={session?.id}
              isInitialCreation={state === 'running' && !session?.analytics}
            />

            <div className="flex justify-center mt-8">
              <button
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    const analysis = await apiService.getConversationAnalysis(session.id);
                    setSession({ ...session, analytics: analysis });
                    setState('analysis');
                  } catch (err) {
                    setError('Failed to generate analytics');
                  } finally {
                    setIsLoading(false);
                  }
                }}
                disabled={!isConversationComplete || isLoading || !session?.messages?.length}
                className="bg-gradient-to-r from-cyber-pink to-cyber-purple text-white font-bold py-3 px-8 rounded-lg transition-all group relative disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              >
                <span className="relative z-10">
                  {!session?.messages?.length ? 'Waiting for conversation...' :
                   isSimulating ? 'Messages still processing...' :
                   isLoading ? 'Generating Analytics...' :
                   'View Conversation Analysis'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-pink to-cyber-purple opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
              </button>
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    );
  };
  const renderAnalysisState = () => (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              Simulation Analytics
            </h1>
            <p className="text-xl text-gray-400">
              Experiment ID: {session?.id}
            </p>
          </div>

          <Terminal
            messages={session?.messages || []}
            isSimulating={false}
            sessionId={session?.id}
            isInitialCreation={false}
          />

          <div className="space-y-8">
            {/* Key Metrics Dashboard */}
            <div className="bg-terminal-black border border-cyber-blue/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyber-blue mb-8">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {session?.analytics?.experimentMetrics && Object.entries(session.analytics.experimentMetrics).map(([key, value]: [string, any]) => (
                  <div key={key} className="relative flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-300 mb-6">
                      {key
                        .replace(/([A-Z])/g, ' $1')
                        .trim()
                        .split(' ')
                        .map((word, index) => 
                          index === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase()
                        )
                        .join(' ')}
                    </span>
                    <div className="w-full flex flex-col items-center justify-center">
                      <div className="relative w-32 h-32">
                        <svg className="w-32 h-32">
                          <circle
                            className="text-gray-700"
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                            r="56"
                            cx="64"
                            cy="64"
                          />
                          <circle
                            className="text-cyber-blue"
                            strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 56}`}
                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - value/100)}`}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="56"
                            cx="64"
                            cy="64"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl md:text-3xl font-bold text-cyber-blue">{value}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Analysis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {session?.analytics?.agentBehaviorAnalysis && Object.entries(session.analytics.agentBehaviorAnalysis).map(([agentName, analysis]: [string, any]) => (
                <div key={agentName} className="bg-terminal-black border border-cyber-pink/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-cyber-pink text-xl">{agentName}</h4>
                    <div className="flex items-center">
                      <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyber-pink" 
                          style={{width: `${analysis.adaptabilityScore}%`}}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-400">Adaptability</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-terminal-black/30 p-4 rounded-lg border border-cyber-pink/20">
                      <div className="text-cyber-pink/70 mb-2">Cognitive Patterns</div>
                      <p className="text-gray-300">{analysis.cognitivePatterns}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-terminal-black/30 p-4 rounded-lg border border-cyber-pink/20">
                        <div className="text-cyber-pink/70 mb-2">Biases</div>
                        <div className="flex flex-wrap gap-2">
                          {analysis.biasesObserved?.map((bias: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-cyber-pink/10 rounded-full text-cyber-pink text-xs">
                              {bias}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-terminal-black/30 p-4 rounded-lg border border-cyber-pink/20">
                        <div className="text-cyber-pink/70 mb-2">Characteristics</div>
                        <div className="flex flex-wrap gap-2">
                          {analysis.uniqueCharacteristics?.map((char: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-cyber-pink/10 rounded-full text-cyber-pink text-xs">
                              {char}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interaction Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-terminal-black border border-cyber-purple/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-cyber-purple mb-4">Topics & Themes</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {session?.analytics?.mainTopics?.map((topic: string, index: number) => (
                      <div key={index} className="px-4 py-2 bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg text-cyber-purple">
                        {topic}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h4 className="text-cyber-purple/70 mb-2">Emergent Behaviors</h4>
                    <div className="space-y-2">
                      {session?.analytics?.emergentBehaviors?.map((behavior: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyber-purple rounded-full"></div>
                          <span className="text-gray-300">{behavior}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-terminal-black border border-cyber-blue/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-cyber-blue mb-4">Interaction Dynamics</h3>
                <div className="space-y-4">
                  <div className="bg-terminal-black/30 p-4 rounded-lg border border-cyber-blue/20">
                    <div className="text-cyber-blue/70 mb-2">Power Balance</div>
                    <p className="text-gray-300">{session?.analytics?.interactionDynamics?.powerDynamics}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {session?.analytics?.interactionDynamics?.influencePatterns?.map((pattern: string, index: number) => (
                      <div key={index} className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-3 text-center">
                        <span className="text-cyber-blue text-sm">{pattern}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusions & Next Steps */}
            <div className="bg-terminal-black border border-cyber-green/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-cyber-green mb-4">Research Outcomes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-cyber-green/70 mb-2">Key Findings</h4>
                  <div className="space-y-2">
                    {session?.analytics?.summary?.mainConclusions?.map((conclusion: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-6 h-6 flex items-center justify-center bg-cyber-green/10 rounded-full text-cyber-green">
                          {index + 1}
                        </div>
                        <span className="text-gray-300 flex-1">{conclusion}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-cyber-green/70 mb-2">Future Directions</h4>
                  <div className="space-y-2">
                    {session?.analytics?.summary?.suggestedNextTopics?.map((topic: string, index: number) => (
                      <div key={index} className="bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-3">
                        <span className="text-cyber-green">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={resetState}
              className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity ml-auto"
            >
              Start New Experiment
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );

  switch (state) {
    case 'create':
      return renderCreateState();
    case 'configure':
      return renderConfigureState();
    case 'running':
      return renderRunningState();
    case 'analysis':
      return renderAnalysisState();
    default:
      return renderInitialState();
  }
} 