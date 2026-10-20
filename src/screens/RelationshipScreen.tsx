import { ImportantDates } from '../components/ImportantDates';
import { PartnerFavorites } from '../components/PartnerFavorites';
import { MemoryTimeline } from '../components/MemoryTimeline';
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Calendar,
  Heart,
  MoreHorizontal,
  Plus,
  X,
} from 'lucide-react';
import { COPY } from '../constants/copy';
import { useCloseby } from '../state/ClosebyProvider';
import { getSavedContent } from '../utils/content';
export function RelationshipScreen() {
  const { profile, years, setForm, memories, plans, removePlan, saved, open } =
    useCloseby();

  return (
    <>
      <div className="eyebrow">{COPY.relationship.eyebrow}</div>
      <div className="titleRow">
        <h1>
          {COPY.relationship.title}
          <br />
          <i>{COPY.relationship.subtitle}</i>
        </h1>
        <button
          className="iconbutton"
          aria-label={COPY.accessibility.editRelationship}
          onClick={() => setForm('profile')}
        >
          <MoreHorizontal />
        </button>
      </div>
      <section className="friendhero">
        <div className="pair">
          <span>{profile.you[0]}</span>
          <Heart size={23} />
          <span>{profile.partner[0]}</span>
        </div>
        <h2>
          {profile.you} & {profile.partner}
        </h2>
        <p>
          {years} {COPY.relationship.years}
        </p>
        <small>
          {COPY.common.since}{' '}
          {new Date(profile.since + 'T12:00:00').toLocaleDateString('en', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </small>
      </section>
      <ImportantDates />
      <div className="sectiontitle">
        <h3>{COPY.relationship.story}</h3>
        <button onClick={() => setForm('profile')}>
          {COPY.common.edit}
          <ArrowUpRight size={15} />
        </button>
      </div>
      <p className="story">{profile.story}</p>
      <PartnerFavorites />
      <MemoryTimeline />
      <div className="sectiontitle">
        <h3>{COPY.relationship.plans}</h3>
        <button
          aria-label={COPY.accessibility.plan}
          onClick={() => setForm('plan')}
        >
          <Plus size={20} />
        </button>
      </div>
      {plans.map((p, n) => (
        <div className="plan" key={n}>
          <Calendar size={22} />
          <span>
            <strong>{p.title}</strong>
            <small>
              {new Date(p.date + 'T12:00:00').toLocaleDateString('en', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </small>
          </span>
          <button
            aria-label={COPY.common.remove + ' ' + p.title}
            onClick={() => removePlan(n)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <div className="sectiontitle">
        <h3>{COPY.relationship.saved}</h3>
        <Bookmark size={18} />
      </div>
      {saved.length === 0 ? (
        <p className="intro">{COPY.relationship.empty}</p>
      ) : (
        saved.map((id) => {
          const content = getSavedContent(id);
          if (!content) return null;
          return (
            <button key={id} className="savedrow" onClick={() => open(content)}>
              <Bookmark size={16} />
              <span>{content.title}</span>
              <ArrowRight size={16} />
            </button>
          );
        })
      )}
    </>
  );
}
