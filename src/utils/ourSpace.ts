import {
  DEFAULT_REMINDER_DAYS,
  MONTH_NAMES,
  SPACE_COPY,
} from '../constants/ourSpace';
import type { ImportantDate, Memory, Profile, UpcomingDate } from '../types';

export function monthDay(value: string): string | null {
  const iso = value.match(/^(?:\d{4}-)?(\d{2})-(\d{2})$/);
  let month: number, day: number;
  if (iso) {
    month = Number(iso[1]);
    day = Number(iso[2]);
  } else {
    const words = value
      .trim()
      .toLowerCase()
      .match(/^([a-z]+)\s+(\d{1,2})$/);
    if (!words) return null;
    month = MONTH_NAMES.indexOf(words[1]) + 1;
    day = Number(words[2]);
  }
  const date = new Date(Date.UTC(2000, month - 1, day));
  if (
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day ||
    month < 1 ||
    month > 12
  )
    return null;
  return `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
export function annualDate(value: string, year: number) {
  const part = monthDay(value);
  if (!part) return null;
  // Celebrate February 29 on February 28 in non-leap years.
  if (part === '02-29' && new Date(Date.UTC(year, 1, 29)).getUTCMonth() !== 1)
    return `${year}-02-28`;
  return `${year}-${part}`;
}
function dayNumber(value: string) {
  return Date.parse(value + 'T00:00:00Z') / 86400000;
}
export function buildImportantDates(
  profile: Profile,
  custom: ImportantDate[],
): ImportantDate[] {
  const result: ImportantDate[] = [
    {
      id: 'anniversary',
      title: SPACE_COPY.anniversary,
      date: profile.since,
      annual: true,
    },
    ...custom,
  ];
  const birthday = monthDay(profile.birthday);
  if (birthday)
    result.push({
      id: 'partner-birthday',
      title: profile.partner + SPACE_COPY.birthday,
      date: '2000-' + birthday,
      annual: true,
    });
  return result;
}
export function upcomingImportantDates(
  events: ImportantDate[],
  today: string,
  preferences: Record<string, number[]>,
): UpcomingDate[] {
  const year = Number(today.slice(0, 4));
  return events
    .flatMap((event) => {
      let nextDate = event.annual ? annualDate(event.date, year) : event.date;
      if (!nextDate || !Number.isFinite(dayNumber(nextDate))) return [];
      if (event.annual && nextDate < today)
        nextDate = annualDate(event.date, year + 1);
      if (!nextDate || nextDate < today) return [];
      const daysAway = dayNumber(nextDate) - dayNumber(today);
      return [
        {
          ...event,
          nextDate,
          daysAway,
          reminderDue: (
            preferences[event.id] ?? DEFAULT_REMINDER_DAYS
          ).includes(daysAway),
        },
      ];
    })
    .sort((a, b) => a.nextDate.localeCompare(b.nextDate));
}
export function importantDateOnDay(event: ImportantDate, day: string) {
  return event.annual
    ? annualDate(event.date, Number(day.slice(0, 4))) === day
    : event.date === day;
}
export function sortedMemories(memories: Memory[]) {
  const key = (memory: Memory) =>
    memory.occurredOn ??
    (() => {
      const [month, year] = memory.date.toLowerCase().split(' ');
      const index = MONTH_NAMES.indexOf(month);
      return index >= 0 && /^\d{4}$/.test(year)
        ? `${year}-${String(index + 1).padStart(2, '0')}-01`
        : '';
    })();
  return memories
    .map((memory, index) => ({ ...memory, index }))
    .sort((a, b) => key(b).localeCompare(key(a)));
}
