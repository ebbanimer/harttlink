import { Bell, ArrowUpRight } from 'lucide-react';
import { SPACE_COPY as TEXT } from '../constants/ourSpace';
import { TAB_LABELS } from '../constants/copy';
import { useCloseby } from '../state/ClosebyProvider';

export function ImportantDateReminder() {
  const { upcomingDates, setTab } = useCloseby();
  const due = upcomingDates.filter((event) => event.reminderDue);
  if (!due.length) return null;
  return (
    <button
      className="important-home-reminder"
      onClick={() => setTab(TAB_LABELS.relationship)}
    >
      <Bell size={18} />
      <span>
        <small>{TEXT.due}</small>
        {due.map((event) => (
          <strong key={event.id}>
            {event.title} ·{' '}
            {event.daysAway === 0
              ? TEXT.today
              : `${event.daysAway} ${TEXT.inDays}`}
          </strong>
        ))}
      </span>
      <ArrowUpRight size={17} />
    </button>
  );
}
