import React, { useState, useRef, useEffect } from 'react';
import { Phase } from '../types';
import { 
  Brain, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Shield,
  DollarSign,
  Timer,
  Award,
  FileCheck,
  ChevronRight,
  FileText,
  Send,
  User
} from 'lucide-react';
import AgenticChat from './AgenticChat';
import AgenticAIRiskAnalysis from './AgenticAIRiskAnalysis';
import MitigationPlan from './MitigationPlan';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface DetailedPhaseAnalysisProps {
  phase: Phase;
}

const DetailedPhaseAnalysis: React.FC<DetailedPhaseAnalysisProps> = ({ phase }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'ai' | 'risks' | 'timeline' | 'agentic-ai-risks' | 'mitigation-plan' | 'knowledge-ai-assist'>(
    phase.id === 'due-diligence' ? 'agentic-ai-risks' : phase.id === 'knowledge-acquisition' ? 'knowledge-ai-assist' : 'overview'
  );

  // Chat state management
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your Transition Risk AI Assistant. I can help you with finding specific documentation, explaining business processes, knowledge extraction insights, and technical documentation queries. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Simulate AI response
  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      'recent extractions': "Here are the recent extractions: 1,240 knowledge items processed this week with 94% accuracy. Key domains include system architecture (35%), business processes (28%), and technical documentation (37%).",
      'workflow process': "Our workflow process includes: 1) Document ingestion → 2) AI-powered analysis → 3) Knowledge extraction → 4) Quality validation → 5) Knowledge base integration. Average processing time is 1.2 hours per document.",
      'knowledge base summary': "Knowledge Base Summary: 8,920 total items, 92% accuracy rate, covering 15 business domains. Top categories: Technical docs (40%), Process guides (30%), Policy documents (20%), Training materials (10%).",
      'help': "I can assist with: Knowledge extraction status, Document analysis results, Process documentation, Technical queries, System architecture insights, and Business process explanations.",
    };

    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific keywords
    if (lowerMessage.includes('extraction') || lowerMessage.includes('recent')) {
      return responses['recent extractions'];
    } else if (lowerMessage.includes('workflow') || lowerMessage.includes('process')) {
      return responses['workflow process'];
    } else if (lowerMessage.includes('summary') || lowerMessage.includes('overview')) {
      return responses['knowledge base summary'];
    } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return responses['help'];
    } else {
      return `I understand you're asking about "${userMessage}". Based on our knowledge base, I can provide insights on knowledge extraction, documentation analysis, and process optimization. Could you be more specific about what aspect you'd like to explore?`;
    }
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(currentMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 second delay
  };

  // Handle suggested question clicks
  const handleSuggestedQuestion = (question: string) => {
    setCurrentMessage(question);
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: question,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(question),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  const generateDetailedMetrics = (phase: Phase) => {
    const baseMetrics = phase.keyMetrics;
    return [
      ...baseMetrics,
      { label: 'ROI Expected', value: `${Math.round(Math.random() * 200 + 150)}%`, change: '+15%' },
      { label: 'Cost Reduction', value: `${Math.round(Math.random() * 30 + 20)}%`, change: '+8%' },
      { label: 'Time Saved', value: `${Math.round(Math.random() * 500 + 100)}h`, change: '+45%' },
      { label: 'Automation Rate', value: `${Math.round(Math.random() * 40 + 60)}%`, change: '+12%' },
      { label: 'Error Reduction', value: `${Math.round(Math.random() * 50 + 30)}%`, change: '+25%' },
      { label: 'User Adoption', value: `${Math.round(Math.random() * 30 + 70)}%`, change: '+18%' }
    ];
  };

  const generateRiskAssessment = (phase: Phase) => {
    const risks = [
      { 
        category: 'Technical', 
        level: phase.progress > 70 ? 'Low' : phase.progress > 40 ? 'Medium' : 'High',
        description: 'Integration complexity and technical debt mitigation',
        mitigation: 'Regular code reviews and automated testing'
      },
      { 
        category: 'Timeline', 
        level: phase.status === 'completed' ? 'Low' : phase.status === 'in-progress' ? 'Medium' : 'High',
        description: 'Potential delays in phase completion',
        mitigation: 'Agile methodology and continuous monitoring'
      },
      { 
        category: 'Resource', 
        level: 'Medium',
        description: 'Team capacity and skill availability',
        mitigation: 'Cross-training and external consultation'
      },
      { 
        category: 'Data Quality', 
        level: phase.id === 'data-cleanup' ? 'High' : 'Medium',
        description: 'Data integrity and migration challenges',
        mitigation: 'AI-powered data validation and cleanup'
      }
    ];
    return risks;
  };

  const generateTimelineEvents = (phase: Phase) => {
    const events = [
      { date: phase.startDate, event: 'Phase Initiation', status: 'completed', description: 'Project kickoff and team assembly' },
      { date: '2024-02-01', event: 'Requirements Gathering', status: 'completed', description: 'Stakeholder interviews and documentation' },
      { date: '2024-02-15', event: 'AI Implementation Planning', status: phase.progress > 30 ? 'completed' : 'pending', description: 'Technology stack selection and architecture design' },
      { date: '2024-03-01', event: 'Development Phase', status: phase.progress > 50 ? 'completed' : phase.progress > 30 ? 'in-progress' : 'pending', description: 'Core development and testing' },
      { date: '2024-03-15', event: 'Testing & Validation', status: phase.progress > 70 ? 'completed' : phase.progress > 50 ? 'in-progress' : 'pending', description: 'Comprehensive testing and quality assurance' },
      { date: phase.endDate, event: 'Phase Completion', status: phase.status === 'completed' ? 'completed' : 'pending', description: 'Final deliverables and handover' }
    ];
    return events.filter(event => event.date);
  };

  const detailedMetrics = generateDetailedMetrics(phase);
  const riskAssessment = generateRiskAssessment(phase);
  const timelineEvents = generateTimelineEvents(phase);

  // Define tabs with special structure for Due Diligence
  const baseTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'metrics', label: 'Detailed Metrics', icon: PieChart },
    { id: 'ai', label: 'Agentic AI Analysis', icon: Brain },
    { id: 'risks', label: 'Risk Assessment', icon: Shield },
    { id: 'timeline', label: 'Timeline', icon: Calendar }
  ];

  // Special tab structure for Due Diligence Risk Agentic AI
  const tabs = phase.id === 'due-diligence' 
    ? [
        { id: 'agentic-ai-risks', label: 'Risk Agentic AI', icon: Zap },
        { id: 'mitigation-plan', label: 'Mitigation Plan', icon: FileCheck },
        { id: 'timeline', label: 'Timeline', icon: Calendar }
      ]
    : phase.id === 'knowledge-acquisition'
    ? [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'knowledge-ai-assist', label: 'Transition Risk Agentic AI', icon: Brain },
        { id: 'metrics', label: 'Detailed Metrics', icon: PieChart },
        { id: 'risks', label: 'Risk Assessment', icon: Shield },
        { id: 'timeline', label: 'Timeline', icon: Calendar }
      ]
    : baseTabs;

  return (
    <div className="space-y-6">
      {/* Header with Status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{phase.name}</h1>
          <p className="text-gray-600 text-lg">{phase.description}</p>
        </div>
        <div className="text-right">
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(phase.status)}`}>
            {phase.status.replace('-', ' ').toUpperCase()}
          </span>
          <div className="text-2xl font-bold text-primary-600 mt-2">{phase.progress}%</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Progress Overview</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="text-gray-500" size={16} />
              <span className="text-sm text-gray-600">{phase.startDate} - {phase.endDate || 'Ongoing'}</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
          <div
            className={`h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-3 ${getProgressColor(phase.progress)}`}
            style={{ width: `${phase.progress}%` }}
          >
            <span className="text-white text-sm font-medium">{phase.progress}%</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phase.keyMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">{metric.label}</h3>
                    {metric.change && (
                      <div className={`flex items-center text-sm ${
                        metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        <span className="ml-1">{metric.change}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                </div>
              ))}
            </div>

            {/* AI Implementations Summary */}
            <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
              <div className="flex items-center mb-4">
                <Brain className="text-primary-600 mr-3" size={24} />
                <h3 className="text-lg font-semibold text-primary-900">Cognizant Neuro AI Implementation Impact</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <Zap className="text-primary-600 mx-auto mb-2" size={20} />
                  <div className="text-lg font-bold text-primary-900">{phase.aiImplementations.length}</div>
                  <div className="text-sm text-primary-700">AI Solutions</div>
                </div>
                <div className="text-center">
                  <Activity className="text-green-600 mx-auto mb-2" size={20} />
                  <div className="text-lg font-bold text-green-900">85%</div>
                  <div className="text-sm text-green-700">Efficiency Gain</div>
                </div>
                <div className="text-center">
                  <DollarSign className="text-blue-600 mx-auto mb-2" size={20} />
                  <div className="text-lg font-bold text-blue-900">$2.4M</div>
                  <div className="text-sm text-blue-700">Cost Savings</div>
                </div>
                <div className="text-center">
                  <Timer className="text-purple-600 mx-auto mb-2" size={20} />
                  <div className="text-lg font-bold text-purple-900">60%</div>
                  <div className="text-sm text-purple-700">Time Reduction</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailedMetrics.map((metric, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">{metric.label}</h3>
                  {metric.change && (
                    <div className={`flex items-center text-sm ${
                      metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      <span className="ml-1">{metric.change}</span>
                    </div>
                  )}
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-xs text-gray-500">vs. previous period</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-6">
            {phase.aiImplementations.map((implementation, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{implementation}</h3>
                      <p className="text-gray-600 mt-1">
                        Advanced Cognizant Neuro AI technology enhancing efficiency and reducing manual effort in this area.
                      </p>
                    </div>
                  </div>
                  <Award className="text-primary-600" size={20} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-green-800">Impact Score</div>
                    <div className="text-xl font-bold text-green-900">{Math.round(Math.random() * 20 + 80)}/100</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-blue-800">Complexity</div>
                    <div className="text-xl font-bold text-blue-900">
                      {['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]}
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-purple-800">ROI Timeline</div>
                    <div className="text-xl font-bold text-purple-900">{Math.round(Math.random() * 6 + 3)} months</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-4">
            {riskAssessment.map((risk, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{risk.category} Risk</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    risk.level === 'Low' ? 'bg-green-100 text-green-700' :
                    risk.level === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {risk.level} Risk
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{risk.description}</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-700 mb-1">Mitigation Strategy:</div>
                  <div className="text-sm text-gray-600">{risk.mitigation}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'agentic-ai-risks' && phase.id === 'due-diligence' && (
          <AgenticAIRiskAnalysis phase={phase} />
        )}

        {activeTab === 'mitigation-plan' && phase.id === 'due-diligence' && (
          <MitigationPlan phase={phase} />
        )}

        {activeTab === 'knowledge-ai-assist' && phase.id === 'knowledge-acquisition' && (
          <div className="space-y-6">
            {/* Knowledge Dashboard Header */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
              <div className="flex items-center mb-4">
                <Brain className="text-purple-600 mr-3" size={28} />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Knowledge Dashboard</h2>
                  <p className="text-gray-600">AI-powered knowledge extraction, documentation, and intelligent assistance</p>
                </div>
              </div>
            </div>

            {/* AI Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <FileText className="text-blue-600 mr-3" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900">Smart Documentation</h3>
                </div>
                <p className="text-gray-600 mb-4">Automated extraction and organization of knowledge from legacy systems and documents.</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Document parsing & analysis</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Knowledge graph generation</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Automated categorization</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Brain className="text-purple-600 mr-3" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900">Intelligent Q&A</h3>
                </div>
                <p className="text-gray-600 mb-4">AI-powered question answering system based on your organization's knowledge base.</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Natural language queries</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Context-aware responses</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Source attribution</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Zap className="text-yellow-600 mr-3" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900">Process Mining</h3>
                </div>
                <p className="text-gray-600 mb-4">Automatically discover and map business processes from system logs and documentation.</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Workflow discovery</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Process optimization</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Dependency mapping</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Knowledge Statistics */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Knowledge Extraction Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">8,920</div>
                  <div className="text-sm text-gray-600">Knowledge Items</div>
                  <div className="text-xs text-green-600 mt-1">+120% this month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                  <div className="text-xs text-green-600 mt-1">+5% improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">1.2h</div>
                  <div className="text-sm text-gray-600">Avg Processing Time</div>
                  <div className="text-xs text-green-600 mt-1">-40% faster</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">2,340</div>
                  <div className="text-sm text-gray-600">AI Queries Answered</div>
                  <div className="text-xs text-green-600 mt-1">+85% engagement</div>
                </div>
              </div>
            </div>

            {/* AI Assistant Actions */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Brain className="text-purple-600 mr-2" size={20} />
                AI-Powered Knowledge Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <div className="flex items-center">
                    <FileText className="text-blue-600 mr-3" size={20} />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Extract from Documents</div>
                      <div className="text-sm text-gray-600">Upload docs for AI extraction</div>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={16} />
                </button>
                
                <button className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all">
                  <div className="flex items-center">
                    <Brain className="text-purple-600 mr-3" size={20} />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Ask AI Assistant</div>
                      <div className="text-sm text-gray-600">Query knowledge base</div>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={16} />
                </button>
              </div>
            </div>

            {/* Knowledge AI Chat Interface */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mr-3">
                  <Brain className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Transition Risk AI Chat Assistant</h3>
                  <p className="text-sm text-gray-600">Ask questions about your knowledge base, processes, and documentation</p>
                </div>
              </div>
              
              {/* Chat Messages Area */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4 min-h-[300px] max-h-[400px] overflow-y-auto">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'ai' 
                          ? 'bg-purple-100' 
                          : 'bg-blue-100'
                      }`}>
                        {message.sender === 'ai' ? (
                          <Brain className="text-purple-600" size={16} />
                        ) : (
                          <User className="text-blue-600" size={16} />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 shadow-sm max-w-xs lg:max-w-md ${
                        message.sender === 'ai' 
                          ? 'bg-white' 
                          : 'bg-blue-600 text-white'
                      }`}>
                        <p className={`text-sm ${message.sender === 'ai' ? 'text-gray-700' : 'text-white'}`}>
                          {message.text}
                        </p>
                        <p className={`text-xs mt-2 ${message.sender === 'ai' ? 'text-gray-500' : 'text-blue-200'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Brain className="text-purple-600" size={16} />
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={chatEndRef} />
                </div>
                
                {/* Suggested Questions - only show when no conversation started */}
                {chatMessages.length === 1 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <button 
                      onClick={() => handleSuggestedQuestion('Show me recent extractions')}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs hover:bg-purple-200 transition-colors"
                    >
                      Show me recent extractions
                    </button>
                    <button 
                      onClick={() => handleSuggestedQuestion('Explain workflow process')}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                    >
                      Explain workflow process
                    </button>
                    <button 
                      onClick={() => handleSuggestedQuestion('Knowledge base summary')}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition-colors"
                    >
                      Knowledge base summary
                    </button>
                  </div>
                )}
              </div>
              
              {/* Chat Input */}
              <div className="flex space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about your knowledge base, processes, or documentation..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    disabled={isTyping}
                  />
                </div>
                <button 
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isTyping}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-sm font-semibold text-purple-600">2,340</div>
                  <div className="text-xs text-gray-500">Questions Answered</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-blue-600">95%</div>
                  <div className="text-xs text-gray-500">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-green-600">1.2s</div>
                  <div className="text-xs text-gray-500">Avg Response Time</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {event.status === 'completed' ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : event.status === 'in-progress' ? (
                    <Clock className="text-blue-500" size={20} />
                  ) : (
                    <AlertTriangle className="text-gray-400" size={20} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{event.event}</h3>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Agentic Chat with Phase Context */}
      <AgenticChat phaseContext={phase.name} />
    </div>
  );
};

export default DetailedPhaseAnalysis;
