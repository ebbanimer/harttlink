import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Leaf } from 'lucide-react';
import { ContentCard } from '../components/ContentCard';
import { ExploreTopicGrid } from '../components/ExploreTopicGrid';
import { FunnyQuestion } from '../components/FunnyQuestion';
import { categories } from '../constants/content';
import { COPY } from '../constants/copy';
import { exploreTopics, EXPLORE_COPY as TEXT } from '../constants/explore';
import { useCloseby } from '../state/ClosebyProvider';
import type { TopicId } from '../types';
import { getExploreItems } from '../utils/explore';
import { SHUFFLE_COPY } from '../constants/shuffleQuestions';

export function ExploreScreen() {
  const { filter, setFilter, saved, bookmark, open } = useCloseby();
  const [topic, setTopic] = useState<TopicId | 'all' | null>(null);
  const topics = filter === 'All' ? undefined : exploreTopics[filter];
  const selectedTopic = topics?.find((item) => item.id === topic);
  const browsingTopics = Boolean(topics && topic === null);
  const visibleItems = getExploreItems(filter, topic);

  return (
    <>
      <div className="eyebrow">{COPY.explore.eyebrow}</div>
      <h1>
        {COPY.explore.title}
        <br />
        <i>{COPY.explore.subtitle}</i>
      </h1>
      <p className="intro">
        {filter === 'Date ideas'
          ? TEXT.dateIntro
          : filter === 'Questions'
            ? TEXT.questionIntro
            : filter === 'Quizzes'
              ? TEXT.quizIntro
              : filter === 'Shuffle questions'
                ? SHUFFLE_COPY.intro
                : COPY.explore.intro}
      </p>
      <div className="chips">
        {categories.map((category) => (
          <button
            className={filter === category ? 'active' : ''}
            key={category}
            onClick={() => {
              setFilter(category);
              setTopic(null);
            }}
          >
            {category}
          </button>
        ))}
      </div>
      {filter === 'All' && (
        <div className="browse-gateways">
          {(
            ['Date ideas', 'Questions', 'Quizzes', 'Shuffle questions'] as const
          ).map((category) => (
            <button
              key={category}
              onClick={() => {
                setFilter(category);
                setTopic(null);
              }}
            >
              <span>
                <small>{TEXT.gatewayHints[category]}</small>
                <strong>{category}</strong>
              </span>
              <ArrowUpRight size={19} />
            </button>
          ))}
        </div>
      )}
      {filter === 'Shuffle questions' ? (
        <FunnyQuestion />
      ) : browsingTopics && topics ? (
        <>
          <div className="sectiontitle">
            <h3>
              {filter === 'Date ideas' ? TEXT.chooseDate : TEXT.chooseQuestion}
            </h3>
          </div>
          <ExploreTopicGrid
            topics={topics}
            onSelect={setTopic}
            count={(id) => getExploreItems(filter, id).length}
          />
          <button className="share" onClick={() => setTopic('all')}>
            {TEXT.all}
            <ArrowUpRight size={16} />
          </button>
        </>
      ) : (
        <>
          {topics && (
            <>
              <button className="topic-back" onClick={() => setTopic(null)}>
                <ArrowLeft size={16} />
                {TEXT.back}
              </button>
              <div className="chips topic-chips">
                <button
                  className={topic === 'all' ? 'active' : ''}
                  onClick={() => setTopic('all')}
                >
                  {TEXT.all}
                </button>
                {topics.map((item) => (
                  <button
                    key={item.id}
                    className={topic === item.id ? 'active' : ''}
                    onClick={() => setTopic(item.id)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </>
          )}
          <div className="explorelead">
            <span>{selectedTopic?.title ?? COPY.explore.lead}</span>
            <Leaf size={19} />
          </div>
          <div className="feed">
            {visibleItems.map((item, index) => (
              <ContentCard
                key={item.id}
                item={item}
                colorIndex={index}
                isSaved={saved.includes(item.id)}
                onOpen={open}
                onBookmark={bookmark}
              />
            ))}
          </div>
          {visibleItems.length === 0 && <p className="intro">{TEXT.empty}</p>}
        </>
      )}
    </>
  );
}
