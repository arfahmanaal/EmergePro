import { create } from 'zustand';
import { Analytics } from '@/types';
import { analytics as mockAnalytics } from '@/mocks/analytics';

interface AnalyticsState {
  analytics: Analytics | null;
  isLoading: boolean;
  error: string | null;
  fetchAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>()((set) => ({
  analytics: null,
  isLoading: false,
  error: null,
  fetchAnalytics: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      set({ analytics: mockAnalytics, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch analytics', isLoading: false });
    }
  },
}));