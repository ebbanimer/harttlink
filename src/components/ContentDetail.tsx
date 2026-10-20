import { QuizRunner } from './QuizRunner';
import { ArrowLeft, ArrowRight, Bookmark, Calendar, Send } from 'lucide-react';
import { COPY } from '../constants/copy';
import { EXCHANGE_COPY } from '../constants/exchanges';
import { useCloseby } from '../state/ClosebyProvider';
export function ContentDetail() {
  const {
    detail,
    step,
    setStep,
    setDetail,
    saved,
    bookmark,
    setForm,
    setPlanTitle,
    notify,
    share,
    profile,
    sendQuestion,
  } = useCloseby();
  if (!detail) return null;
  return (
    <div className="overlay">
      <section className="sheet">
        <div className="modalbar">
          <button
            aria-label={COPY.accessibility.closeDetail}
            onClick={() => setDetail(null)}
          >
            <ArrowLeft />
          </button>
          <small>{detail.category}</small>
          <button
            aria-label={COPY.accessibility.bookmark}
            onClick={() => bookmark(detail.id)}
          >
            <Bookmark
              fill={saved.includes(detail.id) ? 'currentColor' : 'none'}
            />
          </button>
        </div>
        <div className="detailart">{detail.icon}</div>
        <h1>{detail.title}</h1>
        <p className="intro">{detail.sub}</p>
        {detail.category === 'Quizzes' ? (
          <QuizRunner key={detail.id} quizId={detail.quizId ?? detail.id} />
        ) : detail.category === 'Questions' ||
          detail.category === 'Shuffle questions' ? (
          <>
            <div className="progress">
              {detail.body.map((_, n) => (
                <span className={n <= step ? 'on' : ''} key={n} />
              ))}
            </div>
            <small>
              {COPY.common.question} {step + 1} {COPY.common.of}{' '}
              {detail.body.length}
            </small>
            <h2 className="quizquestion">{detail.body[step]}</h2>
            <p className="intro">
              {detail.interaction === 'exchange'
                ? EXCHANGE_COPY.funnyHint
                : COPY.detail.conversationHint}
            </p>
            <div className="quizcontrols">
              <button disabled={step === 0} onClick={() => setStep(step - 1)}>
                <ArrowLeft />
                {COPY.common.back}
              </button>
              <button
                className="primary"
                onClick={() =>
                  step < detail.body.length - 1
                    ? setStep(step + 1)
                    : (setDetail(null), notify(COPY.notifications.finished))
                }
              >
                {step === detail.body.length - 1
                  ? COPY.common.finish
                  : COPY.common.next}
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        ) : (
          detail.body.map((b, n) => {
            const parts = b.split('|');
            return (
              <div className="articlepart" key={n}>
                <h3>
                  {parts.length > 1
                    ? parts[0]
                    : [
                        COPY.detail.idea,
                        COPY.detail.instructions,
                        COPY.detail.extra,
                      ][n]}
                </h3>
                <p>{parts.length > 1 ? parts[1] : b}</p>
              </div>
            );
          })
        )}
        {detail.category === 'Date ideas' && (
          <button
            className="primary"
            onClick={() => {
              setForm('plan');
              setPlanTitle(detail.title);
              setDetail(null);
            }}
          >
            <Calendar size={18} /> {COPY.common.makePlan}
          </button>
        )}
        {detail.category === 'Grow Together' && (
          <small className="privatehint">{COPY.detail.privateHint}</small>
        )}
        <button
          className="share"
          onClick={() =>
            detail.interaction === 'exchange'
              ? sendQuestion(
                  detail.body[step],
                  true,
                  detail.topics?.includes('cute')
                    ? 'cute'
                    : detail.topics?.includes('random')
                      ? 'random'
                      : 'funny',
                )
              : share(detail.title)
          }
        >
          <Send size={17} />{' '}
          {detail.interaction === 'exchange'
            ? EXCHANGE_COPY.sendQuestion
            : `${COPY.common.sendTo} ${profile.partner}`}
        </button>
      </section>
    </div>
  );
}
