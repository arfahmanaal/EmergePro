import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';
import { users } from '@/mocks/users';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // Find user with matching email (in a real app, you'd verify password too)
          const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
          
          if (user) {
            // In a real app, you would verify the password here
            // For demo purposes, we'll accept any password for the mock users
            set({ user, isAuthenticated: true, isLoading: false, error: null });
          } else {
            set({ error: 'Invalid email or password', isLoading: false });
          }
        } catch (error) {
          set({ error: 'An error occurred during login', isLoading: false });
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);