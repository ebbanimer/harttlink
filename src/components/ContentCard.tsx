import { Bookmark } from 'lucide-react';
import { COPY } from '../constants/copy';
import type { Item } from '../types';

type ContentCardProps = {
  item: Item;
  colorIndex: number;
  isSaved: boolean;
  onOpen: (item: Item) => void;
  onBookmark: (id: string) => void;
};

export function ContentCard({
  item,
  colorIndex,
  isSaved,
  onOpen,
  onBookmark,
}: ContentCardProps) {
  return (
    <article className="contentcard">
      <button
        className={'art art' + (colorIndex % 4)}
        onClick={() => onOpen(item)}
        aria-label={`${COPY.common.open} ${item.title}`}
      >
        <span>{item.icon}</span>
        <small>{item.category}</small>
      </button>
      <div className="contentinfo">
        <button className="cardtext" onClick={() => onOpen(item)}>
          <h3>{item.title}</h3>
          <p>{item.sub}</p>
        </button>
        <button
          className="iconbutton"
          aria-label={`${COPY.common.save} ${item.title}`}
          onClick={() => onBookmark(item.id)}
        >
          <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
    </article>
  );
}
