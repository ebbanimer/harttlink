export type Category =
  | 'Date ideas'
  | 'Quizzes'
  | 'Questions'
  | 'Shuffle questions'
  | 'Grow Together';
export type TopicId =
  | 'at-home'
  | 'active'
  | 'unusual'
  | 'outdoors'
  | 'budget'
  | 'romantic'
  | 'financial'
  | 'deep'
  | 'funny'
  | 'would-you-rather'
  | 'memories'
  | 'future'
  | 'random'
  | 'cute';
export type Tab = 'Home' | 'Explore' | 'Our Space' | 'Calendar';
export type Filter = 'All' | Category;
export type FormKind = '' | 'profile' | 'plan' | 'memory';
export type Item = {
  id: string;
  category: Category;
  title: string;
  sub: string;
  icon: string;
  body: string[];
  quizId?: string;
  topics?: TopicId[];
  interaction?: 'exchange';
};
export type Profile = {
  you: string;
  partner: string;
  since: string;
  birthday: string;
  likes: string;
  story: string;
};
export type Message = { who: 'me' | 'assistant'; text: string };
export type Memory = {
  title: string;
  date: string;
  note: string;
  photo: string;
  emoji: string;
  occurredOn?: string;
  kind?: 'memory' | 'milestone';
};
export type ImportantDate = {
  id: string;
  title: string;
  date: string;
  annual: boolean;
};
export type UpcomingDate = ImportantDate & {
  nextDate: string;
  daysAway: number;
  reminderDue: boolean;
};
export type PartnerFavorites = {
  treats: string;
  timeTogether: string;
  giftIdeas: string;
  notes: string;
};
export type Plan = {
  title: string;
  date: string;
  time?: string;
  notes?: string;
};

export type QuizMode = 'partner' | 'self' | 'compare';
export type QuizParticipant = 'you' | 'partner';
export type QuestionReply = {
  id: string;
  author: QuizParticipant;
  text: string;
  createdAt: string;
};
export type QuestionExchange = {
  theme?: 'funny' | 'random' | 'cute';
  id: string;
  sender: QuizParticipant;
  question: string;
  createdAt: string;
  replies: QuestionReply[];
};
export type QuizOption = { id: string; label: string; trait?: string };
export type QuizQuestion = {
  id: string;
  prompt: string;
  selfPrompt?: string;
  options: QuizOption[];
};
export type QuizDefinition = {
  id: string;
  mode: QuizMode;
  questions: QuizQuestion[];
};
export type QuizEntry = {
  answers: Record<QuizParticipant, Record<string, string>>;
  submitted: Record<QuizParticipant, boolean>;
};
