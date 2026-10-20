import { FUNNY_QUESTIONS } from '../constants/sharing';
export function randomQuestionIndex(
  previous: number | null,
  random = Math.random,
  count: number = FUNNY_QUESTIONS.length,
) {
  if (count <= 1) return 0;
  if (previous === null)
    return Math.min(count - 1, Math.floor(random() * count));
  const offset = 1 + Math.min(count - 2, Math.floor(random() * (count - 1)));
  return (previous + offset) % count;
}
