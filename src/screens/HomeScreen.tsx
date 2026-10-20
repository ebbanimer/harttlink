import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  Heart,
  Sparkles,
} from 'lucide-react';
import { items, weeklyMoment } from '../constants/content';
import { COPY, TAB_LABELS } from '../constants/copy';
import { useCloseby } from '../state/ClosebyProvider';
import { AppreciationReminder } from '../components/AppreciationReminder';
import { ImportantDateReminder } from '../components/ImportantDateReminder';
import { PLANNING_COPY } from '../constants/planning';
import { upcomingPlans } from '../utils/planning';
export function HomeScreen() {
  const {
    profile,
    done,
    question,
    qid,
    saved,
    bookmark,
    open,
    setTab,
    toggleDiscussed,
    skipQuestion,
    plans,
    date,
  } = useCloseby();
  const nextPlan = upcomingPlans(plans, date)[0];

  return (
    <>
      <div className="eyebrow">{COPY.home.eyebrow}</div>
      <h1>
        {COPY.home.title}
        <br />
        <i>{COPY.home.subtitle}</i>
      </h1>
      <p className="intro">
        {COPY.home.intro} {profile.partner}.
      </p>
      <section className={'daily ' + (done ? 'completed' : '')}>
        <div className="cardtop">
          <span>
            <Sparkles size={15} /> {COPY.home.daily}
          </span>
          <span>{COPY.home.counter}</span>
        </div>
        <div className="lineart">
          <span>✳</span>
          <span>✳</span>
        </div>
        <h2>{done ? COPY.home.completedTitle : question}</h2>
        <p>{done ? COPY.home.completedBody : COPY.home.promptBody}</p>
        <button className="primary" onClick={toggleDiscussed}>
          <Check size={18} />
          {done ? COPY.home.discussed : COPY.home.discuss}
        </button>
        <div className="dailyactions">
          <button onClick={() => bookmark(qid)}>
            <Bookmark
              size={16}
              fill={saved.includes(qid) ? 'currentColor' : 'none'}
            />
            {saved.includes(qid) ? COPY.common.saved : COPY.common.saveLater}
          </button>
          <button onClick={skipQuestion}>
            {COPY.home.another}
            <ArrowRight size={15} />
          </button>
        </div>
      </section>
      <AppreciationReminder />
      <button className="next-date" onClick={() => setTab(TAB_LABELS.calendar)}>
        <span>
          <small>{PLANNING_COPY.upcoming}</small>
          <strong>{nextPlan?.title ?? PLANNING_COPY.noUpcoming}</strong>
          {nextPlan && (
            <em>
              {new Date(nextPlan.date + 'T12:00:00').toLocaleDateString('en', {
                month: 'short',
                day: 'numeric',
              })}
              {nextPlan.time ? ` · ${nextPlan.time}` : ''}
            </em>
          )}
        </span>
        <ArrowUpRight size={20} />
      </button>
      <ImportantDateReminder />
      <div className="sectiontitle">
        <h3>{COPY.home.suggestions}</h3>
        <button onClick={() => setTab(TAB_LABELS.explore)}>
          {TAB_LABELS.explore} <ArrowUpRight size={16} />
        </button>
      </div>
      <button
        className="feature"
        onClick={() => open(items.find((item) => item.id === 'walk')!)}
      >
        <span className="tile sage">🌿</span>
        <span>
          <small>{COPY.home.featureLabel}</small>
          <strong>{COPY.home.featureTitle}</strong>
          <em>{COPY.home.featureBody}</em>
        </span>
        <ArrowUpRight size={20} />
      </button>
      <button className="weekly" onClick={() => open(weeklyMoment)}>
        <span>
          <small>{COPY.home.weeklyLabel}</small>
          <strong>{COPY.home.weeklyTitle}</strong>
          <p>{COPY.home.weeklyBody}</p>
        </span>
        <Heart size={28} />
      </button>
      <p className="footer-note">
        {COPY.home.footer} <Heart size={12} />
      </p>
    </>
  );
}
