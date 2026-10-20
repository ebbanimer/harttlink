import { ASSISTANT_COPY } from './assistant';
import type { Memory, Message, Plan, Profile } from '../types';
export const initialProfile: Profile = {
  you: 'Emma',
  partner: 'Sophie',
  since: '2021-06-12',
  birthday: 'April 18',
  likes: 'Thoughtful notes, slow mornings & sunset walks',
  story:
    'We met in a little café, borrowed the same charger, and talked for three hours. Our first date was a week later, back at the very same table.',
};
export const initialMessages: Message[] = [
  { who: 'assistant', text: ASSISTANT_COPY.greeting },
];
export const initialMemories: Memory[] = [
  {
    title: 'Salt air & no plans',
    date: 'August 2026',
    note: 'Our anniversary escape by the sea. No plans, long walks, and that tiny restaurant we still talk about.',
    photo: '',
    emoji: '🌊',
  },
  {
    title: 'Our kind of Sunday',
    date: 'September 2026',
    note: 'Coffee, the flower market, and absolutely nowhere to be.',
    photo: '',
    emoji: '🌷',
  },
];
export const initialPlans: Plan[] = [
  { title: 'Bookstore date & coffee', date: '2026-10-24' },
];
