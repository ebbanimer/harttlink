import type { QuizDefinition, QuizEntry, QuizParticipant } from '../types';

export function emptyQuizEntry(): QuizEntry {
  return {
    answers: { you: {}, partner: {} },
    submitted: { you: false, partner: false },
  };
}
export function isRoundComplete(
  quiz: QuizDefinition,
  entry: QuizEntry,
  person: QuizParticipant,
) {
  return (
    quiz.questions.length > 0 &&
    quiz.questions.every((question) =>
      question.options.some(
        (option) => option.id === entry.answers[person][question.id],
      ),
    )
  );
}
export function matchingAnswers(quiz: QuizDefinition, entry: QuizEntry) {
  return quiz.questions.filter((question) => {
    const answer = entry.answers.you[question.id];
    return (
      answer !== undefined && answer === entry.answers.partner[question.id]
    );
  }).length;
}
export function affectionScores(
  quiz: QuizDefinition,
  answers: Record<string, string>,
) {
  const scores: Record<string, number> = {};
  for (const question of quiz.questions) {
    const option = question.options.find(
      (option) => option.id === answers[question.id],
    );
    if (option?.trait) scores[option.trait] = (scores[option.trait] ?? 0) + 1;
  }
  return Object.entries(scores).sort((a, b) => b[1] - a[1]);
}
