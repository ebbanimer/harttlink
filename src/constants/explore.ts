import type { Category, TopicId } from '../types';
export type ExploreTopic = {
  id: TopicId;
  title: string;
  icon: string;
  description: string;
};
export const exploreTopics: Partial<Record<Category, ExploreTopic[]>> = {
  'Date ideas': [
    {
      id: 'at-home',
      title: 'At home',
      icon: '🏡',
      description: 'Stay in. Make it a date.',
    },
    {
      id: 'active',
      title: 'Active',
      icon: '🎾',
      description: 'A little movement, together.',
    },
    {
      id: 'unusual',
      title: 'Unusual',
      icon: '🪩',
      description: 'Something you haven’t tried.',
    },
    {
      id: 'outdoors',
      title: 'Outdoors',
      icon: '🌿',
      description: 'Fresh air and no rush.',
    },
    {
      id: 'budget',
      title: 'Budget friendly',
      icon: '🧺',
      description: 'Little cost. Lovely memories.',
    },
    {
      id: 'romantic',
      title: 'Romantic',
      icon: '🕯️',
      description: 'Make a little room for romance.',
    },
  ],
  Questions: [
    {
      id: 'financial',
      title: 'Financial',
      icon: '🪙',
      description: 'Money, habits, and shared priorities.',
    },
    {
      id: 'deep',
      title: 'Deep',
      icon: '☁️',
      description: 'A little closer to the real you.',
    },
    {
      id: 'funny',
      title: 'Funny',
      icon: '🍌',
      description: 'Laugh a little. Talk in real life.',
    },
    {
      id: 'would-you-rather',
      title: 'Would you rather',
      icon: '🎈',
      description: 'Pick a side. Tell them why.',
    },
    {
      id: 'memories',
      title: 'Memories',
      icon: '📷',
      description: 'Revisit your favorite chapters.',
    },
    {
      id: 'future',
      title: 'Future & dreams',
      icon: '✨',
      description: 'Imagine what comes next.',
    },
  ],
};
export const EXPLORE_COPY = {
  browse: 'Find your kind of moment',
  chooseDate: 'What kind of date feels right?',
  chooseQuestion: 'What do you feel like talking about?',
  dateIntro: 'Choose a category, find an idea, and make time for each other.',
  questionIntro:
    'Pick a theme and put your phones down. These questions are for real-life talks.',
  quizIntro:
    'Answer in the app to discover your preferences, compare choices, and learn about your partner.',
  gatewayHints: {
    'Date ideas': 'MAKE A PLAN',
    Questions: 'THEMED IRL TALKS',
    Quizzes: 'ANSWER IN THE APP',
    'Shuffle questions': 'A QUICK QUESTION TO SEND',
  },
  categories: 'Categories',
  all: 'All in this category',
  back: 'Back to categories',
  count: 'to explore',
  empty: 'More little ideas are on their way.',
  questions: 'Conversation questions',
  dates: 'Date ideas',
} as const;
