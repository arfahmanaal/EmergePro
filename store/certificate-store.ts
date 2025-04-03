import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Certificate } from '@/types';
import { certificates as mockCertificates } from '@/mocks/certificates';

interface CertificateState {
  certificates: Certificate[];
  isLoading: boolean;
  error: string | null;
  fetchUserCertificates: (userId: string) => Promise<void>;
  generateCertificate: (userId: string, moduleId: string, moduleName: string, score: number) => Promise<Certificate>;
}

export const useCertificateStore = create<CertificateState>()(
  persist(
    (set, get) => ({
      certificates: [],
      isLoading: false,
      error: null,
      fetchUserCertificates: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));
          
          // Filter certificates for the specific user
          const userCertificates = mockCertificates.filter((c) => c.userId === userId);
          
          set({ certificates: userCertificates, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch certificates', isLoading: false });
        }
      },
      generateCertificate: async (userId, moduleId, moduleName, score) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 800));
          
          const { certificates } = get();
          
          // Check if certificate already exists
          const existingCertIndex = certificates.findIndex(
            (c) => c.userId === userId && c.moduleId === moduleId
          );
          
          // Create certificate data
          const issueDate = new Date().toISOString().split('T')[0];
          const expiryDate = new Date();
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);
          
          const newCertificate: Certificate = {
            id: existingCertIndex >= 0 ? certificates[existingCertIndex].id : `cert-${Date.now()}`,
            userId,
            moduleId,
            moduleName,
            issueDate,
            expiryDate: expiryDate.toISOString().split('T')[0],
            score,
          };
          
          let updatedCertificates = [...certificates];
          
          if (existingCertIndex >= 0) {
            // Update existing certificate
            updatedCertificates[existingCertIndex] = newCertificate;
          } else {
            // Add new certificate
            updatedCertificates.push(newCertificate);
          }
          
          set({ certificates: updatedCertificates, isLoading: false });
          return newCertificate;
        } catch (error) {
          set({ error: 'Failed to generate certificate', isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'certificate-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);