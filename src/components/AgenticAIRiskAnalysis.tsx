import React, { useState } from 'react';
import { Phase } from '../types';
import { 
  Brain, 
  Shield, 
  CheckCircle, 
  TrendingUp,
  TrendingDown,
  Eye,
  Zap,
  Target,
  Activity,
  FileText,
  Users,
  Database,
  Lock,
  Upload,
  Plus,
  Minus
} from 'lucide-react';
import FileUploadRiskAnalysis from './FileUploadRiskAnalysis';

interface AgenticAIRiskAnalysisProps {
  phase: Phase;
}

interface RiskItem {
  id: string;
  category: 'Technical' | 'Operational' | 'Compliance' | 'Security' | 'Financial' | 'Timeline';
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  probability: number; // 0-100
  impact: number; // 0-100
  riskScore: number; // calculated
  status: 'Identified' | 'Mitigated' | 'In Progress' | 'Accepted';
  mitigationStrategy: string;
  aiRecommendation: string;
  detectedBy: string;
  timeline: string;
}

const AgenticAIRiskAnalysis: React.FC<AgenticAIRiskAnalysisProps> = ({ phase }) => {
  const [selectedRisk, setSelectedRisk] = useState<RiskItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [uploadStats, setUploadStats] = useState({
    totalFiles: 0,
    totalRisks: 0,
    averageRiskScore: 0,
    totalMitigations: 0
  });

  const handleFileAnalyzed = (file: any) => {
    const fileRisks = file.findings.reduce((sum: number, finding: any) => sum + finding.count, 0);
    setUploadStats(prev => ({
      totalFiles: prev.totalFiles + 1,
      totalRisks: prev.totalRisks + fileRisks,
      averageRiskScore: Math.round((prev.averageRiskScore * prev.totalFiles + file.riskScore) / (prev.totalFiles + 1)),
      totalMitigations: prev.totalMitigations + file.mitigationSuggestions.length
    }));
  };

  // Generate risk data based on the phase metrics
  const generateRiskData = (): RiskItem[] => {
    const risksIdentified = parseInt(phase.keyMetrics.find(m => m.label === 'Risks Identified')?.value?.toString().replace(/[^0-9]/g, '') || '47');
    const complianceScore = parseFloat(phase.keyMetrics.find(m => m.label === 'Compliance Score')?.value?.toString().replace('%', '') || '94');
    
    return [
    {
      id: 'DD-001',
      category: 'Technical',
      title: 'Legacy System Integration Complexity',
      description: 'Multiple legacy systems with outdated APIs pose integration challenges during transition',
      severity: 'High',
      probability: 75,
      impact: 80,
      riskScore: 60, // (75 * 80) / 100
      status: 'Mitigated',
      mitigationStrategy: 'Implement API gateway with transformation layers and gradual migration approach',
      aiRecommendation: 'Deploy microservices architecture with containerization for seamless integration',
      detectedBy: 'Automated document analysis',
      timeline: '2024-02-05'
    },
    {
      id: 'DD-002',
      category: 'Compliance',
      title: 'Data Privacy Regulation Gaps',
      description: 'Current data handling processes may not fully comply with GDPR and regional privacy laws',
      severity: 'Critical',
      probability: 60,
      impact: 95,
      riskScore: 57,
      status: 'In Progress',
      mitigationStrategy: 'Implement comprehensive data governance framework with automated compliance monitoring',
      aiRecommendation: 'Deploy AI-powered data classification and privacy protection automation',
      detectedBy: 'Compliance checking systems',
      timeline: '2024-02-08'
    },
    {
      id: 'DD-003',
      category: 'Security',
      title: 'Insufficient Access Control Mechanisms',
      description: 'Current role-based access control lacks granular permissions and audit trails',
      severity: 'High',
      probability: 70,
      impact: 75,
      riskScore: 52.5,
      status: 'Mitigated',
      mitigationStrategy: 'Implement zero-trust security model with multi-factor authentication',
      aiRecommendation: 'Deploy behavioral analytics for anomaly detection and automated threat response',
      detectedBy: 'Risk assessment algorithms',
      timeline: '2024-02-10'
    },
    {
      id: 'DD-004',
      category: 'Financial',
      title: 'Budget Overrun Risk Due to Scope Creep',
      description: 'Initial requirements analysis indicates potential for significant scope expansion',
      severity: 'Medium',
      probability: 65,
      impact: 60,
      riskScore: 39,
      status: 'Identified',
      mitigationStrategy: 'Establish strict change control processes with impact assessment protocols',
      aiRecommendation: 'Implement predictive cost modeling with real-time budget tracking',
      detectedBy: 'Gap analysis automation',
      timeline: '2024-02-12'
    },
    {
      id: 'DD-005',
      category: 'Operational',
      title: 'Knowledge Transfer Dependencies',
      description: 'Critical business knowledge concentrated in key personnel poses continuity risk',
      severity: 'High',
      probability: 55,
      impact: 85,
      riskScore: 46.75,
      status: 'In Progress',
      mitigationStrategy: 'Accelerated knowledge documentation and cross-training programs',
      aiRecommendation: 'Deploy AI-powered knowledge extraction and automated documentation generation',
      detectedBy: 'Automated document analysis',
      timeline: '2024-02-15'
    }
  ];
  };
  
  const riskData = generateRiskData();

  const getSeverityColor = (severity: RiskItem['severity']) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusColor = (status: RiskItem['status']) => {
    switch (status) {
      case 'Mitigated': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Identified': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Accepted': return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: RiskItem['category']) => {
    switch (category) {
      case 'Technical': return <Database className="text-blue-600" size={16} />;
      case 'Operational': return <Users className="text-purple-600" size={16} />;
      case 'Compliance': return <FileText className="text-green-600" size={16} />;
      case 'Security': return <Lock className="text-red-600" size={16} />;
      case 'Financial': return <TrendingUp className="text-yellow-600" size={16} />;
      case 'Timeline': return <Activity className="text-indigo-600" size={16} />;
    }
  };

  const filteredRisks = filterCategory === 'All' 
    ? riskData 
    : riskData.filter(risk => risk.category === filterCategory);

  const riskStats = {
    total: riskData.length + uploadStats.totalRisks,
    critical: riskData.filter(r => r.severity === 'Critical').length,
    high: riskData.filter(r => r.severity === 'High').length,
    mitigated: riskData.filter(r => r.status === 'Mitigated').length,
    avgRiskScore: uploadStats.totalFiles > 0 
      ? Math.round((riskData.reduce((sum, risk) => sum + risk.riskScore, 0) + (uploadStats.averageRiskScore * uploadStats.totalFiles)) / (riskData.length + uploadStats.totalFiles))
      : Math.round(riskData.reduce((sum, risk) => sum + risk.riskScore, 0) / riskData.length)
  };

  const categories = ['All', 'Technical', 'Operational', 'Compliance', 'Security', 'Financial', 'Timeline'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center mb-4">
          <Brain className="text-blue-600 mr-3" size={28} />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Cognizant Neuro AI Risk Analysis</h2>
            <p className="text-gray-600">AI-powered risk identification and mitigation for Due Diligence phase</p>
          </div>
        </div>
      </div>

      {/* Enhanced Risk Analysis Section - Moved to Top */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Upload className="text-blue-600 mr-3" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Enhanced Risk Analysis</h3>
              <p className="text-sm text-gray-600">Upload documents for comprehensive AI-powered risk assessment</p>
            </div>
          </div>
          <button
            onClick={() => setShowUploadSection(!showUploadSection)}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm ${
              showUploadSection
                ? 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
            }`}
          >
            {showUploadSection ? (
              <>
                <Minus className="mr-2" size={16} />
                Close Upload
              </>
            ) : (
              <>
                <Plus className="mr-2" size={16} />
                Upload Files
              </>
            )}
          </button>
        </div>

        {/* Upload Statistics Summary (always visible if files uploaded) */}
        {uploadStats.totalFiles > 0 && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Upload Analysis Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-blue-900">{uploadStats.totalFiles}</div>
                <div className="text-sm text-blue-700">Files Analyzed</div>
              </div>
              <div>
                <div className="text-xl font-bold text-orange-900">{uploadStats.totalRisks}</div>
                <div className="text-sm text-orange-700">Additional Risks</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-900">{uploadStats.averageRiskScore}/100</div>
                <div className="text-sm text-purple-700">Avg Upload Risk</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-900">{uploadStats.totalMitigations}</div>
                <div className="text-sm text-green-700">AI Suggestions</div>
              </div>
            </div>
          </div>
        )}

        {/* Collapsible Upload Section */}
        {showUploadSection && (
          <div className="space-y-4 border-t border-gray-200 pt-4 animate-in slide-in-from-top duration-300">
            <FileUploadRiskAnalysis onFileAnalyzed={handleFileAnalyzed} />
          </div>
        )}

        {/* Quick Action Buttons (when upload is hidden) */}
        {!showUploadSection && uploadStats.totalFiles === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm mb-3">
              Upload documents, spreadsheets, or reports for enhanced AI-powered risk analysis
            </p>
            <div className="flex justify-center space-x-3">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">PDF</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Excel</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Word</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">CSV</span>
            </div>
          </div>
        )}
      </div>

      {/* Risk Overview Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center mb-4">
          <Brain className="text-blue-600 mr-3" size={28} />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Risk Overview</h2>
            <p className="text-gray-600">Comprehensive risk assessment and analysis results</p>
          </div>
        </div>
        
        {/* Risk Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{riskStats.total}</div>
            <div className="text-sm text-gray-600">Total Risks</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{riskStats.critical}</div>
            <div className="text-sm text-gray-600">Critical</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{riskStats.high}</div>
            <div className="text-sm text-gray-600">High Risk</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{riskStats.mitigated}</div>
            <div className="text-sm text-gray-600">Mitigated</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{riskStats.avgRiskScore}</div>
            <div className="text-sm text-gray-600">Avg Risk Score</div>
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center mb-4">
          <Zap className="text-purple-600 mr-3" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">AI-Generated Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center mb-2">
              <TrendingDown className="text-green-600 mr-2" size={16} />
              <span className="font-medium text-green-800">Risk Reduction</span>
            </div>
            <p className="text-sm text-gray-600">
              AI analysis shows {uploadStats.totalFiles > 0 ? '15%' : '12%'} reduction in identified risks through proactive mitigation strategies.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Target className="text-blue-600 mr-2" size={16} />
              <span className="font-medium text-blue-800">Compliance Achievement</span>
            </div>
            <p className="text-sm text-gray-600">
              {phase.keyMetrics.find(m => m.label === 'Compliance Score')?.value || '94%'} compliance score achieved through automated compliance checking and gap analysis.
            </p>
          </div>
          {uploadStats.totalFiles > 0 ? (
            <>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Upload className="text-orange-600 mr-2" size={16} />
                  <span className="font-medium text-orange-800">File Analysis Impact</span>
                </div>
                <p className="text-sm text-gray-600">
                  {uploadStats.totalFiles} uploaded files revealed {uploadStats.totalRisks} additional risks requiring mitigation.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Brain className="text-purple-600 mr-2" size={16} />
                  <span className="font-medium text-purple-800">AI Recommendations</span>
                </div>
                <p className="text-sm text-gray-600">
                  {uploadStats.totalMitigations} AI-generated mitigation strategies identified from uploaded content analysis.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Upload className="text-blue-600 mr-2" size={16} />
                <span className="font-medium text-blue-800">Enhanced Analysis Available</span>
              </div>
              <p className="text-sm text-gray-600">
                Upload additional documents to unlock advanced AI-powered risk analysis and personalized mitigation strategies.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Risk List */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => (
          <div
            key={risk.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedRisk(selectedRisk?.id === risk.id ? null : risk)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getCategoryIcon(risk.category)}
                  <span className="text-sm font-medium text-gray-600">{risk.id}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(risk.severity)}`}>
                    {risk.severity}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(risk.status)}`}>
                    {risk.status}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{risk.title}</h4>
                <p className="text-gray-600 mb-3">{risk.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>Risk Score: <span className="font-semibold">{risk.riskScore}</span></span>
                  <span>Probability: <span className="font-semibold">{risk.probability}%</span></span>
                  <span>Impact: <span className="font-semibold">{risk.impact}%</span></span>
                  <span>Detected: <span className="font-semibold">{risk.timeline}</span></span>
                </div>
              </div>
              <Eye className="text-gray-400 ml-4" size={20} />
            </div>

            {/* Expanded Details */}
            {selectedRisk?.id === risk.id && (
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Shield className="text-blue-600 mr-2" size={16} />
                      Mitigation Strategy
                    </h5>
                    <p className="text-gray-600 text-sm bg-blue-50 p-3 rounded-lg">
                      {risk.mitigationStrategy}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Brain className="text-purple-600 mr-2" size={16} />
                      AI Recommendation
                    </h5>
                    <p className="text-gray-600 text-sm bg-purple-50 p-3 rounded-lg">
                      {risk.aiRecommendation}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>Detected by:</strong> {risk.detectedBy}</span>
                    <span><strong>Category:</strong> {risk.category}</span>
                    <span><strong>Timeline:</strong> {risk.timeline}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CheckCircle className="text-green-600 mr-2" size={20} />
          AI-Recommended Actions
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <p className="text-gray-600">
              <strong>Immediate:</strong> Address the critical data privacy compliance gap through automated governance framework implementation.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <p className="text-gray-600">
              <strong>Short-term:</strong> Complete knowledge transfer documentation using AI-powered extraction tools to reduce operational dependencies.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-gray-600">
              <strong>Long-term:</strong> Implement predictive risk monitoring system to proactively identify and mitigate emerging risks.
            </p>
          </div>
          {uploadStats.totalFiles > 0 && (
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-gray-600">
                <strong>Based on uploads:</strong> {uploadStats.totalRisks} additional risks identified from uploaded files require immediate attention and mitigation planning.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgenticAIRiskAnalysis;
