import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from './LoginPage';
import { Loader2, Brain } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Brain className="text-primary-600 mr-3" size={40} />
            <Loader2 className="animate-spin text-primary-600" size={32} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Cognizant Neuro AI Transition Platform</h2>
          <p className="text-gray-600">Loading your transition platform...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
