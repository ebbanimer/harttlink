import {
  CalendarDays,
  Compass,
  Heart,
  Home,
  MessageCircle,
} from 'lucide-react';
import { COPY, TAB_LABELS } from '../constants/copy';
import { useCloseby } from '../state/ClosebyProvider';
const tabs = [
  { name: TAB_LABELS.home, icon: Home },
  { name: TAB_LABELS.explore, icon: Compass },
  { name: TAB_LABELS.calendar, icon: CalendarDays },
  { name: TAB_LABELS.relationship, icon: Heart },
];
export function AppNavigation() {
  const { tab, setTab, setChat } = useCloseby();
  return (
    <>
      <button
        className="chatfloat"
        aria-label={COPY.accessibility.chat}
        onClick={() => setChat(true)}
      >
        <MessageCircle size={23} />
      </button>
      <nav>
        {tabs.map(({ name, icon: Icon }) => (
          <button
            className={tab === name ? 'selected' : ''}
            key={name}
            onClick={() => setTab(name)}
          >
            <Icon size={21} />
            <span>{name}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
