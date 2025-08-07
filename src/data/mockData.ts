import { Phase, TransitionFramework } from '../types';

export const mockPhases: Phase[] = [
  {
    id: 'dashboard',
    name: 'AI Transition Dashboard',
    description: 'AI-powered dashboard for real-time monitoring and visualization of transition metrics',
    status: 'in-progress',
    progress: 75,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    aiImplementations: [
      'Predictive analytics for resource allocation',
      'Automated alert systems',
      'Real-time performance monitoring',
      'Intelligent data visualization'
    ],
    keyMetrics: [
      { label: 'System Uptime', value: '99.8%', change: '+0.2%' },
      { label: 'Data Processing Speed', value: '2.3s', change: '-15%' },
      { label: 'User Satisfaction', value: '4.7/5', change: '+0.3' }
    ]
  },
  {
    id: 'due-diligence',
    name: 'Due Diligence',
    description: 'AI-assisted comprehensive risk assessment and mitigation planning for current systems and processes',
    status: 'completed',
    progress: 100,
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    aiImplementations: [
      'Automated document analysis',
      'Risk assessment algorithms',
      'Compliance checking systems',
      'Gap analysis automation'
    ],
    keyMetrics: [
      { label: 'Documents Analyzed', value: '12,450', change: '+25%' },
      { label: 'Risks Identified', value: '47', change: '-12%' },
      { label: 'Compliance Score', value: '94%', change: '+8%' }
    ]
  },
  {
    id: 'knowledge-acquisition',
    name: 'Knowledge Dashboard',
    description: 'AI-driven knowledge extraction and documentation from incumbent systems',
    status: 'in-progress',
    progress: 60,
    startDate: '2024-03-01',
    endDate: '2024-04-30',
    aiImplementations: [
      'Natural language processing for documentation',
      'Knowledge graph generation',
      'Expert system creation',
      'Automated training material generation'
    ],
    keyMetrics: [
      { label: 'Knowledge Items', value: '8,920', change: '+120%' },
      { label: 'Accuracy Rate', value: '92%', change: '+5%' },
      { label: 'Processing Time', value: '1.2h', change: '-40%' }
    ]
  },
  {
    id: 'shadow-reverse',
    name: 'Shadow & Reverse Shadow',
    description: 'AI-enhanced parallel operations and knowledge transfer phases',
    status: 'not-started',
    progress: 0,
    startDate: '2024-05-01',
    endDate: '2024-07-15',
    aiImplementations: [
      'Performance comparison algorithms',
      'Automated testing frameworks',
      'Real-time monitoring systems',
      'Intelligent error detection'
    ],
    keyMetrics: [
      { label: 'Test Coverage', value: '0%', change: '' },
      { label: 'Performance Gap', value: 'TBD', change: '' },
      { label: 'Error Rate', value: 'TBD', change: '' }
    ]
  },
  {
    id: 'stabilization',
    name: 'Stabilization',
    description: 'AI-powered system stabilization and optimization phase',
    status: 'not-started',
    progress: 0,
    startDate: '2024-07-16',
    endDate: '2024-09-30',
    aiImplementations: [
      'Self-healing systems',
      'Performance optimization algorithms',
      'Automated incident response',
      'Predictive maintenance'
    ],
    keyMetrics: [
      { label: 'System Stability', value: 'TBD', change: '' },
      { label: 'Performance Score', value: 'TBD', change: '' },
      { label: 'Incidents', value: 'TBD', change: '' }
    ]
  },
  {
    id: 'steady-support',
    name: 'Steady Support',
    description: 'AI-driven ongoing support and maintenance operations',
    status: 'not-started',
    progress: 0,
    startDate: '2024-10-01',
    endDate: '2025-03-31',
    aiImplementations: [
      'Intelligent ticketing systems',
      'Automated resolution engines',
      'Predictive support analytics',
      'Chatbot assistance'
    ],
    keyMetrics: [
      { label: 'Resolution Time', value: 'TBD', change: '' },
      { label: 'First Call Resolution', value: 'TBD', change: '' },
      { label: 'User Satisfaction', value: 'TBD', change: '' }
    ]
  },
  {
    id: 'reports',
    name: 'Reports & Analytics',
    description: 'AI-generated comprehensive reporting and analytics dashboard',
    status: 'in-progress',
    progress: 45,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    aiImplementations: [
      'Automated report generation',
      'Predictive analytics dashboards',
      'Natural language insights',
      'Custom visualization engines'
    ],
    keyMetrics: [
      { label: 'Reports Generated', value: '2,340', change: '+85%' },
      { label: 'Data Accuracy', value: '96%', change: '+4%' },
      { label: 'Time Saved', value: '240h', change: '+65%' }
    ]
  },
  {
    id: 'client-survey',
    name: 'Client Survey & Feedback',
    description: 'AI-powered client feedback collection and sentiment analysis',
    status: 'in-progress',
    progress: 80,
    startDate: '2024-02-15',
    endDate: '2024-11-30',
    aiImplementations: [
      'Sentiment analysis algorithms',
      'Automated survey generation',
      'Feedback categorization systems',
      'Predictive satisfaction models'
    ],
    keyMetrics: [
      { label: 'Response Rate', value: '78%', change: '+12%' },
      { label: 'Satisfaction Score', value: '4.6/5', change: '+0.4' },
      { label: 'Feedback Items', value: '1,890', change: '+45%' }
    ]
  },
  {
    id: 'api-endpoints',
    name: 'API Endpoints',
    description: 'AI-optimized API management and integration framework',
    status: 'in-progress',
    progress: 90,
    startDate: '2024-01-20',
    endDate: '2024-06-30',
    aiImplementations: [
      'Intelligent API routing',
      'Automated testing suites',
      'Performance optimization',
      'Security threat detection'
    ],
    keyMetrics: [
      { label: 'API Uptime', value: '99.95%', change: '+0.05%' },
      { label: 'Response Time', value: '120ms', change: '-25%' },
      { label: 'Security Score', value: '98%', change: '+6%' }
    ]
  },
  {
    id: 'data-cleanup',
    name: 'Data Cleanup & Migration',
    description: 'AI-driven data quality improvement and migration processes',
    status: 'in-progress',
    progress: 55,
    startDate: '2024-03-15',
    endDate: '2024-08-15',
    aiImplementations: [
      'Data quality assessment algorithms',
      'Automated data cleansing',
      'Intelligent data mapping',
      'Migration validation systems'
    ],
    keyMetrics: [
      { label: 'Data Quality Score', value: '87%', change: '+18%' },
      { label: 'Records Processed', value: '2.4M', change: '+200%' },
      { label: 'Migration Success', value: '94%', change: '+9%' }
    ]
  }
];

export const mockFramework: TransitionFramework = {
  id: 'cognizant-neuro-ai-transition-2024',
  name: 'Cognizant Neuro AI Transition Platform 2024',
  description: 'Comprehensive AI-driven transition from incumbent vendor to new systems powered by Cognizant Neuro',
  phases: mockPhases,
  overallProgress: 65,
  startDate: '2024-01-01',
  estimatedEndDate: '2025-03-31'
};
