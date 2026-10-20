import type { QuizDefinition } from '../types';

// Stable question and option IDs keep saved answers valid when labels change.
export const quizzes: Record<string, QuizDefinition> = {
  quiz: {
    id: 'quiz',
    mode: 'partner',
    questions: [
      {
        id: 'date',
        selfPrompt: 'What would you choose for a perfect date?',
        prompt: 'What would your partner choose for a perfect date?',
        options: [
          { id: 'home', label: 'Cooking together at home' },
          { id: 'outside', label: 'A long walk somewhere beautiful' },
          { id: 'new', label: 'Trying something completely new' },
          { id: 'dinner', label: 'Dressing up for dinner out' },
        ],
      },
      {
        id: 'comfort',
        selfPrompt: 'After a difficult day, what would you appreciate most?',
        prompt:
          'After a difficult day, what would your partner appreciate most?',
        options: [
          { id: 'listen', label: 'Someone to listen without fixing things' },
          { id: 'help', label: 'Help with the practical stuff' },
          { id: 'hug', label: 'A hug and a quiet evening together' },
          { id: 'space', label: 'A little time alone to recharge' },
        ],
      },
      {
        id: 'weekend',
        selfPrompt: 'Which weekend away would you pick?',
        prompt: 'Which weekend away would your partner pick?',
        options: [
          { id: 'sea', label: 'A little place by the sea' },
          { id: 'city', label: 'A city full of food and culture' },
          { id: 'cabin', label: 'A cozy cabin in the woods' },
          { id: 'stay', label: 'A slow staycation at home' },
        ],
      },
      {
        id: 'surprise',
        selfPrompt: 'Which surprise would make you smile most?',
        prompt: 'Which surprise would make your partner smile most?',
        options: [
          { id: 'note', label: 'A thoughtful handwritten note' },
          { id: 'plan', label: 'A date planned just for them' },
          { id: 'snack', label: 'Their favorite snack, just because' },
          { id: 'task', label: 'A task taken off their plate' },
        ],
      },
      {
        id: 'future',
        selfPrompt: 'Which shared experience would you most like to try next?',
        prompt:
          'Which shared experience would your partner most like to try next?',
        options: [
          { id: 'trip', label: 'A trip to somewhere new' },
          { id: 'skill', label: 'Learning a skill together' },
          { id: 'ritual', label: 'Starting a weekly date ritual' },
          { id: 'project', label: 'Making something for our home' },
        ],
      },
    ],
  },
  rather: {
    id: 'rather',
    mode: 'compare',
    questions: [
      {
        id: 'place',
        prompt: 'Where would you rather spend a month together?',
        options: [
          { id: 'sea', label: 'By the sea' },
          { id: 'mountains', label: 'In the mountains' },
        ],
      },
      {
        id: 'time',
        prompt: 'Which moment would you rather visit?',
        options: [
          { id: 'past', label: 'Our first meeting' },
          { id: 'future', label: 'Our next big adventure' },
        ],
      },
      {
        id: 'treat',
        prompt: 'Which shared luxury would you choose?',
        options: [
          { id: 'chef', label: 'A personal chef' },
          { id: 'travel', label: 'Unlimited travel' },
        ],
      },
      {
        id: 'fun',
        prompt: 'For a day, how would you rather communicate?',
        options: [
          { id: 'songs', label: 'Only in songs' },
          { id: 'movies', label: 'Only in movie quotes' },
        ],
      },
      {
        id: 'plans',
        prompt: 'How would you rather spend a free Saturday?',
        options: [
          { id: 'planned', label: 'Following a lovely plan' },
          { id: 'spontaneous', label: 'Seeing where the day takes us' },
        ],
      },
    ],
  },
  'love-language': {
    id: 'love-language',
    mode: 'self',
    questions: [
      {
        id: 'day',
        prompt: 'After a long day, which gesture would feel best?',
        options: [
          { id: 'words', label: 'Hearing “I’m proud of you”', trait: 'words' },
          {
            id: 'time',
            label: 'Their full attention over a cup of tea',
            trait: 'time',
          },
          { id: 'help', label: 'Having a chore taken care of', trait: 'help' },
          {
            id: 'gifts',
            label: 'A small treat chosen just for me',
            trait: 'gifts',
          },
          { id: 'touch', label: 'A welcome hug', trait: 'touch' },
        ],
      },
      {
        id: 'celebrate',
        prompt:
          'How would you most like your partner to celebrate a small win?',
        options: [
          {
            id: 'words',
            label: 'Tell me what they admire about my effort',
            trait: 'words',
          },
          {
            id: 'time',
            label: 'Set aside an evening just for us',
            trait: 'time',
          },
          {
            id: 'help',
            label: 'Make the rest of my day a little easier',
            trait: 'help',
          },
          {
            id: 'gifts',
            label: 'Bring something thoughtful to mark the moment',
            trait: 'gifts',
          },
          {
            id: 'touch',
            label: 'Hold me close, if I’m in the mood',
            trait: 'touch',
          },
        ],
      },
      {
        id: 'miss',
        prompt: 'When we have been busy, what do you miss most?',
        options: [
          { id: 'words', label: 'Our encouraging messages', trait: 'words' },
          { id: 'time', label: 'Uninterrupted time together', trait: 'time' },
          {
            id: 'help',
            label: 'The little things we do for each other',
            trait: 'help',
          },
          {
            id: 'gifts',
            label: 'Little reminders that they thought of me',
            trait: 'gifts',
          },
          {
            id: 'touch',
            label: 'Our comfortable physical closeness',
            trait: 'touch',
          },
        ],
      },
      {
        id: 'ordinary',
        prompt:
          'Which ordinary moment would make you feel especially cared for?',
        options: [
          {
            id: 'words',
            label: 'A sincere compliment out of the blue',
            trait: 'words',
          },
          {
            id: 'time',
            label: 'A walk with our phones put away',
            trait: 'time',
          },
          {
            id: 'help',
            label: 'Help with something that has been weighing on me',
            trait: 'help',
          },
          {
            id: 'gifts',
            label: 'Finding my favorite snack waiting for me',
            trait: 'gifts',
          },
          {
            id: 'touch',
            label: 'Holding hands when we both want to',
            trait: 'touch',
          },
        ],
      },
      {
        id: 'ask',
        prompt:
          'If you could ask for a little more of one thing this week, what would it be?',
        options: [
          { id: 'words', label: 'Kind, reassuring words', trait: 'words' },
          {
            id: 'time',
            label: 'Time when we are really present',
            trait: 'time',
          },
          { id: 'help', label: 'Practical support', trait: 'help' },
          { id: 'gifts', label: 'Thoughtful little surprises', trait: 'gifts' },
          {
            id: 'touch',
            label: 'Affectionate touch that feels welcome',
            trait: 'touch',
          },
        ],
      },
    ],
  },
};

export const affectionStyles: Record<
  string,
  { label: string; suggestion: string }
> = {
  words: {
    label: 'Words of affirmation',
    suggestion:
      'Tell your partner one specific thing you appreciate about them.',
  },
  time: {
    label: 'Quality time',
    suggestion:
      'Choose a small pocket of time with no phones and no distractions.',
  },
  help: {
    label: 'Acts of service',
    suggestion: 'Ask which small task would make their day easier.',
  },
  gifts: {
    label: 'Thoughtful gifts',
    suggestion:
      'Think of a little surprise with personal meaning, rather than a price tag.',
  },
  touch: {
    label: 'Physical affection',
    suggestion: 'Ask what kind of closeness would feel good to them today.',
  },
};
