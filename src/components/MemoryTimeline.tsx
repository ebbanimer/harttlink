import { Plus, Pencil, X, Flag } from 'lucide-react';
import { SPACE_COPY as TEXT } from '../constants/ourSpace';
import { useCloseby } from '../state/ClosebyProvider';
import { sortedMemories } from '../utils/ourSpace';

export function MemoryTimeline() {
  const { memories, openMemory, removeMemory } = useCloseby();
  return (
    <section>
      <div className="sectiontitle">
        <h3>{TEXT.timeline}</h3>
        <button aria-label={TEXT.addMoment} onClick={() => openMemory()}>
          <Plus size={21} />
        </button>
      </div>
      {memories.length === 0 && <p className="intro">{TEXT.emptyTimeline}</p>}
      <div className="memory-timeline">
        {sortedMemories(memories).map((memory) => (
          <article
            className={
              'timeline-entry ' +
              (memory.kind === 'milestone' ? 'is-milestone' : '')
            }
            key={memory.index}
          >
            <span className="timeline-dot" />
            <div className="timeline-meta">
              <small>
                {memory.occurredOn
                  ? new Date(
                      memory.occurredOn + 'T12:00:00',
                    ).toLocaleDateString('en', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : memory.date}
              </small>
              <span>
                <button
                  aria-label={`${TEXT.editMoment}: ${memory.title}`}
                  onClick={() => openMemory(memory.index)}
                >
                  <Pencil size={15} />
                </button>
                <button
                  aria-label={`${TEXT.removeMoment}: ${memory.title}`}
                  onClick={() => removeMemory(memory.index)}
                >
                  <X size={15} />
                </button>
              </span>
            </div>
            {memory.kind === 'milestone' && (
              <small className="milestone-label">
                <Flag size={12} />
                {TEXT.milestone}
              </small>
            )}
            {memory.photo && <img src={memory.photo} alt={memory.title} />}
            <h3>
              {!memory.photo && <span aria-hidden="true">{memory.emoji} </span>}
              {memory.title}
            </h3>
            <p>{memory.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
