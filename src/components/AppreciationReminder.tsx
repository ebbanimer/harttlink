import { Check, Heart } from 'lucide-react';
import { items } from '../constants/content';
import { PLANNING_COPY as TEXT } from '../constants/planning';
import { useCloseby } from '../state/ClosebyProvider';
import { appreciationForDay } from '../utils/planning';

export function AppreciationReminder() {
  const {
    quizEntries,
    date,
    appreciationDays,
    setAppreciationDays,
    open,
    profile,
  } = useCloseby();
  const reminder = appreciationForDay(quizEntries['love-language'], date);
  const done = appreciationDays.includes(date);
  return (
    <section className={'appreciation ' + (done ? 'is-done' : '')}>
      <div className="cardtop">
        <span>
          <Heart size={14} />
          {TEXT.reminderEyebrow}
        </span>
      </div>
      <h3>{done ? TEXT.reminderDone : TEXT.reminderTitle}</h3>
      <p>{reminder.text}</p>
      <small className="privatehint">
        {reminder.style
          ? `${profile.partner} · ${reminder.style}`
          : TEXT.noResult}
      </small>
      {reminder.style ? (
        <small className="privatehint">{TEXT.basedOn}</small>
      ) : (
        <button
          className="textlink"
          onClick={() =>
            open(items.find((item) => item.id === 'love-language')!)
          }
        >
          {TEXT.discover}
        </button>
      )}
      <button
        className="reminder-check"
        onClick={() =>
          setAppreciationDays((previous) =>
            done ? previous.filter((day) => day !== date) : [...previous, date],
          )
        }
      >
        <Check size={15} />
        {done ? TEXT.undo : TEXT.markDone}
      </button>
    </section>
  );
}
