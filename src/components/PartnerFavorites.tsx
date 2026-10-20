import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { SPACE_COPY as TEXT } from '../constants/ourSpace';
import { useCloseby } from '../state/ClosebyProvider';
import type { PartnerFavorites as Favorites } from '../types';

const fields = ['treats', 'timeTogether', 'giftIdeas', 'notes'] as const;
export function PartnerFavorites() {
  const { partnerFavorites, setPartnerFavorites, profile } = useCloseby();
  const [editing, setEditing] = useState(false);
  return (
    <section>
      <div className="sectiontitle">
        <h3>{TEXT.favorites}</h3>
        <button
          aria-label={TEXT.editFavorites}
          onClick={() => setEditing(!editing)}
        >
          <Pencil size={17} />
        </button>
      </div>
      <p className="intro">{TEXT.favoritesHint}</p>
      {editing ? (
        <form
          className="editform space-inline-form"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            setPartnerFavorites(
              Object.fromEntries(
                fields.map((field) => [field, String(data.get(field)).trim()]),
              ) as Favorites,
            );
            setEditing(false);
          }}
        >
          {fields.map((field) => (
            <label key={field}>
              {TEXT[field]}
              <textarea
                name={field}
                maxLength={700}
                defaultValue={partnerFavorites[field]}
              />
            </label>
          ))}
          <button className="primary">{TEXT.saveFavorites}</button>
          <button
            type="button"
            className="textlink"
            onClick={() => setEditing(false)}
          >
            {TEXT.cancel}
          </button>
        </form>
      ) : (
        <div className="favorites-card">
          <h3>{profile.partner}</h3>
          <p>{profile.likes}</p>
          {fields
            .filter((field) => partnerFavorites[field])
            .map((field) => (
              <div key={field}>
                <small>{TEXT[field]}</small>
                <p>{partnerFavorites[field]}</p>
              </div>
            ))}
          {!fields.some((field) => partnerFavorites[field]) && (
            <button className="textlink" onClick={() => setEditing(true)}>
              {TEXT.addFavorites}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
