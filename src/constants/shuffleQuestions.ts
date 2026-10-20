import type { Item } from '../types';
import { FUNNY_QUESTIONS } from './sharing';

export type ShuffleTheme = 'funny' | 'random' | 'cute';
export const shuffleThemes = [
  { id: 'funny', title: 'Funny', icon: '🍌' },
  { id: 'random', title: 'Random', icon: '🎲' },
  { id: 'cute', title: 'Cute', icon: '💌' },
] as const;
export const shuffleQuestions: Record<ShuffleTheme, readonly string[]> = {
  funny: FUNNY_QUESTIONS,
  random: [
    'What song matches your mood right now?',
    'If you could teleport us somewhere for lunch, where would we go?',
    'What tiny thing made you smile today?',
    'What is one completely random thing you learned recently?',
    'What snack should I bring on our next adventure?',
    'If tonight had no responsibilities, what would you want us to do?',
    'What would you name a café we opened together?',
    'Which fictional world would you visit with me for an afternoon?',
  ],
  cute: [
    'What is a little thing I do that you secretly find adorable?',
    'What is your favorite ordinary moment with me?',
    'If you could steal ten minutes with me today, how would we spend them?',
    'What was the last thing that reminded you of us?',
    'Which song would you put on a playlist just for me?',
    'What is one tiny date you would love us to squeeze in this week?',
    'What nickname would you give our relationship today?',
    'What is a small memory of us you wish you had a photo of?',
  ],
};
export const SHUFFLE_COPY = {
  title: 'A little question, just because',
  intro:
    'Pick a mood, shuffle, and surprise your partner throughout the day. Answer right on the question card in Hartlink.',
  shuffle: 'Shuffle another',
  themes: 'Choose a question mood',
};
export const shuffleDecks: Item[] = shuffleThemes.map((theme) => ({
  id: `shuffle-${theme.id}`,
  category: 'Shuffle questions',
  interaction: 'exchange',
  topics: [theme.id],
  title: `${theme.title} quick questions`,
  sub: 'Shuffle · Send a little moment · Answer in Hartlink',
  icon: theme.icon,
  body: [...shuffleQuestions[theme.id]],
}));
