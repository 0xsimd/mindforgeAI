import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../../src/types';

interface TerminalProps {
  messages: Message[];
  isSimulating: boolean;
  onProgress?: (currentIndex: number, isComplete: boolean) => void;
  sessionId?: string;
  isInitialCreation?: boolean;
}

export default function Terminal({ messages, isSimulating, onProgress, sessionId, isInitialCreation = false }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [systemLogs, setSystemLogs] = useState<Array<{
    type: 'info' | 'warning' | 'error' | 'success',
    message: string,
    timestamp: number,
    details?: string
  }>>([]);
  const [connectionStatus, setConnectionStatus] = useState<{
    websocket: boolean;
    api: boolean;
    openai: boolean;
  }>({
    websocket: false,
    api: false,
    openai: false
  });
  const typewriterRef = useRef<{
    text: string;
    index: number;
    resolve: () => void;
  } | null>(null);
  const hasInitialized = useRef<boolean>(false);

  // Initialize terminal state based on whether it's a new creation or viewing
  useEffect(() => {
    const initializeExistingSession = async () => {
      if (!isInitialCreation && sessionId && messages.length > 0 && !hasInitialized.current) {
        hasInitialized.current = true;
        // For viewing mode, first show metadata and system info
        const metadata = messages[0]?.metadata;
        if (metadata) {
          // Show system initialization
          addSystemLog('info', 'Initializing System...', 'Loading session data');
          await simulateDelay(200);

          // System Information
          addSystemLog('info', 'System Platform', `${metadata.system.platform} ${metadata.system.release}`);
          await simulateDelay(100);
          addSystemLog('info', 'Architecture', metadata.system.arch);
          await simulateDelay(100);
          addSystemLog('info', 'CPU', `${metadata.system.cpus} cores`);
          await simulateDelay(100);
          addSystemLog('info', 'Memory', `${Math.round(metadata.system.memory.total / 1024 / 1024 / 1024)}GB Total`);
          await simulateDelay(100);

          // Client Information
          addSystemLog('info', 'Client Platform', metadata.system.client.platform);
          await simulateDelay(100);
          addSystemLog('info', 'Browser', metadata.system.client.userAgent);
          await simulateDelay(100);
          addSystemLog('info', 'Language', metadata.system.client.language);
          await simulateDelay(100);

          // Service Information
          addSystemLog('info', 'WebSocket', `${metadata.services.websocket.protocol} (${metadata.services.websocket.latency}ms)`);
          await simulateDelay(100);
          addSystemLog('info', 'API', `${metadata.services.api.protocol} (${metadata.services.api.latency}ms)`);
          await simulateDelay(100);
          addSystemLog('info', 'OpenAI', `${metadata.services.openai.model} (${metadata.services.openai.version})`);
          await simulateDelay(100);

          // Performance Metrics
          addSystemLog('info', 'Processing Time', `${metadata.performance.totalProcessingTime}ms total`);
          addSystemLog('info', 'Average Latency', `${metadata.performance.metrics.averageLatency}ms per message`);
          await simulateDelay(200);

          // Set connection status
          setConnectionStatus({
            websocket: true,
            api: true,
            openai: true
          });

          // Final status
          addSystemLog('success', 'Session restored', `ID: ${sessionId}`);
          addSystemLog('success', 'Messages ready', `Count: ${messages.length}`);
          addSystemLog('success', 'System ready', `Active agents: ${new Set(messages.map(m => m.agentName)).size}`);
        }
      }
    };

    initializeExistingSession();
  }, [sessionId, messages, isInitialCreation]);

  // Connection establishment animation - only for initial creation
  useEffect(() => {
    if (!isInitialCreation || hasInitialized.current) return;
    hasInitialized.current = true;

    const establishConnections = async () => {
      // System Information
      addSystemLog('info', 'Initializing System...', 'Collecting environment data');
      await simulateDelay(200);
      
      const systemInfo = {
        platform: window.navigator.platform,
        userAgent: window.navigator.userAgent,
        language: window.navigator.language,
        cores: window.navigator.hardwareConcurrency,
        memory: (performance as any).memory?.jsHeapSizeLimit ? 
          `${Math.round((performance as any).memory.jsHeapSizeLimit / 1024 / 1024)}MB` : 'Unknown',
        connection: (navigator as any).connection?.effectiveType || 'Unknown'
      };

      addSystemLog('info', 'System Platform', systemInfo.platform);
      await simulateDelay(100);
      addSystemLog('info', 'CPU Cores', `${systemInfo.cores} logical processors`);
      await simulateDelay(100);
      addSystemLog('info', 'Memory', systemInfo.memory);
      await simulateDelay(100);
      addSystemLog('info', 'Network', `${systemInfo.connection} connection`);
      await simulateDelay(100);
      addSystemLog('info', 'Browser', systemInfo.userAgent);
      await simulateDelay(100);
      addSystemLog('info', 'Language', systemInfo.language);
      await simulateDelay(200);

      // WebSocket Connection
      addSystemLog('info', 'Establishing WebSocket connection...');
      await simulateDelay(300);
      setConnectionStatus(prev => ({ ...prev, websocket: true }));
      const wsId = Math.random().toString(36).substr(2, 9);
      addSystemLog('success', 'WebSocket connection established', `Connection ID: ${wsId}`);
      addSystemLog('info', 'WebSocket Protocol', 'wss (Secure WebSocket)');
      addSystemLog('info', 'WebSocket Latency', `${Math.round(Math.random() * 50 + 20)}ms`);
      await simulateDelay(200);

      // API Connection
      addSystemLog('info', 'Connecting to API endpoint...');
      await simulateDelay(300);
      setConnectionStatus(prev => ({ ...prev, api: true }));
      addSystemLog('success', 'API connection successful', 'Session initialized');
      addSystemLog('info', 'API Protocol', 'HTTPS/2.0 (TLS 1.3)');
      addSystemLog('info', 'API Latency', `${Math.round(Math.random() * 100 + 50)}ms`);
      await simulateDelay(200);

      // OpenAI Connection
      addSystemLog('info', 'Authenticating OpenAI service...');
      await simulateDelay(300);
      setConnectionStatus(prev => ({ ...prev, openai: true }));
      addSystemLog('success', 'OpenAI service authenticated');
      addSystemLog('info', 'Model Version', 'Latest');
      addSystemLog('info', 'Context Window', '8K tokens');
      addSystemLog('info', 'Temperature', '0.7');
      await simulateDelay(200);

      // Performance Metrics
      addSystemLog('info', 'Performance Mode', 'High Performance');
      addSystemLog('info', 'Rendering Engine', 'React 18 (Concurrent)');
      addSystemLog('info', 'WebGL Status', window.WebGLRenderingContext ? 'Enabled' : 'Disabled');
      await simulateDelay(200);

      // System Ready
      addSystemLog('info', 'Initializing conversation environment...');
      await simulateDelay(200);
      addSystemLog('success', 'System ready', `Active agents: ${messages.length > 0 ? new Set(messages.map(m => m.agentName)).size : 0}`);
    };

    establishConnections();
  }, [isInitialCreation]);

  const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const addSystemLog = (type: 'info' | 'warning' | 'error' | 'success', message: string, details?: string) => {
    setSystemLogs(prev => [...prev, {
      type,
      message,
      timestamp: Date.now(),
      details
    }]);
  };

  // Message streaming with proper delays
  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const processNextMessage = async () => {
      if (!messages.length || currentMessageIndex >= messages.length) {
        if (onProgress && currentMessageIndex > 0) {
          onProgress(currentMessageIndex, true);
        }
        return;
      }

      const message = messages[currentMessageIndex];
      const messageExists = visibleMessages.some(m => 
        m.timestamp === message.timestamp && 
        m.agentName === message.agentName
      );

      if (!messageExists) {
        setIsTyping(true);
        
        // Clean the content by removing agent name prefixes
        const cleanContent = message.content
          .replace(new RegExp(`^${message.agentName}:\\s*`, 'g'), '')
          .replace(new RegExp(`${message.agentName}:\\s*`, 'g'), '')
          .replace(/^.*?:\s*/, '')
          .trim();

        // Add empty message first
        setVisibleMessages(prev => [...prev, {
          ...message,
          content: isInitialCreation ? '' : cleanContent
        }]);

        if (isInitialCreation) {
          // Stream in the message word by word
          await streamMessage(cleanContent);

          if (isMounted) {
            addSystemLog('info', `Message processed from ${message.agentName}`, 
              `Length: ${cleanContent.length} chars | Tokens: ~${Math.ceil(cleanContent.length / 4)}`);

            // Wait before processing next message
            timeoutId = setTimeout(() => {
              if (isMounted) {
                setCurrentMessageIndex(prev => prev + 1);
                setIsTyping(false);
              }
            }, 800);
          }
        } else {
          setCurrentMessageIndex(prev => prev + 1);
          setIsTyping(false);
        }
      }
    };

    if (!isTyping) {
      processNextMessage();
    }

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [messages, currentMessageIndex, isTyping]);

  // Typewriter effect - only for initial creation
  const typeMessage = async (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!isInitialCreation) {
        setVisibleMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          newMessages[newMessages.length - 1] = {
            ...lastMessage,
            content: text
          };
          return newMessages;
        });
        resolve();
        return;
      }

      typewriterRef.current = {
        text,
        index: 0,
        resolve
      };
      typeNextChar();
    });
  };

  const typeNextChar = () => {
    if (!typewriterRef.current) return;
    
    const { text, index, resolve } = typewriterRef.current;
    
    if (index < text.length) {
      setVisibleMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        newMessages[newMessages.length - 1] = {
          ...lastMessage,
          content: text.substring(0, index + 1)
        };
        return newMessages;
      });
      
      typewriterRef.current.index++;
      const delay = text[index] === '.' ? 150 : 
                    text[index] === ',' ? 100 : 
                    Math.random() * 30 + 20;
      
      setTimeout(typeNextChar, delay);
    } else {
      resolve();
      typewriterRef.current = null;
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping, systemLogs]);

  // Stream effect for messages
  const streamMessage = async (text: string): Promise<void> => {
    return new Promise((resolve) => {
      const words = text.split(' ');
      let currentWordIndex = 0;
      
      const streamNextWord = () => {
        if (currentWordIndex >= words.length) {
          resolve();
          return;
        }

        setVisibleMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          newMessages[newMessages.length - 1] = {
            ...lastMessage,
            content: words.slice(0, currentWordIndex + 1).join(' ')
          };
          return newMessages;
        });

        currentWordIndex++;
        const currentWord = words[currentWordIndex - 1];
        const delay = currentWord.endsWith('.') ? 150 :
                     currentWord.endsWith(',') ? 100 :
                     currentWord.length > 8 ? 80 :
                     50;
        
        setTimeout(streamNextWord, delay);
      };

      streamNextWord();
    });
  };

  return (
    <div className="relative w-full h-[600px] bg-terminal-black rounded-lg border border-cyber-blue/30 overflow-hidden">
      {/* Terminal Header */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 backdrop-blur-sm border-b border-cyber-blue/30 flex items-center px-4">
        <div className="flex space-x-2">
          <div className={`w-3 h-3 rounded-full ${connectionStatus.websocket ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          <div className={`w-3 h-3 rounded-full ${connectionStatus.api ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse delay-75`}></div>
          <div className={`w-3 h-3 rounded-full ${connectionStatus.openai ? 'bg-green-500' : 'bg-blue-500'} animate-pulse delay-150`}></div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-cyber-blue/70 text-sm font-mono flex items-center space-x-4">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${
            Object.values(connectionStatus).every(Boolean)
              ? 'bg-green-500/10 border-green-500/30 text-green-500'
              : 'bg-cyber-blue/10 border-cyber-blue/30 text-cyber-blue'
          }`}>
            {Object.values(connectionStatus).every(Boolean) ? 'SYSTEM READY' : 'INITIALIZING'}
          </span>
          <span className="text-xs">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="absolute top-8 left-0 right-0 bottom-8 bg-terminal-black overflow-y-auto p-4 font-mono"
      >
        <div className="space-y-1">
          {/* System Logs */}
          {systemLogs.map((log, index) => (
            <div key={index} className={`flex py-2 pr-2 items-start space-x-2 ${
              log.type === 'error' ? 'text-red-400' :
              log.type === 'warning' ? 'text-yellow-400' :
              log.type === 'success' ? 'text-green-400' :
              'text-cyber-blue/70'
            } animate-fade-in`}>
              <span className="text-cyber-purple whitespace-nowrap">
                [{new Date(log.timestamp).toLocaleTimeString()}]
              </span>
              <span className="text-cyber-blue/70">{'>'}</span>
              <div className="flex-1">
                <span>{log.message}</span>
                {log.details && (
                  <span className="ml-2 opacity-70">{`(${log.details})`}</span>
                )}
              </div>
            </div>
          ))}

          {/* Messages */}
          {visibleMessages.map((message, index) => (
            <div
              key={`${message.agentName}-${message.timestamp}`}
              className="message-container animate-fade-in relative group mt-4"
            >
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-gradient-to-b from-cyber-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex py-2 pr-2 rounded hover:bg-cyber-blue/5 transition-colors">
                <div className="gap-2">
                  <span className="text-cyber-purple whitespace-nowrap">
                    [{new Date(message.timestamp).toLocaleTimeString()}] 
                  </span>
                  <span className="text-cyber-pink font-bold whitespace-nowrap">
                    {' '}Agents\{message.agentName}
                  </span>
                  <span className="text-cyber-blue/70">{'>  '}</span>
                  <span className="text-terminal-green break-words">
                    {message.content}
                    {index === visibleMessages.length - 1 && isTyping && (
                      <span className="animate-terminal-blink">▊</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Processing Indicator */}
          {(isTyping || isSimulating) && (
            <div className="flex items-center space-x-2 text-cyber-blue/70 animate-pulse mt-4">
              <span className="text-cyber-purple whitespace-nowrap">
                [{new Date().toLocaleTimeString()}]
              </span>
              <span>{'>'}</span>
              <span>
                {isTyping ? 'Processing response' : 'Simulating interaction'}
                <span className="inline-flex w-12 justify-between ml-2">
                  <span className="animate-bounce delay-0">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Terminal Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyber-blue/5"></div>
        <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-5 animate-scan"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] opacity-40"></div>
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 backdrop-blur-sm border-t border-cyber-blue/30 flex items-center px-4 text-xs font-mono">
        <div className="flex items-center space-x-4 text-cyber-blue/70">
          <span>AGENTS: {messages.length > 0 ? new Set(messages.map(m => m.agentName)).size : 0}</span>
          <span>MESSAGES: {visibleMessages.length}</span>
          <span>WS: {connectionStatus.websocket ? 'CONNECTED' : 'CONNECTING'}</span>
          <span>API: {connectionStatus.api ? 'READY' : 'CONNECTING'}</span>
          <span>AI: {connectionStatus.openai ? 'AUTHENTICATED' : 'CONNECTING'}</span>
          <span className="flex items-center">
            STATUS: 
            <span className={`ml-1 px-1.5 py-0.5 rounded-sm text-[10px] ${
              isTyping ? 'bg-yellow-500/20 text-yellow-400' :
              isSimulating ? 'bg-blue-500/20 text-blue-400' :
              'bg-green-500/20 text-green-400'
            }`}>
              {isTyping ? 'PROCESSING' : isSimulating ? 'SIMULATING' : 'READY'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
} 