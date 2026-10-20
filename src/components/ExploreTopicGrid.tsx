import { ArrowUpRight } from 'lucide-react';
import type { ExploreTopic } from '../constants/explore';
import { EXPLORE_COPY } from '../constants/explore';
import type { TopicId } from '../types';

type Props = {
  topics: ExploreTopic[];
  onSelect: (id: TopicId) => void;
  count: (id: TopicId) => number;
};

export function ExploreTopicGrid({ topics, onSelect, count }: Props) {
  return (
    <div className="topic-grid">
      {topics.map((topic, index) => (
        <button
          className={'topic-tile topic-color-' + (index % 4)}
          key={topic.id}
          onClick={() => onSelect(topic.id)}
        >
          <span className="topic-icon" aria-hidden="true">
            {topic.icon}
          </span>
          <ArrowUpRight className="topic-arrow" size={17} />
          <strong>{topic.title}</strong>
          <span>{topic.description}</span>
          <small>
            {count(topic.id)} {EXPLORE_COPY.count}
          </small>
        </button>
      ))}
    </div>
  );
}
