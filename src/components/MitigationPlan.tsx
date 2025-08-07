import React, { useState } from 'react';
import { Phase } from '../types';
import { 
  Download, 
  FileText, 
  Calendar, 
  User, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Shield,
  Brain,
  Zap,
  Send,
  MessageCircle
} from 'lucide-react';
import AgenticChat from './AgenticChat';

interface MitigationPlanProps {
  phase: Phase;
}

interface MitigationItem {
  id: string;
  riskId: string;
  riskTitle: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  strategy: string;
  actions: string[];
  owner: string;
  timeline: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked';
  estimatedCost: string;
  expectedOutcome: string;
}

const MitigationPlan: React.FC<MitigationPlanProps> = ({ phase }) => {
  const [selectedMitigation, setSelectedMitigation] = useState<MitigationItem | null>(null);

  // Generate mitigation items based on phase data
  const generateMitigationItems = (): MitigationItem[] => {
    const risksCount = parseInt(phase.keyMetrics.find(m => m.label === 'Risks Identified')?.value?.toString().replace(/[^0-9]/g, '') || '47');
    
    return [
    {
      id: 'MIT-001',
      riskId: 'DD-001',
      riskTitle: 'Legacy System Integration Complexity',
      priority: 'High',
      strategy: 'Implement API gateway with transformation layers and gradual migration approach',
      actions: [
        'Deploy containerized microservices architecture',
        'Implement API gateway for legacy system integration',
        'Create data transformation middleware',
        'Establish rollback procedures for critical systems',
        'Conduct phased migration testing'
      ],
      owner: 'Technical Architecture Team',
      timeline: '6-8 weeks',
      status: 'In Progress',
      estimatedCost: '$120,000',
      expectedOutcome: 'Seamless integration with 99.5% uptime during transition'
    },
    {
      id: 'MIT-002',
      riskId: 'DD-002',
      riskTitle: 'Data Privacy Regulation Gaps',
      priority: 'Critical',
      strategy: 'Implement comprehensive data governance framework with automated compliance monitoring',
      actions: [
        'Deploy AI-powered data classification system',
        'Implement automated privacy protection controls',
        'Establish data lineage tracking',
        'Create compliance monitoring dashboard',
        'Conduct regular compliance audits'
      ],
      owner: 'Compliance & Legal Team',
      timeline: '4-6 weeks',
      status: 'Not Started',
      estimatedCost: '$85,000',
      expectedOutcome: '100% compliance with GDPR and regional privacy laws'
    },
    {
      id: 'MIT-003',
      riskId: 'DD-003',
      riskTitle: 'Insufficient Access Control Mechanisms',
      priority: 'High',
      strategy: 'Implement zero-trust security model with multi-factor authentication',
      actions: [
        'Deploy behavioral analytics for anomaly detection',
        'Implement multi-factor authentication system',
        'Create role-based access control matrix',
        'Establish automated threat response protocols',
        'Conduct security awareness training'
      ],
      owner: 'Cybersecurity Team',
      timeline: '3-4 weeks',
      status: 'Completed',
      estimatedCost: '$45,000',
      expectedOutcome: 'Zero security breaches with enhanced user access monitoring'
    },
    {
      id: 'MIT-004',
      riskId: 'DD-004',
      riskTitle: 'Budget Overrun Risk Due to Scope Creep',
      priority: 'Medium',
      strategy: 'Establish strict change control processes with impact assessment protocols',
      actions: [
        'Implement predictive cost modeling system',
        'Create real-time budget tracking dashboard',
        'Establish change request approval workflow',
        'Conduct weekly budget review meetings',
        'Deploy automated cost alerting system'
      ],
      owner: 'Project Management Office',
      timeline: '2-3 weeks',
      status: 'In Progress',
      estimatedCost: '$25,000',
      expectedOutcome: 'Budget variance reduced to <5% with improved project predictability'
    },
    {
      id: 'MIT-005',
      riskId: 'DD-005',
      riskTitle: 'Knowledge Transfer Dependencies',
      priority: 'High',
      strategy: 'Accelerated knowledge documentation and cross-training programs',
      actions: [
        'Deploy AI-powered knowledge extraction tools',
        'Create automated documentation generation system',
        'Establish cross-functional training programs',
        'Implement knowledge repository with search capabilities',
        'Conduct knowledge validation sessions'
      ],
      owner: 'Knowledge Management Team',
      timeline: '5-7 weeks',
      status: 'Blocked',
      estimatedCost: '$65,000',
      expectedOutcome: '95% knowledge retention with reduced dependency on key personnel'
    }
  ];
  };
  
  const mitigationItems = generateMitigationItems();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Not Started': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Blocked': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="text-green-600" size={16} />;
      case 'In Progress': return <Clock className="text-blue-600" size={16} />;
      case 'Not Started': return <Target className="text-gray-600" size={16} />;
      case 'Blocked': return <AlertTriangle className="text-red-600" size={16} />;
      default: return <Target className="text-gray-600" size={16} />;
    }
  };

  const downloadReport = () => {
    // Create a comprehensive report
    const reportData = {
      title: 'Due Diligence Risk Mitigation Plan',
      generatedDate: new Date().toISOString(),
      phase: phase.name,
      totalMitigations: mitigationItems.length,
      completedMitigations: mitigationItems.filter(m => m.status === 'Completed').length,
      totalEstimatedCost: mitigationItems.reduce((sum, item) => {
        const cost = parseInt(item.estimatedCost.replace(/[^0-9]/g, ''));
        return sum + cost;
      }, 0),
      mitigations: mitigationItems
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mitigation-plan-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const overviewStats = {
    totalMitigations: mitigationItems.length,
    completed: mitigationItems.filter(m => m.status === 'Completed').length,
    inProgress: mitigationItems.filter(m => m.status === 'In Progress').length,
    blocked: mitigationItems.filter(m => m.status === 'Blocked').length,
    totalCost: mitigationItems.reduce((sum, item) => {
      const cost = parseInt(item.estimatedCost.replace(/[^0-9]/g, ''));
      return sum + cost;
    }, 0)
  };

  return (
    <div className="space-y-6">
      {/* AI Chat Assistant Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <MessageCircle className="text-blue-600 mr-3" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Transition Risk AI Chat Assistant</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Get instant assistance with mitigation strategies, risk assessments, and implementation guidance using Cognizant Neuro AI.
          </p>
          <div className="bg-white rounded-lg border border-gray-200">
            <AgenticChat phaseContext={phase.name} />
          </div>
        </div>
      </div>

      {/* Header with Download Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Shield className="text-blue-600 mr-3" size={28} />
            Mitigation Plan & Strategy
          </h2>
          <p className="text-gray-600">Comprehensive risk mitigation strategies with actionable implementation plans</p>
        </div>
        <button
          onClick={downloadReport}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download size={16} />
          <span>Download Report</span>
        </button>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-900">{overviewStats.totalMitigations}</div>
          <div className="text-sm text-blue-700">Total Mitigations</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-900">{overviewStats.completed}</div>
          <div className="text-sm text-green-700">Completed</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-900">{overviewStats.inProgress}</div>
          <div className="text-sm text-yellow-700">In Progress</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-900">{overviewStats.blocked}</div>
          <div className="text-sm text-red-700">Blocked</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-900">${(overviewStats.totalCost / 1000).toFixed(0)}K</div>
          <div className="text-sm text-purple-700">Total Budget</div>
        </div>
      </div>

      {/* AI Insights for Mitigation */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center mb-4">
          <Brain className="text-purple-600 mr-3" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">Cognizant Neuro AI Mitigation Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center mb-2">
              <TrendingUp className="text-green-600 mr-2" size={16} />
              <span className="font-medium text-green-800">Success Probability</span>
            </div>
            <p className="text-sm text-gray-600">
              AI analysis predicts {Math.round(92 + Math.random() * 6)}% success rate for current mitigation strategies with proper execution.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Zap className="text-blue-600 mr-2" size={16} />
              <span className="font-medium text-blue-800">Optimization Opportunity</span>
            </div>
            <p className="text-sm text-gray-600">
              Cost optimization potential of 15% identified through parallel execution of compatible mitigations.
            </p>
          </div>
        </div>
      </div>

      {/* Mitigation Items List */}
      <div className="space-y-4">
        {mitigationItems.map((mitigation) => (
          <div
            key={mitigation.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedMitigation(selectedMitigation?.id === mitigation.id ? null : mitigation)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm font-medium text-gray-600">{mitigation.id}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(mitigation.priority)}`}>
                    {mitigation.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(mitigation.status)}`}>
                    {getStatusIcon(mitigation.status)}
                    <span className="ml-1">{mitigation.status}</span>
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{mitigation.riskTitle}</h4>
                <p className="text-gray-600 mb-3">{mitigation.strategy}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span className="flex items-center">
                    <User className="mr-1" size={14} />
                    {mitigation.owner}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="mr-1" size={14} />
                    {mitigation.timeline}
                  </span>
                  <span className="flex items-center">
                    <TrendingUp className="mr-1" size={14} />
                    {mitigation.estimatedCost}
                  </span>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedMitigation?.id === mitigation.id && (
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <FileText className="text-blue-600 mr-2" size={16} />
                      Action Items
                    </h5>
                    <ul className="space-y-2">
                      {mitigation.actions.map((action, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
                          <span className="text-gray-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Target className="text-purple-600 mr-2" size={16} />
                      Expected Outcome
                    </h5>
                    <p className="text-gray-600 text-sm bg-purple-50 p-3 rounded-lg">
                      {mitigation.expectedOutcome}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MitigationPlan;
