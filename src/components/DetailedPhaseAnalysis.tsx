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
  User,
  Download
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
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'ai' | 'risks' | 'timeline' | 'agentic-ai-risks' | 'mitigation-plan' | 'knowledge-ai-assist' | 'kt-ai-assistant'>(
    phase.id === 'knowledge-acquisition' ? 'knowledge-ai-assist' : 
    phase.id === 'shadow-reverse' ? 'kt-ai-assistant' : 
    phase.id === 'due-diligence' ? 'agentic-ai-risks' : 'overview'
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

  // Simulate AI response for Knowledge Acquisition
  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      'recent extractions': `Here are the recent extractions: ${Math.floor(parseInt(phase.keyMetrics[0]?.value?.toString().replace(/[^0-9]/g, '') || '1240') / 7)} knowledge items processed this week with ${phase.keyMetrics[1]?.value || '94%'} accuracy. Key domains include system architecture (35%), business processes (28%), and technical documentation (37%).`,
      'workflow process': "Our workflow process includes: 1) Document ingestion → 2) AI-powered analysis → 3) Knowledge extraction → 4) Quality validation → 5) Knowledge base integration. Average processing time is 1.2 hours per document.",
      'knowledge base summary': `Knowledge Base Summary: ${phase.keyMetrics[0]?.value || '8,920'} total items, ${phase.keyMetrics[1]?.value || '92%'} accuracy rate, covering 15 business domains. Top categories: Technical docs (40%), Process guides (30%), Policy documents (20%), Training materials (10%).`,
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

  // Handle quick message buttons for KT AI Assistant
  const handleQuickMessage = (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Generate specialized KT responses using dynamic phase data
    const generateKTResponse = (question: string) => {
      const lowerQuestion = question.toLowerCase();
      // Get current phase metrics for Shadow & Reverse Shadow
      const shadowPhase = phase.id === 'shadow-reverse' ? phase : null;
      
      if (lowerQuestion.includes('completion status') || lowerQuestion.includes('kt status')) {
        const testCoverage = shadowPhase?.keyMetrics.find(m => m.label === 'Test Coverage')?.value || '0%';
        return `Current KT completion is at 87% with 156 knowledge items documented. System Administration (95%) and API Documentation (92%) are nearly complete. Business Processes (78%) and Troubleshooting Guides (67%) need additional focus. Test coverage is currently at ${testCoverage}.`;
      } else if (lowerQuestion.includes('gaps') || lowerQuestion.includes('identify')) {
        return "I've identified 4 critical knowledge gaps: 1) Legacy system documentation incomplete (High risk), 2) Complex business rules undocumented (High risk), 3) Key personnel not fully engaged (Medium risk), 4) Testing procedures need clarification (Low risk). Recommend immediate focus on items 1 and 3.";
      } else if (lowerQuestion.includes('critical areas')) {
        return "Critical knowledge areas requiring immediate attention: Database Management (89% complete), Business Processes (78% complete), and Troubleshooting Guides (67% complete). These areas have high business impact and should be prioritized in shadow operations.";
      } else if (lowerQuestion.includes('progress report')) {
        const progressValue = shadowPhase?.progress || 0;
        return `KT Progress Summary: Overall 87% complete with 94% accuracy. 12 active shadow sessions running. Phase progress: ${progressValue}%. Top performers: System Admin (95%), API Docs (92%). Areas needing focus: Troubleshooting (67%), Business Processes (78%). Estimated completion: 2 weeks at current pace.`;
      }
      return generateAIResponse(question);
    };

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateKTResponse(message),
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

  // Download Knowledge Acquisition Mitigation Plan
  const downloadKnowledgeMitigationPlan = () => {
    const mitigationPlanData = {
      title: 'Knowledge Acquisition Mitigation Plan',
      generatedDate: new Date().toISOString(),
      phase: phase.name,
      phaseId: phase.id,
      progress: `${phase.progress}%`,
      status: phase.status,
      mitigations: [
        {
          id: 'KA-MIT-001',
          riskTitle: 'Knowledge Transfer Bottlenecks',
          priority: 'High',
          strategy: 'Implement AI-powered knowledge extraction and automated documentation',
          actions: [
            'Deploy AI knowledge extraction tools',
            'Create automated documentation generation system',
            'Establish parallel knowledge capture streams',
            'Implement real-time knowledge validation'
          ],
          timeline: '4-6 weeks',
          owner: 'Knowledge Management Team',
          estimatedCost: '$75,000',
          expectedOutcome: '90% reduction in knowledge transfer bottlenecks'
        },
        {
          id: 'KA-MIT-002', 
          riskTitle: 'Documentation Quality Gaps',
          priority: 'Medium',
          strategy: 'Deploy intelligent document review and validation systems',
          actions: [
            'Implement AI-powered document quality assessment',
            'Create automated review workflows',
            'Establish quality metrics and monitoring',
            'Deploy real-time feedback systems'
          ],
          timeline: '3-4 weeks',
          owner: 'Technical Documentation Team',
          estimatedCost: '$45,000',
          expectedOutcome: '95% improvement in documentation quality scores'
        },
        {
          id: 'KA-MIT-003',
          riskTitle: 'Expert Knowledge Dependencies',
          priority: 'Critical',
          strategy: 'Accelerated knowledge capture with AI-assisted interviews',
          actions: [
            'Deploy AI-powered interview analysis',
            'Create knowledge dependency mapping',
            'Implement expert knowledge capture automation',
            'Establish knowledge redundancy systems'
          ],
          timeline: '2-3 weeks',
          owner: 'Subject Matter Expert Team',
          estimatedCost: '$60,000',
          expectedOutcome: '85% reduction in critical knowledge dependencies'
        }
      ],
      recommendations: [
        'Prioritize critical knowledge areas first',
        'Implement parallel documentation streams',
        'Establish continuous validation processes',
        'Deploy AI-powered knowledge extraction tools',
        'Create knowledge dependency maps',
        'Implement automated quality checks'
      ],
      riskMetrics: {
        totalRisks: 3,
        criticalRisks: 1,
        highRisks: 1,
        mediumRisks: 1,
        lowRisks: 0
      },
      totalEstimatedCost: '$180,000',
      estimatedTimeToComplete: '6 weeks',
      expectedROI: '250%',
      successMetrics: [
        'Knowledge transfer efficiency: +90%',
        'Documentation quality score: +95%',
        'Expert dependency reduction: -85%',
        'Process automation rate: +70%'
      ]
    };

    // Create and download the file
    const dataStr = JSON.stringify(mitigationPlanData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `knowledge-acquisition-mitigation-plan-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
        { id: 'knowledge-ai-assist', label: 'Transition Risk Agentic AI', icon: Brain },
        { id: 'metrics', label: 'Detailed Metrics', icon: PieChart },
        { id: 'risks', label: 'Risk Assessment', icon: Shield },
        { id: 'timeline', label: 'Timeline', icon: Calendar }
      ]
    : phase.id === 'shadow-reverse'
    ? [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'kt-ai-assistant', label: 'KT AI Assistant', icon: Brain },
        { id: 'metrics', label: 'Detailed Metrics', icon: PieChart },
        { id: 'risks', label: 'Risk Assessment', icon: Shield },
        { id: 'timeline', label: 'Timeline', icon: Calendar }
      ]
    : phase.id === 'dashboard'
    ? [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'metrics', label: 'Detailed Metrics', icon: PieChart },
        { id: 'ai', label: 'Agentic AI Analysis', icon: Brain },
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
            {/* Knowledge Acquisition Header */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
              <div className="flex items-center mb-4">
                <Brain className="text-purple-600 mr-3" size={28} />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Knowledge Acquisition</h2>
                  <p className="text-gray-600">AI-powered knowledge extraction, documentation, and intelligent assistance</p>
                </div>
              </div>
            </div>

            {/* Knowledge AI Chat Interface - Moved to Top */}
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
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Chat Input */}
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me about your transition process, risks, or documentation..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

            {/* Knowledge Acquisition Mitigation Plan Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Shield className="text-red-600 mr-3" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Knowledge Acquisition Mitigation Plan</h3>
                    <p className="text-sm text-gray-600">Comprehensive risk mitigation strategies for knowledge transfer and documentation</p>
                  </div>
                </div>
                <button
                  onClick={downloadKnowledgeMitigationPlan}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Download size={16} />
                  <span>Download Plan</span>
                </button>
              </div>

              {/* Mitigation Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="text-red-600 mr-2" size={16} />
                    <span className="text-sm font-medium text-red-800">Critical Risks</span>
                  </div>
                  <div className="text-2xl font-bold text-red-900">1</div>
                  <div className="text-xs text-red-700">Expert Knowledge Dependencies</div>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="text-orange-600 mr-2" size={16} />
                    <span className="text-sm font-medium text-orange-800">High Priority</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900">1</div>
                  <div className="text-xs text-orange-700">Knowledge Transfer Bottlenecks</div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="text-blue-600 mr-2" size={16} />
                    <span className="text-sm font-medium text-blue-800">Investment</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">$180K</div>
                  <div className="text-xs text-blue-700">Total Mitigation Cost</div>
                </div>
              </div>

              {/* Key Mitigation Strategies */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-3">Key Mitigation Strategies</h4>
                
                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full mr-3">CRITICAL</span>
                      <h5 className="font-medium text-red-900">Expert Knowledge Dependencies</h5>
                    </div>
                    <span className="text-xs text-red-600">2-3 weeks</span>
                  </div>
                  <p className="text-sm text-red-700 mb-2">Accelerated knowledge capture with AI-assisted interviews</p>
                  <div className="text-xs text-red-600">Owner: Subject Matter Expert Team • Cost: $60,000</div>
                </div>

                <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full mr-3">HIGH</span>
                      <h5 className="font-medium text-orange-900">Knowledge Transfer Bottlenecks</h5>
                    </div>
                    <span className="text-xs text-orange-600">4-6 weeks</span>
                  </div>
                  <p className="text-sm text-orange-700 mb-2">Implement AI-powered knowledge extraction and automated documentation</p>
                  <div className="text-xs text-orange-600">Owner: Knowledge Management Team • Cost: $75,000</div>
                </div>

                <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full mr-3">MEDIUM</span>
                      <h5 className="font-medium text-yellow-900">Documentation Quality Gaps</h5>
                    </div>
                    <span className="text-xs text-yellow-600">3-4 weeks</span>
                  </div>
                  <p className="text-sm text-yellow-700 mb-2">Deploy intelligent document review and validation systems</p>
                  <div className="text-xs text-yellow-600">Owner: Technical Documentation Team • Cost: $45,000</div>
                </div>
              </div>

              {/* Success Metrics */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Expected Outcomes</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">+90%</div>
                    <div className="text-xs text-gray-600">Transfer Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">+95%</div>
                    <div className="text-xs text-gray-600">Quality Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">-85%</div>
                    <div className="text-xs text-gray-600">Dependencies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">250%</div>
                    <div className="text-xs text-gray-600">Expected ROI</div>
                  </div>
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
                  <div className="text-3xl font-bold text-blue-600 mb-2">{phase.keyMetrics[0]?.value || '8,920'}</div>
                  <div className="text-sm text-gray-600">Knowledge Items</div>
                  <div className="text-xs text-green-600 mt-1">{phase.keyMetrics[0]?.change || '+120% this month'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{phase.keyMetrics[1]?.value || '92%'}</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                  <div className="text-xs text-green-600 mt-1">{phase.keyMetrics[1]?.change || '+5% improvement'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{phase.keyMetrics[2]?.value || '1.2h'}</div>
                  <div className="text-sm text-gray-600">Avg Processing Time</div>
                  <div className="text-xs text-green-600 mt-1">{phase.keyMetrics[2]?.change || '-40% faster'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {phase.keyMetrics.find(m => m.label === 'Documents Analyzed')?.value || '2,340'}
                  </div>
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
          </div>
        )}

        {activeTab === 'kt-ai-assistant' && phase.id === 'shadow-reverse' && (
          <div className="space-y-6">
            {/* KT AI Assistant Header */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
              <div className="flex items-center mb-4">
                <Brain className="text-indigo-600 mr-3" size={28} />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Knowledge Transfer AI Assistant</h2>
                  <p className="text-gray-600">AI-powered tracking and management of knowledge transfer during shadow operations</p>
                </div>
              </div>
            </div>

            {/* KT Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{phase.progress || 87}%</div>
                <div className="text-sm text-gray-600">KT Completion</div>
                <div className="text-xs text-green-600 mt-1">↑ 15% this week</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {phase.keyMetrics.find(m => m.label === 'Test Coverage')?.value?.toString().replace('%', '') || '156'}
                </div>
                <div className="text-sm text-gray-600">Knowledge Items</div>
                <div className="text-xs text-blue-600 mt-1">↑ 23 new items</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
                <div className="text-sm text-gray-600">Active Sessions</div>
                <div className="text-xs text-gray-600 mt-1">Live tracking</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
                <div className="text-sm text-gray-600">Accuracy Score</div>
                <div className="text-xs text-green-600 mt-1">↑ 2% improved</div>
              </div>
            </div>

            {/* KT AI Chat Interface */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Brain className="text-indigo-600 mr-3" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">KT AI Chat Assistant</h3>
                  <p className="text-sm text-gray-600">Ask questions about knowledge transfer progress, identify gaps, and get real-time insights</p>
                </div>
              </div>
              
              {/* Chat Messages Area */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4 min-h-[300px] max-h-[400px] overflow-y-auto">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'ai' 
                          ? 'bg-indigo-100' 
                          : 'bg-blue-100'
                      }`}>
                        {message.sender === 'ai' ? (
                          <Brain className="text-indigo-600" size={16} />
                        ) : (
                          <span className="text-blue-600 text-sm font-medium">U</span>
                        )}
                      </div>
                      <div className={`flex-1 p-3 rounded-lg ${
                        message.sender === 'ai'
                          ? 'bg-white border border-gray-200'
                          : 'bg-blue-600 text-white'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <span className={`text-xs mt-1 block ${
                          message.sender === 'ai' ? 'text-gray-500' : 'text-blue-100'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-indigo-100">
                        <Brain className="text-indigo-600" size={16} />
                      </div>
                      <div className="flex-1 p-3 rounded-lg bg-white border border-gray-200">
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
              </div>

              {/* Chat Input */}
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about KT progress, gaps, or specific knowledge areas..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isTyping}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>

              {/* Quick Action Buttons */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button 
                  onClick={() => handleQuickMessage("What's the current KT completion status?")}
                  className="px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100 transition-colors"
                >
                  KT Status
                </button>
                <button 
                  onClick={() => handleQuickMessage("Identify any knowledge gaps")}
                  className="px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100 transition-colors"
                >
                  Find Gaps
                </button>
                <button 
                  onClick={() => handleQuickMessage("Show critical knowledge areas")}
                  className="px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100 transition-colors"
                >
                  Critical Areas
                </button>
                <button 
                  onClick={() => handleQuickMessage("Generate KT progress report")}
                  className="px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100 transition-colors"
                >
                  Progress Report
                </button>
              </div>
            </div>

            {/* KT Progress Tracking */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="text-green-600 mr-2" size={20} />
                  Knowledge Transfer Progress
                </h3>
                <div className="space-y-4">
                  {[
                    { area: 'System Administration', progress: 95, status: 'Completed' },
                    { area: 'Database Management', progress: 89, status: 'In Progress' },
                    { area: 'Business Processes', progress: 78, status: 'In Progress' },
                    { area: 'API Documentation', progress: 92, status: 'Completed' },
                    { area: 'Troubleshooting Guides', progress: 67, status: 'In Progress' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{item.area}</span>
                          <span className="text-sm text-gray-500">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${item.progress >= 90 ? 'bg-green-500' : item.progress >= 70 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                        item.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="text-yellow-600 mr-2" size={20} />
                  Knowledge Gaps & Risks
                </h3>
                <div className="space-y-3">
                  {[
                    { risk: 'Legacy system documentation incomplete', severity: 'High', impact: 'Medium' },
                    { risk: 'Key personnel not fully engaged', severity: 'Medium', impact: 'High' },
                    { risk: 'Complex business rules undocumented', severity: 'High', impact: 'High' },
                    { risk: 'Testing procedures need clarification', severity: 'Low', impact: 'Medium' }
                  ].map((risk, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{risk.risk}</p>
                          <div className="mt-1 flex space-x-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              risk.severity === 'High' ? 'bg-red-100 text-red-800' :
                              risk.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {risk.severity} Risk
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              risk.impact === 'High' ? 'bg-red-100 text-red-800' :
                              risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {risk.impact} Impact
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
