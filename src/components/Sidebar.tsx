import React from 'react';
import { Phase } from '../types';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Play, 
  ChevronRight,
  Brain,
  BarChart3,
  FileText,
  Database,
  Shield,
  Settings,
  Users,
  MessageSquare,
  Globe,
  HardDrive,
  Loader2
} from 'lucide-react';

interface SidebarProps {
  phases: Phase[];
  selectedPhase: Phase | null;
  onPhaseSelect: (phase: Phase) => void;
  onDashboardSelect: () => void;
  isCollapsed: boolean;
  isLoading?: boolean;
  loadingPhase?: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  phases, 
  selectedPhase, 
  onPhaseSelect, 
  onDashboardSelect, 
  isCollapsed,
  isLoading = false,
  loadingPhase = null
}) => {
  const getStatusIcon = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'in-progress':
        return <Clock className="text-blue-500" size={16} />;
      case 'on-hold':
        return <AlertCircle className="text-yellow-500" size={16} />;
      default:
        return <Play className="text-gray-400" size={16} />;
    }
  };

  const getPhaseIcon = (phaseId: string) => {
    switch (phaseId) {
      case 'dashboard':
        return <BarChart3 size={16} />;
      case 'due-diligence':
        return <Shield size={16} />;
      case 'knowledge-acquisition':
        return <Brain size={16} />;
      case 'shadow-reverse':
        return <Users size={16} />;
      case 'stabilization':
        return <Settings size={16} />;
      case 'steady-support':
        return <MessageSquare size={16} />;
      case 'reports':
        return <FileText size={16} />;
      case 'client-survey':
        return <MessageSquare size={16} />;
      case 'api-endpoints':
        return <Globe size={16} />;
      case 'data-cleanup':
        return <HardDrive size={16} />;
      default:
        return <Database size={16} />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-80'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Brain className="text-primary-600 flex-shrink-0" size={24} />
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-gray-900 text-sm">Cognizant Neuro AI Transition Platform</h2>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        {/* Dashboard Overview */}
        <button
          onClick={onDashboardSelect}
          disabled={isLoading}
          className={`w-full flex items-center p-3 rounded-lg transition-colors mb-2 ${
            !selectedPhase 
              ? 'bg-primary-100 text-primary-700 border border-primary-200' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          } ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <BarChart3 className="flex-shrink-0" size={16} />
          {!isCollapsed && (
            <>
              <span className="ml-3 font-medium">Dashboard Overview</span>
              {loadingPhase === 'dashboard' ? (
                <Loader2 className="ml-auto animate-spin" size={14} />
              ) : (
                <ChevronRight className="ml-auto" size={14} />
              )}
            </>
          )}
        </button>

        {/* Phase Navigation */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Transition Phases
              </h3>
            </div>
          )}
          
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => onPhaseSelect(phase)}
              disabled={isLoading}
              className={`w-full flex items-center p-3 rounded-lg transition-colors group ${
                selectedPhase?.id === phase.id
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              } ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center space-x-2 flex-shrink-0">
                {getPhaseIcon(phase.id)}
                {getStatusIcon(phase.status)}
              </div>
              
              {!isCollapsed && (
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm truncate">{phase.name}</span>
                    <span className="text-xs font-semibold">{phase.progress}%</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(phase.progress)}`}
                      style={{ width: `${phase.progress}%` }}
                    ></div>
                  </div>
                  
                  {/* Status and AI count */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500 capitalize">
                      {phase.status.replace('-', ' ')}
                    </span>
                    <span className="text-xs text-primary-600 font-medium">
                      {phase.aiImplementations.length} AI
                    </span>
                  </div>
                </div>
              )}
              
              {!isCollapsed && (
                <>
                  {loadingPhase === phase.id ? (
                    <Loader2 className="ml-2 flex-shrink-0 animate-spin" size={14} />
                  ) : (
                    <ChevronRight 
                      className={`ml-2 flex-shrink-0 transition-transform ${
                        selectedPhase?.id === phase.id ? 'rotate-90' : ''
                      }`} 
                      size={14} 
                    />
                  )}
                </>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Summary Stats */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Phases</span>
              <span className="font-semibold text-gray-900">{phases.filter(phase => phase.isMainPhase).length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Completed</span>
              <span className="font-semibold text-green-600">
                {phases.filter(p => p.isMainPhase && p.status === 'completed').length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">In Progress</span>
              <span className="font-semibold text-blue-600">
                {phases.filter(p => p.isMainPhase && p.status === 'in-progress').length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">AI Implementations</span>
              <span className="font-semibold text-primary-600">
                {phases.filter(phase => phase.isMainPhase).reduce((sum, phase) => sum + phase.aiImplementations.length, 0)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
