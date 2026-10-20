import { useState } from 'react';
import { Bell, Plus, Pencil, X } from 'lucide-react';
import {
  SPACE_COPY as TEXT,
  DEFAULT_REMINDER_DAYS,
} from '../constants/ourSpace';
import { useCloseby } from '../state/ClosebyProvider';
import type { ImportantDate } from '../types';
import { monthDay } from '../utils/ourSpace';

export function ImportantDates() {
  const {
    upcomingDates,
    customDates,
    setCustomDates,
    reminderPreferences,
    setReminderPreferences,
    setForm,
    date,
    profile,
  } = useCloseby();
  const [editing, setEditing] = useState<ImportantDate | null>(null);
  const [adding, setAdding] = useState(false);
  const close = () => {
    setAdding(false);
    setEditing(null);
  };
  return (
    <section>
      <div className="sectiontitle">
        <h3>{TEXT.upcoming}</h3>
        <button
          onClick={() => {
            setEditing(null);
            setAdding(true);
          }}
          aria-label={TEXT.addDate}
        >
          <Plus size={20} />
        </button>
      </div>
      <p className="privatehint">{TEXT.reminderHint}</p>
      {!monthDay(profile.birthday) && (
        <button className="textlink" onClick={() => setForm('profile')}>
          {TEXT.setBirthday}
        </button>
      )}
      {upcomingDates.map((event) => (
        <article
          className={
            'important-date ' + (event.reminderDue ? 'reminder-due' : '')
          }
          key={event.id}
        >
          <div className="important-date-heading">
            <span>
              <strong>{event.title}</strong>
              <small>
                {new Date(event.nextDate + 'T12:00:00').toLocaleDateString(
                  'en',
                  { month: 'long', day: 'numeric', year: 'numeric' },
                )}{' '}
                ·{' '}
                {event.daysAway === 0
                  ? TEXT.today
                  : event.daysAway === 1
                    ? TEXT.tomorrow
                    : `${event.daysAway} ${TEXT.inDays}`}
              </small>
            </span>
            <button
              aria-label={`${TEXT.editDate}: ${event.title}`}
              onClick={() => {
                const custom = customDates.find((item) => item.id === event.id);
                if (custom) {
                  setEditing(custom);
                  setAdding(true);
                } else setForm('profile');
              }}
            >
              <Pencil size={16} />
            </button>
          </div>
          {event.reminderDue && (
            <p className="date-reminder-label">
              <Bell size={13} />
              {TEXT.dueToday}
            </p>
          )}
          <details>
            <summary>{TEXT.reminder}</summary>
            {[7, 0].map((days) => (
              <label className="reminder-setting" key={days}>
                <input
                  type="checkbox"
                  checked={(
                    reminderPreferences[event.id] ?? DEFAULT_REMINDER_DAYS
                  ).includes(days)}
                  onChange={(eventChange) =>
                    setReminderPreferences((previous) => {
                      const values =
                        previous[event.id] ?? DEFAULT_REMINDER_DAYS;
                      return {
                        ...previous,
                        [event.id]: eventChange.target.checked
                          ? [...values.filter((value) => value !== days), days]
                          : values.filter((value) => value !== days),
                      };
                    })
                  }
                />
                {days === 7 ? TEXT.week : TEXT.day}
              </label>
            ))}
          </details>
        </article>
      ))}
      <details className="manage-dates">
        <summary>{TEXT.manageDates}</summary>
        {customDates.map((event) => (
          <div className="saved-date-row" key={event.id}>
            <span>{event.title}</span>
            <button
              aria-label={`${TEXT.editDate}: ${event.title}`}
              onClick={() => {
                setEditing(event);
                setAdding(true);
              }}
            >
              <Pencil size={15} />
            </button>
            <button
              aria-label={`${TEXT.remove}: ${event.title}`}
              onClick={() =>
                setCustomDates((previous) =>
                  previous.filter((item) => item.id !== event.id),
                )
              }
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </details>
      {adding && (
        <form
          className="editform space-inline-form"
          key={editing?.id ?? 'new'}
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const next: ImportantDate = {
              id: editing?.id ?? crypto.randomUUID(),
              title: String(data.get('title')).trim(),
              date: String(data.get('date')),
              annual: data.get('annual') === 'on',
            };
            if (!next.title) return;
            setCustomDates((previous) =>
              editing
                ? previous.map((item) => (item.id === editing.id ? next : item))
                : [...previous, next],
            );
            close();
          }}
        >
          <h3>{editing ? TEXT.editDate : TEXT.addDate}</h3>
          <label>
            {TEXT.title}
            <input
              name="title"
              required
              maxLength={100}
              defaultValue={editing?.title ?? ''}
            />
          </label>
          <label>
            {TEXT.date}
            <input
              name="date"
              type="date"
              required
              defaultValue={editing?.date ?? date}
            />
          </label>
          <label className="reminder-setting">
            <input
              type="checkbox"
              name="annual"
              defaultChecked={editing?.annual ?? true}
            />
            {TEXT.annual}
          </label>
          <button className="primary">{TEXT.save}</button>
          <button type="button" className="textlink" onClick={close}>
            {TEXT.cancel}
          </button>
        </form>
      )}
    </section>
  );
}
