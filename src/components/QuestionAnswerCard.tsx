import { useState } from 'react';
import { Check, Pencil } from 'lucide-react';
import { EXCHANGE_COPY as TEXT } from '../constants/exchanges';
import { useCloseby } from '../state/ClosebyProvider';
import type { QuestionExchange } from '../types';
import { latestQuestionAnswer } from '../utils/exchanges';

/** One question, one editable answer per person. This is not a conversation. */
export function QuestionAnswerCard({
  exchange,
}: {
  exchange: QuestionExchange;
}) {
  const { profile, questionPerson, setQuestionPerson } = useCloseby();
  const name = (person: 'you' | 'partner') =>
    person === 'you' ? profile.you : profile.partner;
  return (
    <section className="question-answer-card">
      <small>{TEXT.cardLabel}</small>
      <h2>{exchange.question}</h2>
      <div className="person-switch">
        <small>{TEXT.viewing}</small>
        <div>
          {(['you', 'partner'] as const).map((person) => (
            <button
              key={person}
              className={questionPerson === person ? 'active' : ''}
              aria-pressed={questionPerson === person}
              onClick={() => setQuestionPerson(person)}
            >
              {name(person)}
            </button>
          ))}
        </div>
      </div>
      {(['you', 'partner'] as const).map((person) => {
        const answer = latestQuestionAnswer(exchange, person);
        return (
          <div className="question-answer-slot" key={person}>
            <h3>
              {name(person)}
              {person === questionPerson ? ` · ${TEXT.you}` : ''}
            </h3>
            {person === questionPerson ? (
              <AnswerField
                key={`${exchange.id}-${person}`}
                exchange={exchange}
              />
            ) : answer ? (
              <p>{answer.text}</p>
            ) : (
              <p className="answer-waiting">
                {TEXT.waitingFor} {name(person)}
                {TEXT.answerSuffix}
              </p>
            )}
          </div>
        );
      })}
      <p className="privatehint">{TEXT.demo}</p>
    </section>
  );
}

function AnswerField({ exchange }: { exchange: QuestionExchange }) {
  const { questionPerson, answerQuestion } = useCloseby();
  const saved = latestQuestionAnswer(exchange, questionPerson);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(saved?.text ?? '');
  if (saved && !editing)
    return (
      <>
        <p>{saved.text}</p>
        <button
          className="answer-edit"
          onClick={() => {
            setText(saved.text);
            setEditing(true);
          }}
        >
          <Pencil size={14} />
          {TEXT.editAnswer}
        </button>
      </>
    );
  return (
    <form
      className="exchange-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (answerQuestion(exchange.id, text)) setEditing(false);
      }}
    >
      <label>
        {TEXT.reply}
        <textarea
          required
          maxLength={1200}
          placeholder={TEXT.placeholder}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </label>
      <button className="primary" disabled={!text.trim()}>
        <Check size={17} />
        {saved ? TEXT.updateAnswer : TEXT.sendReply}
      </button>
    </form>
  );
}
