import { shuffleDecks } from './shuffleQuestions';
import { dateIdeas } from './dateIdeas';
import { questionPacks } from './questionPacks';
import type { Item } from '../types';
export const items: Item[] = [
  {
    id: 'walk',
    topics: ['active', 'outdoors', 'budget'],
    category: 'Date ideas',
    title: 'The no-destination walk',
    sub: '30 min · Outside · Just you two',
    icon: '🌿',
    body: [
      'Leave the route undecided. Let curiosity choose the turns.',
      'Put your phones away, take turns choosing left or right, and stop somewhere neither of you has been.',
      'Bring a warm drink. Along the way, ask: what has been on your mind lately?',
    ],
  },
  {
    id: 'quiz',
    quizId: 'quiz',
    category: 'Quizzes',
    title: 'How well do you know me?',
    sub: '5 questions · Answer & guess in the app',
    icon: '🍊',
    body: [],
  },
  {
    id: 'deep',
    topics: ['deep'],
    category: 'Questions',
    title: 'A little deeper',
    sub: '5 prompts · Make room for a real talk',
    icon: '☁️',
    body: [
      'When do you feel most like yourself?',
      'What is something you wish people understood about you?',
      'What does being supported look like for you right now?',
      'What dream have you quietly been holding onto?',
      'What has our relationship taught you?',
    ],
  },
  {
    id: 'space',
    category: 'Grow Together',
    title: 'Room for you. Room for us.',
    sub: '3 min read · Boundaries & care',
    icon: '🌱',
    body: [
      'Learn|Being close does not mean being available all the time. Different needs for space can sit comfortably alongside a strong relationship. Say what you need kindly and specifically: “I need a quiet evening, but I would love to see you Saturday.”',
      'Reflect|When does time alone help you show up as a better partner? What makes a request for space feel reassuring?',
      'Try Together|Share one thing that helps you recharge. Agree on a simple way to ask for space without leaving the other person guessing.',
    ],
  },
  {
    id: 'cozy',
    topics: ['at-home', 'budget'],
    category: 'Date ideas',
    title: 'A very unserious dinner date',
    sub: '1 hour · At home · Bring an appetite',
    icon: '🍝',
    body: [
      'Dress up for dinner at home. The sillier the theme, the better.',
      'Each bring one dish and one song. Set the table with whatever you have.',
      'Give your dishes dramatic restaurant names and toast to a tiny win from the week.',
    ],
  },
  {
    id: 'rather',
    quizId: 'rather',
    category: 'Quizzes',
    title: 'Would you rather…',
    sub: '5 questions · Choose & compare in the app',
    icon: '🎈',
    body: [],
  },
  {
    id: 'memories',
    topics: ['memories'],
    category: 'Questions',
    title: 'Remember when?',
    sub: '4 prompts · Our favorite chapters',
    icon: '📷',
    body: [
      'What is our most ridiculous shared memory?',
      'Which ordinary day together became special?',
      'What song takes you straight back to a memory of us?',
      'What tradition should we bring back?',
    ],
  },
  {
    id: 'repair',
    category: 'Grow Together',
    title: 'After a small misunderstanding',
    sub: '2 min read · Communication',
    icon: '🫶',
    body: [
      'Learn|Start with curiosity. A short reply or cancelled plan can have more than one explanation. Describe what happened and how you felt without deciding what your partner meant.',
      'Reflect|What story did you tell yourself? What could you ask instead of assuming?',
      'Try Together|Try: “When our plan changed, I felt disappointed. Can we talk about it?” Take turns listening, then choose one small next step together.',
    ],
  },
  {
    id: 'first-date',
    topics: ['romantic'],
    category: 'Date ideas',
    title: 'Our first date, all over again',
    sub: 'An evening · Nostalgia & a little romance',
    icon: '🕯️',
    body: [
      'Revisit the place where your story began, or recreate its feeling at home.',
      'Choose a song, a meal, or an outfit that takes you back. Tell each other one thing you remember noticing that day.',
      'Finish with a new chapter: what is one thing you want more of in our next year together?',
    ],
  },
  {
    id: 'love-language',
    quizId: 'love-language',
    category: 'Quizzes',
    title: 'What is your love language?',
    sub: '5 questions · Discover your affection preferences',
    icon: '💌',
    body: [],
  },
  ...dateIdeas,
  ...questionPacks,
  ...shuffleDecks,
];
export const prompts = [
  'If we could relive one day together, which one would you choose?',
  'What is a tiny thing I do that makes you feel loved?',
  'What adventure should we say yes to this year?',
  'What is a memory from our first dates that still makes you smile?',
  'What is one way I can support you better this week?',
];

export const weeklyMoment: Item = {
  id: 'weekly',
  category: 'Questions',
  title: 'Our weekly check-in',
  sub: '15 minutes · A ritual for the two of you',
  icon: '🤍',
  body: [
    'When did you feel close to me this week, and when did you need more support?',
    'What is one thing we appreciate about each other, and one date or quiet moment we can make time for next week?',
  ],
};
export const categories = [
  'All',
  'Date ideas',
  'Questions',
  'Quizzes',
  'Shuffle questions',
  'Grow Together',
] as const;
