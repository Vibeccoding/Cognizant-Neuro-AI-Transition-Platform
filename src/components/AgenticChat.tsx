import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { mockFramework } from '../data/mockData';

interface AgenticChatProps {
  phaseContext?: string;
  className?: string;
}

const AgenticChat: React.FC<AgenticChatProps> = ({ phaseContext, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: `Hello! I'm your Cognizant Neuro AI assistant for the transition platform. ${phaseContext ? `I can help you with questions about the ${phaseContext} phase.` : 'How can I help you today?'}`,
      sender: 'ai',
      timestamp: new Date(),
      phaseContext
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      phaseContext
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, phaseContext);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        phaseContext
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (message: string, context?: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Get phase data from mockFramework
    const dashboardPhase = mockFramework.phases.find(p => p.id === 'dashboard');
    const dueDiligencePhase = mockFramework.phases.find(p => p.id === 'due-diligence');
    const knowledgePhase = mockFramework.phases.find(p => p.id === 'knowledge-acquisition');
    
    if (context) {
      switch (context) {
        case 'AI Transition Dashboard':
          if (lowerMessage.includes('metric') || lowerMessage.includes('kpi')) {
            const uptime = dashboardPhase?.keyMetrics.find(m => m.label === 'System Uptime')?.value || '99.8%';
            const speed = dashboardPhase?.keyMetrics.find(m => m.label === 'Data Processing Speed')?.value || '2.3s';
            const satisfaction = dashboardPhase?.keyMetrics.find(m => m.label === 'User Satisfaction')?.value || '4.7/5';
            return `For Dashboard Management, key metrics include system uptime (currently ${uptime}), data processing speed (${speed}), and user satisfaction (${satisfaction}). I can help you analyze trends and set up automated alerts for any metric thresholds.`;
          }
          if (lowerMessage.includes('ai') || lowerMessage.includes('implementation')) {
            return 'AI implementations in this phase include predictive analytics for resource allocation, automated alert systems, real-time performance monitoring, and intelligent data visualization. Would you like me to explain any specific implementation?';
          }
          break;
        case 'Due Diligence':
          if (lowerMessage.includes('risk') || lowerMessage.includes('compliance')) {
            const risksIdentified = dueDiligencePhase?.keyMetrics.find(m => m.label === 'Risks Identified')?.value || '47';
            const complianceScore = dueDiligencePhase?.keyMetrics.find(m => m.label === 'Compliance Score')?.value || '94%';
            const documentsAnalyzed = dueDiligencePhase?.keyMetrics.find(m => m.label === 'Documents Analyzed')?.value || '12,450';
            return `Our AI-powered due diligence has identified ${risksIdentified} risks with a ${complianceScore} compliance score. The automated document analysis has processed ${documentsAnalyzed} documents. I can provide detailed risk breakdowns or compliance gap analysis.`;
          }
          break;
        case 'Knowledge Acquisition':
          if (lowerMessage.includes('knowledge') || lowerMessage.includes('documentation')) {
            const knowledgeItems = knowledgePhase?.keyMetrics.find(m => m.label === 'Knowledge Items')?.value || '8,920';
            const accuracyRate = knowledgePhase?.keyMetrics.find(m => m.label === 'Accuracy Rate')?.value || '92%';
            return `We've extracted ${knowledgeItems} knowledge items with ${accuracyRate} accuracy. The AI uses NLP for documentation, generates knowledge graphs, and creates automated training materials. Need help with specific knowledge areas?`;
          }
          break;
        // Add more context-specific responses for other phases
      }
    }

    // General responses using dynamic data
    if (lowerMessage.includes('progress') || lowerMessage.includes('status')) {
      const dashboardProgress = dashboardPhase?.progress || 75;
      const dueDiligenceProgress = dueDiligencePhase?.progress || 100;
      const knowledgeProgress = knowledgePhase?.progress || 60;
      const overallProgress = mockFramework.overallProgress;
      return `The overall Cognizant Neuro AI Transition Platform is ${overallProgress}% complete. AI Transition Dashboard (${dashboardProgress}%), Due Diligence (${dueDiligenceProgress}%), and Knowledge Acquisition (${knowledgeProgress}%) are the most advanced phases. Would you like details on any specific phase?`;
    }
    
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
      return 'Cognizant Neuro AI is integrated across all transition phases to reduce dependency, control costs, and improve effectiveness. Each phase uses specialized AI implementations like predictive analytics, NLP, automated testing, and intelligent monitoring.';
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('assistance')) {
      return 'I can help you with: \n• Phase-specific guidance and metrics\n• AI implementation strategies\n• Risk assessment and mitigation\n• Progress tracking and reporting\n• Best practices for transition management\n\nWhat would you like to explore?';
    }

    return 'I understand you\'re asking about the Cognizant Neuro AI Transition Platform. Could you be more specific about which phase or aspect you\'d like to discuss? I can provide insights on progress, AI implementations, metrics, or best practices.';
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${className}`}
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-96 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50 ${isMinimized ? 'h-12' : ''} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-50 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="text-primary-600" size={20} />
          <h3 className="font-semibold text-gray-800">AI Assistant</h3>
          {phaseContext && (
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
              {phaseContext}
            </span>
          )}
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'ai' && <Bot size={16} className="mt-1 flex-shrink-0" />}
                    {message.sender === 'user' && <User size={16} className="mt-1 flex-shrink-0" />}
                    <div className="text-sm whitespace-pre-line">{message.message}</div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot size={16} />
                    <div className="text-sm">
                      <span className="animate-pulse">AI is typing...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about the Cognizant Neuro AI transition platform..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AgenticChat;
