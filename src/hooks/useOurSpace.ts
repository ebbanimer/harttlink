import { usePersist } from './usePersist';
import { buildImportantDates, upcomingImportantDates } from '../utils/ourSpace';
import type { ImportantDate, PartnerFavorites, Profile } from '../types';

export function useOurSpace(profile: Profile, today: string) {
  const [customDates, setCustomDates] = usePersist<ImportantDate[]>(
    'hartlink-important-dates',
    [],
  );
  const [reminderPreferences, setReminderPreferences] = usePersist<
    Record<string, number[]>
  >('hartlink-date-reminders', {});
  const [partnerFavorites, setPartnerFavorites] = usePersist<PartnerFavorites>(
    'hartlink-partner-favorites',
    { treats: '', timeTogether: '', giftIdeas: '', notes: '' },
  );
  const importantDates = buildImportantDates(profile, customDates);
  const upcomingDates = upcomingImportantDates(
    importantDates,
    today,
    reminderPreferences,
  );
  return {
    customDates,
    setCustomDates,
    reminderPreferences,
    setReminderPreferences,
    partnerFavorites,
    setPartnerFavorites,
    importantDates,
    upcomingDates,
  };
}
