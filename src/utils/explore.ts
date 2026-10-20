import { items } from '../constants/content';
import type { Filter, TopicId } from '../types';

export function getExploreItems(
  filter: Filter,
  topic: TopicId | 'all' | null = null,
) {
  return items.filter(
    (item) =>
      (filter === 'All' || item.category === filter) &&
      (!topic || topic === 'all' || item.topics?.includes(topic)),
  );
}
