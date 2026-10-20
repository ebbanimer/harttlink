import { useState } from 'react';
import { Check, Send } from 'lucide-react';
import { QUIZ_COPY as TEXT } from '../constants/quizCopy';
import { affectionStyles, quizzes } from '../constants/quizzes';
import { useCloseby } from '../state/ClosebyProvider';
import type { QuizEntry, QuizParticipant } from '../types';
import {
  affectionScores,
  emptyQuizEntry,
  isRoundComplete,
  matchingAnswers,
} from '../utils/quizzes';

export function QuizRunner({ quizId }: { quizId: string }) {
  const quiz = quizzes[quizId];
  const {
    share,
    quizEntries: entries,
    setQuizEntries: setEntries,
  } = useCloseby();
  const entry = entries[quizId] ?? emptyQuizEntry();
  const [view, setView] = useState<QuizParticipant | 'results'>(
    quiz?.mode === 'partner' ? 'partner' : 'you',
  );
  const [step, setStep] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  if (!quiz) return <p>{TEXT.noQuiz}</p>;
  const ready = (person: QuizParticipant) =>
    entry.submitted[person] && isRoundComplete(quiz, entry, person);
  const bothReady = ready('you') && ready('partner');
  const startRound = (person: QuizParticipant) => {
    setView(person);
    setStep(0);
    setReviewing(false);
  };
  const update = (next: QuizEntry) =>
    setEntries((previous) => ({ ...previous, [quizId]: next }));
  const shareResult = () => {
    const scores = affectionScores(quiz, entry.answers.you);
    const top = scores.filter(([, score]) => score === scores[0]?.[1]);
    share(
      TEXT.sharePrefix +
        top.map(([style]) => affectionStyles[style].label).join(', '),
    );
  };

  return (
    <section className="quizrunner">
      <small>{TEXT.inApp}</small>
      <p className="quiz-intro">
        {quiz.mode === 'partner'
          ? TEXT.partnerIntro
          : quiz.mode === 'self'
            ? TEXT.selfIntro
            : TEXT.compareIntro}
      </p>
      <p className="privatehint">{TEXT.localNotice}</p>
      <div className="quiz-tabs" role="group" aria-label={TEXT.inApp}>
        <button
          className={view === 'you' ? 'active' : ''}
          disabled={quiz.mode === 'partner' && !ready('partner')}
          onClick={() => startRound('you')}
        >
          {quiz.mode === 'partner' ? TEXT.guesses : TEXT.you}{' '}
          {ready('you') && <Check size={13} />}
        </button>
        <button
          className={view === 'partner' ? 'active' : ''}
          onClick={() => startRound('partner')}
        >
          {TEXT.partner} {ready('partner') && <Check size={13} />}
        </button>
        <button
          className={view === 'results' ? 'active' : ''}
          disabled={
            quiz.mode === 'self'
              ? !ready('you') && !ready('partner')
              : !bothReady
          }
          onClick={() => setView('results')}
        >
          {TEXT.results}
        </button>
      </div>
      {view === 'results' ? (
        <>
          {quiz.mode === 'self' ? (
            <>
              {(['you', 'partner'] as const).filter(ready).map((person) => {
                const scores = affectionScores(quiz, entry.answers[person]);
                const favorites = scores.filter(
                  ([, score]) => score === scores[0]?.[1],
                );
                return (
                  <div className="quiz-result" key={person}>
                    <small>
                      {person === 'you' ? TEXT.selfResult : TEXT.partnerResult}
                    </small>
                    {favorites.length > 1 && (
                      <p className="privatehint">{TEXT.tie}</p>
                    )}
                    <h2>
                      {favorites
                        .map(([style]) => affectionStyles[style].label)
                        .join(' + ')}
                    </h2>
                    {scores.map(([style, score]) => (
                      <div className="quiz-score" key={style}>
                        <span>{affectionStyles[style].label}</span>
                        <strong>
                          {score} / {quiz.questions.length}
                        </strong>
                      </div>
                    ))}
                    {favorites.map(([style]) => (
                      <p key={style}>{affectionStyles[style].suggestion}</p>
                    ))}
                  </div>
                );
              })}
              <p className="privatehint">{TEXT.styleHint}</p>
              {ready('you') && (
                <button className="share" onClick={shareResult}>
                  <Send size={16} />
                  {TEXT.share}
                </button>
              )}
              {!ready('partner') && (
                <button className="share" onClick={() => startRound('partner')}>
                  {TEXT.pickPartner}
                </button>
              )}
            </>
          ) : bothReady ? (
            <>
              <div className="quiz-result">
                <h2>
                  {matchingAnswers(quiz, entry)} / {quiz.questions.length}
                </h2>
                <strong>{TEXT.matches}</strong>
                <p>{TEXT.matchHint}</p>
              </div>
              {quiz.questions.map((question) => (
                <div className="quiz-comparison" key={question.id}>
                  <h3>{question.prompt}</h3>
                  <p>
                    <strong>
                      {quiz.mode === 'partner' ? TEXT.guessed : TEXT.yours}
                      :{' '}
                    </strong>
                    {
                      question.options.find(
                        (option) =>
                          option.id === entry.answers.you[question.id],
                      )?.label
                    }
                  </p>
                  <p>
                    <strong>
                      {quiz.mode === 'partner' ? TEXT.actual : TEXT.theirs}
                      :{' '}
                    </strong>
                    {
                      question.options.find(
                        (option) =>
                          option.id === entry.answers.partner[question.id],
                      )?.label
                    }
                  </p>
                </div>
              ))}
            </>
          ) : (
            <p>{TEXT.waiting}</p>
          )}
        </>
      ) : quiz.mode === 'partner' && view === 'you' && !ready('partner') ? (
        <p>{TEXT.partnerFirst}</p>
      ) : ready(view) && !reviewing ? (
        <div className="quiz-result">
          <Check size={28} />
          <h2>{view === 'you' ? TEXT.complete : TEXT.partnerComplete}</h2>
          <button
            className="primary"
            onClick={() =>
              bothReady || quiz.mode === 'self'
                ? setView('results')
                : startRound(view === 'you' ? 'partner' : 'you')
            }
          >
            {bothReady
              ? TEXT.compare
              : quiz.mode === 'self'
                ? TEXT.results
                : view === 'partner' && quiz.mode === 'partner'
                  ? TEXT.nextGuesses
                  : TEXT.nextPartner}
          </button>
          <button
            className="share"
            onClick={() => {
              setReviewing(true);
              setStep(0);
            }}
          >
            {TEXT.edit}
          </button>
        </div>
      ) : (
        <>
          <p className="quiz-turn">
            {quiz.mode === 'partner'
              ? view === 'partner'
                ? TEXT.partnerTurn
                : TEXT.guessTurn
              : view === 'partner'
                ? TEXT.partnerTurn
                : TEXT.yourTurn}
          </p>
          <div className="progress">
            {quiz.questions.map((question, index) => (
              <span key={question.id} className={index <= step ? 'on' : ''} />
            ))}
          </div>
          <small>
            {TEXT.question} {step + 1} {TEXT.of} {quiz.questions.length}
          </small>
          <fieldset className="quiz-choices">
            <legend>
              {quiz.mode === 'partner' && view === 'partner'
                ? (quiz.questions[step].selfPrompt ??
                  quiz.questions[step].prompt)
                : quiz.questions[step].prompt}
            </legend>
            {quiz.questions[step].options.map((option) => (
              <label
                key={option.id}
                className={
                  entry.answers[view][quiz.questions[step].id] === option.id
                    ? 'chosen'
                    : ''
                }
              >
                <input
                  type="radio"
                  name={`${quizId}-${view}-${quiz.questions[step].id}`}
                  checked={
                    entry.answers[view][quiz.questions[step].id] === option.id
                  }
                  onChange={() =>
                    update({
                      answers: {
                        ...entry.answers,
                        [view]: {
                          ...entry.answers[view],
                          [quiz.questions[step].id]: option.id,
                        },
                      },
                      submitted: { ...entry.submitted, [view]: false },
                    })
                  }
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
          <p className="privatehint">
            {entry.answers[view][quiz.questions[step].id]
              ? TEXT.saved
              : TEXT.choose}
          </p>
          <div className="quizcontrols">
            <button disabled={step === 0} onClick={() => setStep(step - 1)}>
              {TEXT.back}
            </button>
            <button
              className="primary"
              disabled={
                !quiz.questions[step].options.some(
                  (option) =>
                    option.id === entry.answers[view][quiz.questions[step].id],
                )
              }
              onClick={() => {
                if (step < quiz.questions.length - 1) {
                  setStep(step + 1);
                  return;
                }
                if (!isRoundComplete(quiz, entry, view)) {
                  setStep(
                    quiz.questions.findIndex(
                      (question) =>
                        !question.options.some(
                          (option) =>
                            option.id === entry.answers[view][question.id],
                        ),
                    ),
                  );
                  return;
                }
                update({
                  ...entry,
                  submitted: { ...entry.submitted, [view]: true },
                });
                setReviewing(false);
                if (quiz.mode === 'self') setView('results');
              }}
            >
              {step === quiz.questions.length - 1 ? TEXT.finish : TEXT.next}
            </button>
          </div>
        </>
      )}
    </section>
  );
}
