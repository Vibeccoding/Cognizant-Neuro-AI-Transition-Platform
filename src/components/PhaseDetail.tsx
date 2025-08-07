import React from 'react';
import { Phase } from '../types';
import { ArrowLeft, Brain, Calendar, Users, Target, TrendingUp } from 'lucide-react';
import AgenticChat from './AgenticChat';

interface PhaseDetailProps {
  phase: Phase;
  onBack: () => void;
}

const PhaseDetail: React.FC<PhaseDetailProps> = ({ phase, onBack }) => {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-4 font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{phase.name}</h1>
              <p className="text-gray-600 text-lg">{phase.description}</p>
            </div>
            <div className="text-right">
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(phase.status)}`}>
                {phase.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Progress Overview</h2>
            <div className="text-2xl font-bold text-primary-600">{phase.progress}%</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${getProgressColor(phase.progress)}`}
              style={{ width: `${phase.progress}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="text-gray-500" size={20} />
              <div>
                <div className="text-sm text-gray-500">Start Date</div>
                <div className="font-medium">{phase.startDate || 'Not set'}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="text-gray-500" size={20} />
              <div>
                <div className="text-sm text-gray-500">End Date</div>
                <div className="font-medium">{phase.endDate || 'Ongoing'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phase.keyMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">{metric.label}</h3>
                  {metric.change && (
                    <div className={`flex items-center text-sm ${
                      metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp size={14} className="mr-1" />
                      {metric.change}
                    </div>
                  )}
                </div>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Implementations */}
        <div className="card mb-8">
          <div className="flex items-center mb-6">
            <Brain className="text-primary-600 mr-3" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">AI Implementations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {phase.aiImplementations.map((implementation, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-primary-50 rounded-lg border border-primary-100">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium text-gray-900">{implementation}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Advanced AI technology enhancing efficiency and reducing manual effort in this area.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Section */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Phase Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="btn-primary text-left">
              <Users className="mb-2" size={20} />
              <div className="font-medium">View Team</div>
              <div className="text-sm opacity-90">Manage phase team members</div>
            </button>
            <button className="btn-secondary text-left">
              <TrendingUp className="mb-2" size={20} />
              <div className="font-medium">Analytics</div>
              <div className="text-sm opacity-70">Detailed performance metrics</div>
            </button>
            <button className="btn-secondary text-left">
              <Calendar className="mb-2" size={20} />
              <div className="font-medium">Schedule</div>
              <div className="text-sm opacity-70">Phase timeline and milestones</div>
            </button>
          </div>
        </div>
      </div>

      {/* Agentic Chat with Phase Context */}
      <AgenticChat phaseContext={phase.name} />
    </div>
  );
};

export default PhaseDetail;
