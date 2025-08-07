import React, { useState } from 'react';
import { mockFramework } from '../data/mockData';
import { Phase } from '../types';
import PhaseCard from './PhaseCard';
import DetailedPhaseAnalysis from './DetailedPhaseAnalysis';
import Sidebar from './Sidebar';
import AgenticChat from './AgenticChat';
import UserProfile from './UserProfile';
import { Brain, TrendingUp, Clock, CheckCircle, AlertTriangle, Menu, X, Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState<string | null>(null);
  const framework = mockFramework;

  const completedPhases = framework.phases.filter(p => p.status === 'completed').length;
  const inProgressPhases = framework.phases.filter(p => p.status === 'in-progress').length;
  const totalPhases = framework.phases.length;

  const handlePhaseSelect = (phase: Phase) => {
    if (selectedPhase?.id === phase.id) return; // Don't reload if same phase
    
    setIsLoading(true);
    setLoadingPhase(phase.id);
    setShowMobileSidebar(false);
    
    // Simulate loading time for navigation
    setTimeout(() => {
      setSelectedPhase(phase);
      setIsLoading(false);
      setLoadingPhase(null);
    }, 800 + Math.random() * 400); // 800-1200ms random loading time
  };

  const handleDashboardSelect = () => {
    if (!selectedPhase) return; // Already on dashboard
    
    setIsLoading(true);
    setLoadingPhase('dashboard');
    setShowMobileSidebar(false);
    
    // Simulate loading time for navigation
    setTimeout(() => {
      setSelectedPhase(null);
      setIsLoading(false);
      setLoadingPhase(null);
    }, 600 + Math.random() * 300); // 600-900ms random loading time
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setShowMobileSidebar(false)} />
          <div className="relative flex flex-col w-full max-w-xs bg-white">
            <Sidebar
              phases={framework.phases}
              selectedPhase={selectedPhase}
              onPhaseSelect={handlePhaseSelect}
              onDashboardSelect={handleDashboardSelect}
              isCollapsed={false}
              isLoading={isLoading}
              loadingPhase={loadingPhase}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar
          phases={framework.phases}
          selectedPhase={selectedPhase}
          onPhaseSelect={handlePhaseSelect}
          onDashboardSelect={handleDashboardSelect}
          isCollapsed={sidebarCollapsed}
          isLoading={isLoading}
          loadingPhase={loadingPhase}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 z-10">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu size={24} />
              </button>
              
              {/* Desktop sidebar toggle */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
              </button>

              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                  <Brain className="text-primary-600 mr-3" size={28} />
                  {selectedPhase ? selectedPhase.name : 'Cognizant Neuro AI Transition Platform'}
                  {isLoading && <Loader2 className="ml-3 animate-spin text-primary-600" size={20} />}
                </h1>
                <p className="text-gray-600 text-sm lg:text-base mt-1">
                  {isLoading 
                    ? 'Loading AI insights and analytics...' 
                    : (selectedPhase ? selectedPhase.description : framework.description)
                  }
                </p>
              </div>
            </div>
            <div className="text-right flex items-center space-x-4">
              <div>
                <div className={`text-xl lg:text-2xl font-bold text-primary-600 ${isLoading ? 'animate-pulse' : ''}`}>
                  {selectedPhase ? `${selectedPhase.progress}%` : `${framework.overallProgress}%`}
                </div>
                <div className="text-xs lg:text-sm text-gray-500">
                  {isLoading 
                    ? 'Loading...'
                    : (selectedPhase ? 'Phase Progress' : 'Overall Progress')
                  }
                </div>
              </div>
              <UserProfile />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto relative">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="animate-spin text-primary-600 mx-auto mb-4" size={40} />
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {loadingPhase === 'dashboard' ? 'Loading Dashboard...' : `Loading ${framework.phases.find(p => p.id === loadingPhase)?.name || 'Phase'}...`}
                </div>
                <div className="text-sm text-gray-600">
                  Preparing Cognizant Neuro AI insights
                </div>
              </div>
            </div>
          )}
          
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            {selectedPhase ? (
              <DetailedPhaseAnalysis phase={selectedPhase} />
            ) : (
              <div className="space-y-8">
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="card text-center">
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="text-green-500" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{completedPhases}</div>
                    <div className="text-sm text-gray-600">Completed Phases</div>
                  </div>
                  
                  <div className="card text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="text-blue-500" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{inProgressPhases}</div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </div>
                  
                  <div className="card text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Brain className="text-primary-500" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {framework.phases.reduce((sum, phase) => sum + phase.aiImplementations.length, 0)}
                    </div>
                    <div className="text-sm text-gray-600">AI Implementations</div>
                  </div>
                  
                  <div className="card text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="text-green-500" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round(framework.phases.reduce((sum, phase) => sum + phase.progress, 0) / totalPhases)}%
                    </div>
                    <div className="text-sm text-gray-600">Average Progress</div>
                  </div>
                </div>

                {/* Progress Overview */}
                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Cognizant Neuro Platform Progress Overview</h2>
                  <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
                    <div
                      className="bg-primary-600 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                      style={{ width: `${framework.overallProgress}%` }}
                    >
                      <span className="text-white text-sm font-medium">{framework.overallProgress}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Started: {framework.startDate}</span>
                    <span>Estimated Completion: {framework.estimatedEndDate}</span>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Insights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="text-green-600 mr-2" size={20} />
                        <h3 className="font-semibold text-green-800">Completed Successfully</h3>
                      </div>
                      <p className="text-sm text-green-700">
                        Due Diligence phase completed with 94% compliance score and comprehensive risk assessment.
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Brain className="text-blue-600 mr-2" size={20} />
                        <h3 className="font-semibold text-blue-800">AI-Powered Efficiency</h3>
                      </div>
                      <p className="text-sm text-blue-700">
                        Knowledge Dashboard using Cognizant Neuro AI has processed 8,920 items with 92% accuracy, saving 40% processing time.
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="text-yellow-600 mr-2" size={20} />
                        <h3 className="font-semibold text-yellow-800">Upcoming Milestones</h3>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Shadow & Reverse Shadow phase starting May 2024. Preparation and team coordination in progress.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phases Grid */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Transition Phases</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {framework.phases.map((phase) => (
                      <PhaseCard
                        key={phase.id}
                        phase={phase}
                        onClick={() => handlePhaseSelect(phase)}
                      />
                    ))}
                  </div>
                </div>

                {/* AI Implementation Summary */}
                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Cognizant Neuro AI Implementation Summary</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-primary-900">Predictive Analytics & Monitoring</h3>
                        <p className="text-sm text-primary-700">Real-time performance monitoring and predictive resource allocation</p>
                      </div>
                      <div className="text-primary-600 font-bold">15 implementations</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-secondary-900">Natural Language Processing</h3>
                        <p className="text-sm text-secondary-700">Document analysis, knowledge extraction, and automated documentation</p>
                      </div>
                      <div className="text-secondary-600 font-bold">12 implementations</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-green-900">Automated Testing & Validation</h3>
                        <p className="text-sm text-green-700">Intelligent testing frameworks and automated quality assurance</p>
                      </div>
                      <div className="text-green-600 font-bold">8 implementations</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Agentic Chat */}
      {!selectedPhase && <AgenticChat />}
    </div>
  );
};

export default Dashboard;
