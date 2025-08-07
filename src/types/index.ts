export interface Phase {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  startDate?: string;
  endDate?: string;
  aiImplementations: string[];
  keyMetrics: {
    label: string;
    value: string | number;
    change?: string;
  }[];
  isMainPhase?: boolean; // Distinguish between main transition phases and sub-modules
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  phaseContext?: string;
}

export interface TransitionFramework {
  id: string;
  name: string;
  description: string;
  phases: Phase[];
  overallProgress: number;
  startDate: string;
  estimatedEndDate: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'analyst' | 'viewer';
  avatar?: string;
  department?: string;
  lastLogin?: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
