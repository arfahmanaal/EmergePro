import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Progress, Module, ModuleSection } from '@/types';
import { progress as mockProgress } from '@/mocks/progress';

interface ProgressState {
  progress: Progress[];
  isLoading: boolean;
  error: string | null;
  fetchUserProgress: (userId: string) => Promise<void>;
  markSectionCompleted: (userId: string, moduleId: string, sectionId: string) => Promise<void>;
  saveQuizResult: (userId: string, moduleId: string, quizId: string, score: number, passed: boolean) => Promise<void>;
  getModuleProgress: (userId: string, moduleId: string) => Progress | undefined;
  getCompletionPercentage: (userId: string, moduleId: string, sections: ModuleSection[]) => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: [],
      isLoading: false,
      error: null,
      fetchUserProgress: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));
          
          // Filter progress for the specific user
          const userProgress = mockProgress.filter((p) => p.userId === userId);
          
          set({ progress: userProgress, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch progress', isLoading: false });
        }
      },
      markSectionCompleted: async (userId, moduleId, sectionId) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 300));
          
          const { progress } = get();
          
          // Find existing progress for this module
          const moduleProgressIndex = progress.findIndex(
            (p) => p.userId === userId && p.moduleId === moduleId
          );
          
          if (moduleProgressIndex >= 0) {
            // Update existing progress
            const updatedProgress = [...progress];
            const moduleProgress = { ...updatedProgress[moduleProgressIndex] };
            
            if (!moduleProgress.completedSections.includes(sectionId)) {
              moduleProgress.completedSections = [...moduleProgress.completedSections, sectionId];
            }
            
            moduleProgress.lastAccessed = new Date().toISOString();
            updatedProgress[moduleProgressIndex] = moduleProgress;
            
            set({ progress: updatedProgress, isLoading: false });
          } else {
            // Create new progress entry
            const newProgress: Progress = {
              userId,
              moduleId,
              completed: false,
              completedSections: [sectionId],
              lastAccessed: new Date().toISOString(),
              quizResults: [],
            };
            
            set({ progress: [...progress, newProgress], isLoading: false });
          }
        } catch (error) {
          set({ error: 'Failed to update progress', isLoading: false });
        }
      },
      saveQuizResult: async (userId, moduleId, quizId, score, passed) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 300));
          
          const { progress } = get();
          
          // Find existing progress for this module
          const moduleProgressIndex = progress.findIndex(
            (p) => p.userId === userId && p.moduleId === moduleId
          );
          
          if (moduleProgressIndex >= 0) {
            // Update existing progress
            const updatedProgress = [...progress];
            const moduleProgress = { ...updatedProgress[moduleProgressIndex] };
            
            const quizResult = {
              quizId,
              score,
              passed,
              completedAt: new Date().toISOString(),
            };
            
            if (!moduleProgress.quizResults) {
              moduleProgress.quizResults = [quizResult];
            } else {
              const existingQuizIndex = moduleProgress.quizResults.findIndex(
                (q) => q.quizId === quizId
              );
              
              if (existingQuizIndex >= 0) {
                moduleProgress.quizResults[existingQuizIndex] = quizResult;
              } else {
                moduleProgress.quizResults.push(quizResult);
              }
            }
            
            moduleProgress.lastAccessed = new Date().toISOString();
            updatedProgress[moduleProgressIndex] = moduleProgress;
            
            set({ progress: updatedProgress, isLoading: false });
          } else {
            // Create new progress entry with quiz result
            const newProgress: Progress = {
              userId,
              moduleId,
              completed: false,
              completedSections: [],
              lastAccessed: new Date().toISOString(),
              quizResults: [
                {
                  quizId,
                  score,
                  passed,
                  completedAt: new Date().toISOString(),
                },
              ],
            };
            
            set({ progress: [...progress, newProgress], isLoading: false });
          }
        } catch (error) {
          set({ error: 'Failed to save quiz result', isLoading: false });
        }
      },
      getModuleProgress: (userId, moduleId) => {
        const { progress } = get();
        return progress.find((p) => p.userId === userId && p.moduleId === moduleId);
      },
      getCompletionPercentage: (userId, moduleId, sections) => {
        const { progress } = get();
        const moduleProgress = progress.find((p) => p.userId === userId && p.moduleId === moduleId);
        
        if (!moduleProgress || sections.length === 0) {
          return 0;
        }
        
        const completedCount = moduleProgress.completedSections.length;
        return Math.round((completedCount / sections.length) * 100);
      },
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);