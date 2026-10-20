import type { QuestionExchange, QuizParticipant } from '../types';

export function latestQuestionAnswer(
  exchange: QuestionExchange,
  person: QuizParticipant,
) {
  return [...exchange.replies]
    .reverse()
    .find((answer) => answer.author === person);
}
export function questionNeedsReply(
  exchange: QuestionExchange,
  person: QuizParticipant,
) {
  return !latestQuestionAnswer(exchange, person);
}
export function saveQuestionAnswer(
  exchange: QuestionExchange,
  person: QuizParticipant,
  text: string,
  id: string,
  createdAt: string,
): QuestionExchange {
  if (!text.trim()) return exchange;
  return {
    ...exchange,
    replies: [
      ...exchange.replies.filter((answer) => answer.author !== person),
      { id, author: person, text: text.trim(), createdAt },
    ],
  };
}
