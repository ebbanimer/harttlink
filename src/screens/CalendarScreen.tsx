import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Pencil, X } from 'lucide-react';
import { PLANNING_COPY as TEXT } from '../constants/planning';
import { useCloseby } from '../state/ClosebyProvider';
import { monthCells } from '../utils/planning';
import { importantDateOnDay } from '../utils/ourSpace';
import { SPACE_COPY } from '../constants/ourSpace';
import { TAB_LABELS } from '../constants/copy';

export function CalendarScreen() {
  const { date, plans, openPlan, removePlan, importantDates, setTab } =
    useCloseby();
  const specialsOnDay = (day: string) =>
    importantDates.filter((event) => importantDateOnDay(event, day));
  const [selected, setSelected] = useState(date);
  const [month, setMonth] = useState(() => new Date(date + 'T12:00:00'));
  const cells = monthCells(month.getFullYear(), month.getMonth());
  const dailyPlans = plans
    .map((plan, index) => ({ ...plan, index }))
    .filter((plan) => plan.date === selected)
    .sort((a, b) => (a.time ?? '').localeCompare(b.time ?? ''));
  const move = (amount: number) => {
    const next = new Date(month.getFullYear(), month.getMonth() + amount, 1);
    setMonth(next);
    setSelected(
      `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-01`,
    );
  };
  const format = (value: string) =>
    new Date(value + 'T12:00:00').toLocaleDateString('en', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  return (
    <>
      <div className="eyebrow">{TEXT.calendarEyebrow}</div>
      <h1>
        {TEXT.calendarTitle}
        <br />
        <i>{TEXT.calendarSubtitle}</i>
      </h1>
      <p className="intro">{TEXT.calendarIntro}</p>
      <section className="calendar-card">
        <div className="monthbar">
          <button aria-label={TEXT.previous} onClick={() => move(-1)}>
            <ChevronLeft size={20} />
          </button>
          <h3>
            {month.toLocaleDateString('en', { month: 'long', year: 'numeric' })}
          </h3>
          <button aria-label={TEXT.next} onClick={() => move(1)}>
            <ChevronRight size={20} />
          </button>
        </div>
        <button
          className="textlink"
          onClick={() => {
            setSelected(date);
            setMonth(new Date(date + 'T12:00:00'));
          }}
        >
          {TEXT.today}
        </button>
        <div className="calendar-grid">
          <div className="calendar-weekdays">
            {TEXT.weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          {cells.map((day, index) =>
            day ? (
              <button
                key={day}
                className={
                  'calendar-day ' +
                  (day === selected ? 'picked ' : '') +
                  (day === date ? 'today' : '')
                }
                aria-label={`${format(day)}${plans.some((plan) => plan.date === day) || specialsOnDay(day).length ? ' · ' + TEXT.scheduled : ''}`}
                aria-pressed={day === selected}
                onClick={() => setSelected(day)}
              >
                <span>{Number(day.slice(-2))}</span>
                {(plans.some((plan) => plan.date === day) ||
                  specialsOnDay(day).length > 0) && <i />}
              </button>
            ) : (
              <span key={'empty-' + index} />
            ),
          )}
        </div>
      </section>
      <div className="sectiontitle">
        <h3>{format(selected)}</h3>
        <button aria-label={TEXT.add} onClick={() => openPlan(selected)}>
          <Plus size={21} />
        </button>
      </div>
      {specialsOnDay(selected).map((event) => (
        <button
          className="calendar-special"
          key={event.id}
          onClick={() => setTab(TAB_LABELS.relationship)}
        >
          <span>♡ {event.title}</span>
          <small>
            {SPACE_COPY.relationshipDate} · {SPACE_COPY.seeSpace}
          </small>
        </button>
      ))}
      {dailyPlans.length === 0 && specialsOnDay(selected).length === 0 ? (
        <p className="intro">{TEXT.empty}</p>
      ) : (
        dailyPlans.map((plan) => (
          <article className="calendar-event" key={plan.index}>
            <div>
              <h3>{plan.title}</h3>
              {plan.time && <small>{plan.time}</small>}
              {plan.notes && <p>{plan.notes}</p>}
            </div>
            <button
              aria-label={`${TEXT.edit}: ${plan.title}`}
              onClick={() => openPlan(plan.date, plan.index)}
            >
              <Pencil size={17} />
            </button>
            <button
              aria-label={`${TEXT.remove}: ${plan.title}`}
              onClick={() => removePlan(plan.index)}
            >
              <X size={17} />
            </button>
          </article>
        ))
      )}
      <button className="primary" onClick={() => openPlan(selected)}>
        <Plus size={18} />
        {TEXT.add}
      </button>
    </>
  );
}
