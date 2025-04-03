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
  {
    id: 'quiz-5',
    moduleId: '5',
    title: 'Fire Safety Assessment',
    description: 'Test your knowledge of fire safety and emergency evacuation procedures.',
    passingScore: 80,
    questions: [
      {
        id: 'q5-1',
        text: 'What does the acronym PASS stand for when using a fire extinguisher?',
        options: [
          { id: 'q5-1-a', text: 'Pull, Aim, Spray, Sweep', isCorrect: false },
          { id: 'q5-1-b', text: 'Pull, Aim, Squeeze, Sweep', isCorrect: true },
          { id: 'q5-1-c', text: 'Point, Activate, Spray, Secure', isCorrect: false },
          { id: 'q5-1-d', text: 'Prepare, Aim, Shoot, Secure', isCorrect: false },
        ],
        explanation: 'PASS stands for Pull the pin, Aim at the base of the fire, Squeeze the handle, and Sweep from side to side.',
      },
      {
        id: 'q5-2',
        text: 'Which type of fire extinguisher should NOT be used on electrical fires?',
        options: [
          { id: 'q5-2-a', text: 'CO2 extinguishers', isCorrect: false },
          { id: 'q5-2-b', text: 'Dry chemical extinguishers', isCorrect: false },
          { id: 'q5-2-c', text: 'Water extinguishers', isCorrect: true },
          { id: 'q5-2-d', text: 'Class C extinguishers', isCorrect: false },
        ],
        explanation: 'Water conducts electricity and can cause electrocution if used on electrical fires. Always use CO2 or dry chemical extinguishers for electrical fires.',
      },
      {
        id: 'q5-3',
        text: 'What should you do if your primary evacuation route is blocked by fire or smoke?',
        options: [
          { id: 'q5-3-a', text: 'Try to run through the smoke quickly', isCorrect: false },
          { id: 'q5-3-b', text: 'Wait in your current location until help arrives', isCorrect: false },
          { id: 'q5-3-c', text: 'Use an alternative evacuation route', isCorrect: true },
          { id: 'q5-3-d', text: 'Use the elevator to evacuate', isCorrect: false },
        ],
        explanation: 'Always have multiple evacuation routes planned. If your primary route is blocked, immediately use an alternative route to safely exit the building.',
      },
      {
        id: 'q5-4',
        text: 'What is the correct action if your clothes catch fire?',
        options: [
          { id: 'q5-4-a', text: 'Run to find water', isCorrect: false },
          { id: 'q5-4-b', text: 'Stop, drop, and roll', isCorrect: true },
          { id: 'q5-4-c', text: 'Remove the burning clothing immediately', isCorrect: false },
          { id: 'q5-4-d', text: 'Fan the flames to extinguish them', isCorrect: false },
        ],
        explanation: 'Stop, drop, and roll is the correct procedure if your clothes catch fire. This helps smother the flames and prevent them from spreading upward toward your face.',
      },
      {
        id: 'q5-5',
        text: 'During a fire evacuation, when is it appropriate to use elevators?',
        options: [
          { id: 'q5-5-a', text: 'When you are on a high floor', isCorrect: false },
          { id: 'q5-5-b', text: 'When the fire alarm is sounding', isCorrect: false },
          { id: 'q5-5-c', text: 'When assisting someone with mobility issues', isCorrect: false },
          { id: 'q5-5-d', text: 'Never during a fire evacuation', isCorrect: true },
        ],
        explanation: 'Elevators should never be used during a fire evacuation as they may malfunction, trap occupants, or open on the fire floor. Always use stairs.',
      },
    ],
  },
];