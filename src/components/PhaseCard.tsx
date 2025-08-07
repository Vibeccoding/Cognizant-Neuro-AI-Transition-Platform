import React from 'react';
import { Phase } from '../types';
import { CheckCircle, Clock, AlertCircle, Play, Brain, TrendingUp } from 'lucide-react';

interface PhaseCardProps {
  phase: Phase;
  onClick: () => void;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, onClick }) => {
  const getStatusIcon = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'in-progress':
        return <Clock className="text-blue-500" size={20} />;
      case 'on-hold':
        return <AlertCircle className="text-yellow-500" size={20} />;
      default:
        return <Play className="text-gray-400" size={20} />;
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

  return (
    <div
      onClick={onClick}
      className="card hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-primary-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon(phase.status)}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
              {phase.name}
            </h3>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(phase.status)}`}>
              {phase.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        </div>
        <Brain className="text-primary-500" size={24} />
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{phase.description}</p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-semibold text-gray-900">{phase.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(phase.progress)}`}
            style={{ width: `${phase.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {phase.keyMetrics.slice(0, 3).map((metric, index) => (
          <div key={index} className="text-center">
            <div className="text-sm font-semibold text-gray-900">{metric.value}</div>
            <div className="text-xs text-gray-500">{metric.label}</div>
            {metric.change && (
              <div className={`text-xs flex items-center justify-center ${
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp size={10} className="mr-1" />
                {metric.change}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Implementations Count */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">AI Implementations:</span>
        <span className="font-semibold text-primary-600">{phase.aiImplementations.length}</span>
      </div>

      {/* Dates */}
      {phase.startDate && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            {phase.startDate} - {phase.endDate || 'Ongoing'}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhaseCard;
