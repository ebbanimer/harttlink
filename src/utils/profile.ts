import { initialProfile } from '../constants/sampleData';
import type { Profile } from '../types';

/** Keep existing profile edits when upgrading the friendship prototype. */
export function migrateProfile(value: unknown): Profile {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    return initialProfile;
  const stored = value as Record<string, unknown>;
  const text = (key: string, fallback: string) =>
    typeof stored[key] === 'string' ? (stored[key] as string) : fallback;
  return {
    you: text('you', initialProfile.you),
    partner: text('partner', text('friend', initialProfile.partner)),
    since: text('since', initialProfile.since),
    birthday: text('birthday', initialProfile.birthday),
    likes: text('likes', initialProfile.likes),
    story: text('story', initialProfile.story),
  };
}
