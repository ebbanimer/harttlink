import { appreciationIdeas, PLANNING_COPY } from '../constants/planning';
import { affectionStyles, quizzes } from '../constants/quizzes';
import type { Plan, QuizEntry } from '../types';
import { affectionScores, isRoundComplete } from './quizzes';

export function appreciationForDay(entry: QuizEntry | undefined, day: string) {
  const quiz = quizzes['love-language'];
  if (!entry?.submitted.partner || !isRoundComplete(quiz, entry, 'partner'))
    return { text: PLANNING_COPY.generic, style: null };
  const scores = affectionScores(quiz, entry.answers.partner);
  const leaders = scores.filter(([, score]) => score === scores[0]?.[1]);
  const [year, month, dayOfMonth] = day.split('-').map(Number);
  const dayNumber = Math.floor(
    Date.UTC(year, month - 1, dayOfMonth) / 86400000,
  );
  const style = leaders[dayNumber % leaders.length]?.[0];
  const ideas = appreciationIdeas[style];
  return {
    text: ideas?.[dayNumber % ideas.length] ?? PLANNING_COPY.generic,
    style: affectionStyles[style]?.label ?? null,
  };
}

export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function monthCells(year: number, month: number) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const length = Math.ceil((offset + count) / 7) * 7;
  return Array.from({ length }, (_, index) =>
    index >= offset && index < offset + count
      ? dateKey(new Date(year, month, index - offset + 1))
      : null,
  );
}
export function upcomingPlans(plans: Plan[], today: string) {
  return plans
    .filter((plan) => plan.date >= today)
    .sort((a, b) =>
      (a.date + (a.time ?? '')).localeCompare(b.date + (b.time ?? '')),
    );
}
