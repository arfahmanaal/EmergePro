export interface User {
    id: string;
    name: string;
    email: string;
    role: 'trainee' | 'manager' | 'admin';
    department: string;
    avatar?: string;
  }
  
  export interface Module {
    id: string;
    title: string;
    description: string;
    duration: number; // in minutes
    category: string;
    thumbnail: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    required: boolean;
    sections: ModuleSection[];
  }
  
  export interface ModuleSection {
    id: string;
    title: string;
    type: 'video' | 'quiz' | 'simulation' | 'reading';
    content: string;
    duration: number; // in minutes
    completed?: boolean;
  }
  
  export interface Quiz {
    id: string;
    moduleId: string;
    title: string;
    description: string;
    questions: Question[];
    passingScore: number;
  }
  
  export interface Question {
    id: string;
    text: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
    explanation?: string;
  }
  
  export interface Certificate {
    id: string;
    userId: string;
    moduleId: string;
    moduleName: string;
    issueDate: string;
    expiryDate?: string;
    score: number;
  }
  
  export interface Progress {
    userId: string;
    moduleId: string;
    completed: boolean;
    completedSections: string[];
    lastAccessed: string;
    quizResults?: {
      quizId: string;
      score: number;
      passed: boolean;
      completedAt: string;
    }[];
  }
  
  export interface Analytics {
    totalUsers: number;
    activeUsers: number;
    completionRate: number;
    averageScore: number;
    moduleStats: {
      moduleId: string;
      moduleName: string;
      enrollments: number;
      completions: number;
      averageScore: number;
    }[];
  }