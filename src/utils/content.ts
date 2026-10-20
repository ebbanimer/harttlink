import { DAILY_PROMPT_PREFIX } from '../constants/config';
import { items, prompts, weeklyMoment } from '../constants/content';
import { COPY } from '../constants/copy';
import type { Item } from '../types';
export function getSavedContent(id: string): Item | undefined {
  const item = items.find((item) => item.id === id);
  if (item) return item;
  if (id === weeklyMoment.id) return weeklyMoment;
  if (id.startsWith(DAILY_PROMPT_PREFIX)) {
    const prompt = prompts[Number(id.slice(DAILY_PROMPT_PREFIX.length))];
    if (prompt)
      return {
        id,
        category: 'Questions',
        title: prompt,
        sub: COPY.relationship.savedSub,
        icon: '🤍',
        body: [prompt],
      };
  }
  return undefined;
}
