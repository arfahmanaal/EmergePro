import { Quiz } from '@/types';

export const quizzes: Quiz[] = [
  {
    id: 'quiz-1',
    moduleId: '1',
    title: 'Workplace Safety Assessment',
    description: 'Test your knowledge of workplace safety fundamentals.',
    passingScore: 70,
    questions: [
      {
        id: 'q1-1',
        text: 'What should you do first in case of a fire emergency?',
        options: [
          { id: 'q1-1-a', text: 'Call the fire department', isCorrect: false },
          { id: 'q1-1-b', text: 'Alert others in the area', isCorrect: true },
          { id: 'q1-1-c', text: 'Attempt to extinguish the fire', isCorrect: false },
          { id: 'q1-1-d', text: 'Evacuate the building immediately', isCorrect: false },
        ],
        explanation: 'Always alert others in the area first to ensure everyone is aware of the emergency.',
      },
      {
        id: 'q1-2',
        text: 'Which of the following is NOT a common workplace hazard?',
        options: [
          { id: 'q1-2-a', text: 'Exposed electrical wiring', isCorrect: false },
          { id: 'q1-2-b', text: 'Properly stored chemicals', isCorrect: true },
          { id: 'q1-2-c', text: 'Wet floors without warning signs', isCorrect: false },
          { id: 'q1-2-d', text: 'Blocked emergency exits', isCorrect: false },
        ],
        explanation: 'Properly stored chemicals follow safety protocols and are not considered hazards.',
      },
      {
        id: 'q1-3',
        text: 'How often should workplace safety training be conducted?',
        options: [
          { id: 'q1-3-a', text: 'Once when hired', isCorrect: false },
          { id: 'q1-3-b', text: 'Every 5 years', isCorrect: false },
          { id: 'q1-3-c', text: 'Annually', isCorrect: true },
          { id: 'q1-3-d', text: 'Only after an incident occurs', isCorrect: false },
        ],
        explanation: 'Annual safety training is recommended to keep employees updated on protocols.',
      },
    ],
  },
  {
    id: 'quiz-2',
    moduleId: '2',
    title: 'Cybersecurity Assessment',
    description: 'Test your knowledge of cybersecurity essentials.',
    passingScore: 80,
    questions: [
      {
        id: 'q2-1',
        text: 'Which of the following is a strong password?',
        options: [
          { id: 'q2-1-a', text: 'password123', isCorrect: false },
          { id: 'q2-1-b', text: 'P@ssw0rd!2023', isCorrect: true },
          { id: 'q2-1-c', text: 'qwerty', isCorrect: false },
          { id: 'q2-1-d', text: 'your name and birthdate', isCorrect: false },
        ],
        explanation: 'Strong passwords contain a mix of uppercase, lowercase, numbers, and special characters.',
      },
      {
        id: 'q2-2',
        text: 'What is phishing?',
        options: [
          { id: 'q2-2-a', text: 'A type of computer virus', isCorrect: false },
          { id: 'q2-2-b', text: 'A method to recover deleted files', isCorrect: false },
          { id: 'q2-2-c', text: 'An attempt to obtain sensitive information by disguising as a trustworthy entity', isCorrect: true },
          { id: 'q2-2-d', text: 'A technique to speed up internet connection', isCorrect: false },
        ],
        explanation: 'Phishing is a cybercrime where targets are contacted by email, phone, or text by someone posing as a legitimate institution to lure individuals into providing sensitive data.',
      },
      {
        id: 'q2-3',
        text: 'What should you do if you suspect a security breach?',
        options: [
          { id: 'q2-3-a', text: 'Ignore it and continue working', isCorrect: false },
          { id: 'q2-3-b', text: 'Try to fix it yourself', isCorrect: false },
          { id: 'q2-3-c', text: 'Disconnect from the network and report it immediately', isCorrect: true },
          { id: 'q2-3-d', text: 'Wait and see if it happens again', isCorrect: false },
        ],
        explanation: 'Immediate action is crucial. Disconnect from the network to prevent further damage and report the incident to your IT department.',
      },
    ],
  },
];