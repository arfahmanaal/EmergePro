import { Analytics } from '@/types';

export const analytics: Analytics = {
  totalUsers: 150,
  activeUsers: 120,
  completionRate: 68,
  averageScore: 84,
  moduleStats: [
    {
      moduleId: '1',
      moduleName: 'Workplace Safety Fundamentals',
      enrollments: 150,
      completions: 130,
      averageScore: 87,
    },
    {
      moduleId: '2',
      moduleName: 'Cybersecurity Essentials',
      enrollments: 145,
      completions: 115,
      averageScore: 82,
    },
    {
      moduleId: '3',
      moduleName: 'Leadership Skills',
      enrollments: 75,
      completions: 45,
      averageScore: 88,
    },
    {
      moduleId: '4',
      moduleName: 'Customer Service Excellence',
      enrollments: 90,
      completions: 60,
      averageScore: 79,
    },
  ],
};