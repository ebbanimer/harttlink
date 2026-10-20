import { useState } from 'react';
import { Shuffle, Heart } from 'lucide-react';
import { SHARE_COPY } from '../constants/sharing';
import { useCloseby } from '../state/ClosebyProvider';
import { randomQuestionIndex } from '../utils/randomQuestion';
import { EXCHANGE_COPY } from '../constants/exchanges';
import { QuestionAnswerCard } from './QuestionAnswerCard';
import {
  shuffleQuestions,
  shuffleThemes,
  SHUFFLE_COPY,
  type ShuffleTheme,
} from '../constants/shuffleQuestions';

export function FunnyQuestion() {
  const [theme, setTheme] = useState<ShuffleTheme>('funny');
  const pool = shuffleQuestions[theme];
  const [index, setIndex] = useState(() => randomQuestionIndex(null));
  const [choosing, setChoosing] = useState(false);
  const {
    sendQuestion,
    profile,
    questionPerson,
    exchanges,
    selectedQuestionId,
    setQuestionInbox,
    setSelectedQuestionId,
  } = useCloseby();
  const themedExchanges = exchanges.filter(
    (item) => (item.theme ?? 'funny') === theme,
  );
  const active =
    themedExchanges.find((item) => item.id === selectedQuestionId) ??
    themedExchanges[0];
  const shuffle = () => {
    setIndex((previous) =>
      randomQuestionIndex(previous, Math.random, pool.length),
    );
    setChoosing(true);
  };
  return (
    <section className="funny-card">
      <div className="chips" role="group" aria-label={SHUFFLE_COPY.themes}>
        {shuffleThemes.map((item) => (
          <button
            key={item.id}
            className={theme === item.id ? 'active' : ''}
            onClick={() => {
              setTheme(item.id);
              setIndex(
                randomQuestionIndex(
                  null,
                  Math.random,
                  shuffleQuestions[item.id].length,
                ),
              );
              setChoosing(true);
            }}
          >
            {item.icon} {item.title}
          </button>
        ))}
      </div>
      {active && !choosing ? (
        <QuestionAnswerCard exchange={active} />
      ) : (
        <>
          <small>{SHARE_COPY.eyebrow}</small>
          <h3>{SHUFFLE_COPY.title}</h3>
          <p>{pool[index]}</p>
          <button
            className="ask-question"
            onClick={() => {
              sendQuestion(pool[index], false, theme);
              setChoosing(false);
            }}
          >
            <Heart size={16} />
            {EXCHANGE_COPY.sendQuestion} ·{' '}
            {questionPerson === 'you' ? profile.partner : profile.you}
          </button>
        </>
      )}
      <div className="question-card-actions">
        <button onClick={shuffle}>
          <Shuffle size={16} />
          {SHUFFLE_COPY.shuffle}
        </button>
        <button
          onClick={() => {
            setSelectedQuestionId(null);
            setQuestionInbox(true);
          }}
        >
          {EXCHANGE_COPY.inbox}
        </button>
      </div>
    </section>
  );
}
