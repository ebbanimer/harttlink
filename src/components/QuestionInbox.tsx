import { X, ArrowLeft } from 'lucide-react';
import { EXCHANGE_COPY as TEXT } from '../constants/exchanges';
import { useCloseby } from '../state/ClosebyProvider';
import { QuestionAnswerCard } from './QuestionAnswerCard';

export function QuestionInbox() {
  const {
    exchanges,
    selectedQuestionId,
    setSelectedQuestionId,
    setQuestionInbox,
  } = useCloseby();
  const selected = exchanges.find((item) => item.id === selectedQuestionId);
  const visible = selected ? [selected] : exchanges;
  return (
    <div className="overlay">
      <section className="sheet question-collection">
        <div className="modalbar">
          <h3>{TEXT.title}</h3>
          <button
            aria-label={TEXT.close}
            onClick={() => setQuestionInbox(false)}
          >
            <X />
          </button>
        </div>
        {selected && (
          <button
            className="topic-back"
            onClick={() => setSelectedQuestionId(null)}
          >
            <ArrowLeft size={16} />
            {TEXT.back}
          </button>
        )}
        {visible.length === 0 && <p className="intro">{TEXT.empty}</p>}
        {visible.map((exchange) => (
          <QuestionAnswerCard key={exchange.id} exchange={exchange} />
        ))}
      </section>
    </div>
  );
}
