import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LogoutModal from './LogoutModal';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown, 
  UserCircle, 
  Shield,
  Activity,
  HelpCircle,
  Download,
  FileText
} from 'lucide-react';

const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    setIsOpen(false);
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
    setIsOpen(false);
  };

  const downloadMitigationPlan = () => {
    // Create mitigation plan data
    const mitigationPlanData = {
      title: 'Knowledge Acquisition Mitigation Plan',
      generatedDate: new Date().toISOString(),
      phase: 'Knowledge Acquisition',
      generatedBy: user?.name || 'Unknown User',
      mitigations: [
        {
          id: 'KA-MIT-001',
          riskTitle: 'Knowledge Transfer Bottlenecks',
          priority: 'High',
          strategy: 'Implement AI-powered knowledge extraction and automated documentation',
          timeline: '4-6 weeks',
          owner: 'Knowledge Management Team',
          estimatedCost: '$75,000'
        },
        {
          id: 'KA-MIT-002', 
          riskTitle: 'Documentation Quality Gaps',
          priority: 'Medium',
          strategy: 'Deploy intelligent document review and validation systems',
          timeline: '3-4 weeks',
          owner: 'Technical Documentation Team',
          estimatedCost: '$45,000'
        },
        {
          id: 'KA-MIT-003',
          riskTitle: 'Expert Knowledge Dependencies',
          priority: 'Critical',
          strategy: 'Accelerated knowledge capture with AI-assisted interviews',
          timeline: '2-3 weeks',
          owner: 'Subject Matter Expert Team',
          estimatedCost: '$60,000'
        }
      ],
      recommendations: [
        'Prioritize critical knowledge areas first',
        'Implement parallel documentation streams',
        'Establish continuous validation processes',
        'Deploy AI-powered knowledge extraction tools'
      ],
      totalEstimatedCost: '$180,000',
      estimatedTimeToComplete: '6 weeks'
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
    
    // Close the dropdown
    setIsOpen(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'manager': return 'bg-blue-100 text-blue-700';
      case 'analyst': return 'bg-green-100 text-green-700';
      case 'viewer': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield size={14} />;
      case 'manager': return <User size={14} />;
      case 'analyst': return <Activity size={14} />;
      case 'viewer': return <UserCircle size={14} />;
      default: return <User size={14} />;
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="text-primary-600" size={16} />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
        <ChevronDown
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          size={16}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* User Info Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="text-primary-600" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                {user.department && (
                  <p className="text-xs text-gray-400 truncate">{user.department}</p>
                )}
                <div className="mt-2">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                    {getRoleIcon(user.role)}
                    <span className="capitalize">{user.role}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <UserCircle size={16} />
              <span>View Profile</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Settings size={16} />
              <span>Account Settings</span>
            </button>

            <button 
              onClick={downloadMitigationPlan}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FileText size={16} />
              <span>Mitigation Plan</span>
              <Download size={14} className="ml-auto text-gray-400" />
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Activity size={16} />
              <span>Activity Log</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <HelpCircle size={16} />
              <span>Help & Support</span>
            </button>
          </div>

          {/* Login Info */}
          {user.lastLogin && (
            <div className="px-4 py-2 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Last login: {user.lastLogin.toLocaleDateString()} at {user.lastLogin.toLocaleTimeString()}
              </p>
            </div>
          )}

          {/* Logout */}
          <div className="border-t border-gray-100">
            <button
              onClick={openLogoutModal}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        userName={user?.name}
      />
    </div>
  );
};

export default UserProfile;
