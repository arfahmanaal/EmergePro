import { Progress } from '@/types';

export const progress: Progress[] = [
  {
    userId: '1',
    moduleId: '1',
    completed: true,
    completedSections: ['1-1', '1-2', '1-3', '1-4'],
    lastAccessed: '2023-06-15T14:30:00Z',
    quizResults: [
      {
        quizId: 'quiz-1',
        score: 85,
        passed: true,
        completedAt: '2023-06-15T14:25:00Z',
      },
    ],
  },
  {
    userId: '1',
    moduleId: '2',
    completed: true,
    completedSections: ['2-1', '2-2', '2-3', '2-4', '2-5'],
    lastAccessed: '2023-07-22T10:15:00Z',
    quizResults: [
      {
        quizId: 'quiz-2',
        score: 92,
        passed: true,
        completedAt: '2023-07-22T10:10:00Z',
      },
    ],
  },
  {
    userId: '1',
    moduleId: '3',
    completed: false,
    completedSections: ['3-1', '3-2'],
    lastAccessed: '2023-08-05T16:45:00Z',
    quizResults: [],
  },
  {
    userId: '1',
    moduleId: '4',
    completed: false,
    completedSections: [],
    lastAccessed: '2023-08-10T09:20:00Z',
    quizResults: [],
  },
];