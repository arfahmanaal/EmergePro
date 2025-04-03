import { Module } from '@/types';

export const modules: Module[] = [
  {
    id: '1',
    title: 'Workplace Safety Fundamentals',
    description: 'Learn the essential safety protocols and procedures for maintaining a safe workplace environment.',
    duration: 60,
    category: 'Safety',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1677529102407-0d075eb2cbb9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    difficulty: 'beginner',
    required: true,
    sections: [
      {
        id: '1-1',
        title: 'Introduction to Workplace Safety',
        type: 'video',
        content: 'https://example.com/videos/workplace-safety-intro',
        duration: 15,
      },
      {
        id: '1-2',
        title: 'Identifying Hazards',
        type: 'reading',
        content: 'Learn how to identify common workplace hazards and risks.',
        duration: 20,
      },
      {
        id: '1-3',
        title: 'Emergency Procedures',
        type: 'simulation',
        content: 'Interactive simulation of emergency evacuation procedures.',
        duration: 15,
      },
      {
        id: '1-4',
        title: 'Safety Assessment',
        type: 'quiz',
        content: 'quiz-1',
        duration: 10,
      },
    ],
  },
  {
    id: '2',
    title: 'Cybersecurity Essentials',
    description: 'Understand the fundamentals of cybersecurity and learn how to protect sensitive information.',
    duration: 90,
    category: 'IT',
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    difficulty: 'intermediate',
    required: true,
    sections: [
      {
        id: '2-1',
        title: 'Cybersecurity Basics',
        type: 'video',
        content: 'https://example.com/videos/cybersecurity-basics',
        duration: 20,
      },
      {
        id: '2-2',
        title: 'Password Management',
        type: 'reading',
        content: 'Best practices for creating and managing secure passwords.',
        duration: 15,
      },
      {
        id: '2-3',
        title: 'Phishing Simulation',
        type: 'simulation',
        content: 'Interactive simulation to identify phishing attempts.',
        duration: 25,
      },
      {
        id: '2-4',
        title: 'Data Protection',
        type: 'reading',
        content: 'Guidelines for protecting sensitive data.',
        duration: 20,
      },
      {
        id: '2-5',
        title: 'Cybersecurity Assessment',
        type: 'quiz',
        content: 'quiz-2',
        duration: 10,
      },
    ],
  },
  {
    id: '3',
    title: 'Leadership Skills',
    description: 'Develop essential leadership skills to effectively manage teams and drive results.',
    duration: 120,
    category: 'Management',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    difficulty: 'advanced',
    required: false,
    sections: [
      {
        id: '3-1',
        title: 'Leadership Principles',
        type: 'video',
        content: 'https://example.com/videos/leadership-principles',
        duration: 25,
      },
      {
        id: '3-2',
        title: 'Effective Communication',
        type: 'reading',
        content: 'Strategies for clear and effective communication.',
        duration: 20,
      },
      {
        id: '3-3',
        title: 'Team Building',
        type: 'video',
        content: 'https://example.com/videos/team-building',
        duration: 30,
      },
      {
        id: '3-4',
        title: 'Conflict Resolution',
        type: 'simulation',
        content: 'Interactive simulation of conflict resolution scenarios.',
        duration: 35,
      },
      {
        id: '3-5',
        title: 'Leadership Assessment',
        type: 'quiz',
        content: 'quiz-3',
        duration: 10,
      },
    ],
  },
  {
    id: '4',
    title: 'Customer Service Excellence',
    description: 'Learn techniques to provide exceptional customer service and handle difficult situations.',
    duration: 75,
    category: 'Customer Service',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    difficulty: 'beginner',
    required: false,
    sections: [
      {
        id: '4-1',
        title: 'Customer Service Fundamentals',
        type: 'video',
        content: 'https://example.com/videos/customer-service-fundamentals',
        duration: 20,
      },
      {
        id: '4-2',
        title: 'Communication Skills',
        type: 'reading',
        content: 'Effective communication techniques for customer interactions.',
        duration: 15,
      },
      {
        id: '4-3',
        title: 'Handling Difficult Customers',
        type: 'simulation',
        content: 'Interactive simulation of challenging customer scenarios.',
        duration: 30,
      },
      {
        id: '4-4',
        title: 'Customer Service Assessment',
        type: 'quiz',
        content: 'quiz-4',
        duration: 10,
      },
    ],
  },
  {
    id: '5',
    title: 'Fire Safety and Emergency Evacuation',
    description: 'Comprehensive training on fire prevention, emergency response, and evacuation procedures to ensure workplace safety during fire incidents.',
    duration: 95,
    category: 'Safety',
    thumbnail: 'https://images.unsplash.com/photo-1520606393001-b816ded9caac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    difficulty: 'beginner',
    required: true,
    sections: [
      {
        id: '5-1',
        title: 'Fire Safety Basics',
        type: 'video',
        content: 'https://www.youtube.com/embed/qm7k68Pv0wU',
        duration: 15,
      },
      {
        id: '5-2',
        title: 'Types of Fire Extinguishers',
        type: 'reading',
        content: `
# Fire Extinguisher Types and Their Uses

Fire extinguishers are classified based on the type of fire they can extinguish. Understanding these classifications is crucial for effective fire response.

## Class A: Ordinary Combustibles
- **Materials**: Paper, wood, cloth, rubber, many plastics
- **Extinguisher Type**: Water, foam, multipurpose dry chemical
- **Identification**: Green triangle symbol with "A"

## Class B: Flammable Liquids
- **Materials**: Gasoline, oil, grease, acetone, paint thinners
- **Extinguisher Type**: Foam, CO2, dry chemical
- **Identification**: Red square symbol with "B"

## Class C: Electrical Equipment
- **Materials**: Energized electrical equipment, wiring, fuse boxes
- **Extinguisher Type**: CO2, dry chemical (never use water)
- **Identification**: Blue circle symbol with "C"

## Class D: Combustible Metals
- **Materials**: Magnesium, titanium, sodium, lithium
- **Extinguisher Type**: Dry powder specifically for metal fires
- **Identification**: Yellow star symbol with "D"

## Class K: Cooking Oils & Fats
- **Materials**: Vegetable oils, animal fats in cooking appliances
- **Extinguisher Type**: Wet chemical
- **Identification**: Black hexagon symbol with "K"

## Multi-Purpose Extinguishers
Most common in workplaces are ABC extinguishers, which can handle ordinary combustibles, flammable liquids, and electrical fires.

## Using a Fire Extinguisher: Remember PASS
1. **P**ull the pin
2. **A**im at the base of the fire
3. **S**queeze the handle
4. **S**weep from side to side

Always ensure you have a clear escape path before attempting to fight a fire, and never hesitate to evacuate if the fire grows beyond control.
`,
        duration: 20,
      },
      {
        id: '5-3',
        title: 'Fire Extinguisher Operation',
        type: 'video',
        content: 'https://www.youtube.com/embed/PQV71INDaqY',
        duration: 10,
      },
      {
        id: '5-4',
        title: 'Emergency Evacuation Procedures',
        type: 'reading',
        content: `
# Emergency Evacuation Procedures

Proper evacuation procedures are critical for ensuring everyone's safety during a fire emergency.

## Before an Emergency

### Know Your Evacuation Plan
- Familiarize yourself with all exit routes from your work area
- Locate the nearest emergency exits and stairwells
- Identify your designated assembly point outside the building
- Know the location of fire alarm pull stations and fire extinguishers

### Prepare for Special Needs
- If you or a colleague has mobility limitations, develop a personal evacuation plan
- Identify evacuation assistants who can help those with special needs
- Ensure evacuation chairs are available for multi-story buildings

## During an Evacuation

### When the Alarm Sounds
1. Remain calm and stop what you're doing immediately
2. If safe, quickly gather essential personal items (ID, phone, medications)
3. Close doors and windows as you leave, but do not lock them
4. Feel doors with the back of your hand before opening - if hot, find another exit
5. Use stairs, never elevators
6. Stay low if there's smoke (crawl if necessary)
7. Follow illuminated exit signs to the nearest emergency exit

### At the Assembly Point
1. Report to your designated assembly area
2. Check in with your floor warden or supervisor
3. Report any missing colleagues or those who need assistance
4. Wait for further instructions - never re-enter until authorized

## Special Situations

### If You're Trapped
- Close doors between you and the fire
- Seal door cracks and vents with cloth or tape to keep smoke out
- Call emergency services and report your exact location
- Signal for help at windows with a light-colored cloth

### Assisting Others
- Offer assistance to those with disabilities or special needs
- Guide visually impaired individuals by offering your elbow
- Help those with mobility issues to safe areas if evacuation is not possible

## After an Evacuation
- Remain at the assembly point until instructed otherwise
- Follow all instructions from emergency personnel
- Report any information about the fire or trapped persons
- Participate in roll calls or accountability procedures

Remember: Your safety is the priority. Never delay evacuation to save possessions or complete work tasks.
`,
        duration: 15,
      },
      {
        id: '5-5',
        title: 'Interactive Fire Drill Simulation',
        type: 'simulation',
        content: 'https://www.edapp.com/course/fire-safety-training',
        duration: 25,
      },
      {
        id: '5-6',
        title: 'Fire Safety VR Experience',
        type: 'simulation',
        content: 'https://www.youtube.com/embed/gCNgxLi1JZA',
        duration: 10,
      },
      {
        id: '5-7',
        title: 'Fire Safety Assessment',
        type: 'quiz',
        content: 'quiz-5',
        duration: 10,
      },
    ],
  },
];