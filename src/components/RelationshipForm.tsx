import { Check, X } from 'lucide-react';
import { MAX_PHOTO_BYTES } from '../constants/config';
import { COPY } from '../constants/copy';
import { PLANNING_COPY } from '../constants/planning';
import { SPACE_COPY } from '../constants/ourSpace';
import { useCloseby } from '../state/ClosebyProvider';
export function RelationshipForm() {
  const {
    form,
    closeForm,
    submit,
    profile,
    planTitle,
    date,
    photo,
    setPhoto,
    notify,
    planDate,
    editingPlanIndex,
    plans,
    editingMemoryIndex,
    memories,
  } = useCloseby();

  return (
    <div className="overlay">
      <section className="sheet">
        <div className="modalbar">
          <h3>
            {form === 'profile'
              ? COPY.form.profileTitle
              : form === 'plan'
                ? editingPlanIndex === null
                  ? PLANNING_COPY.add
                  : PLANNING_COPY.edit
                : editingMemoryIndex === null
                  ? COPY.form.memoryTitle
                  : SPACE_COPY.editMoment}
          </h3>
          <button aria-label={COPY.accessibility.closeForm} onClick={closeForm}>
            <X />
          </button>
        </div>
        <form className="editform" onSubmit={submit}>
          {form === 'profile' ? (
            <>
              {[
                ['you', COPY.form.you, profile.you],
                ['partner', COPY.form.partner, profile.partner],
                ['since', COPY.form.since, profile.since],
                ['birthday', COPY.form.birthday, profile.birthday],
                ['likes', COPY.form.likes, profile.likes],
                ['story', COPY.form.story, profile.story],
              ].map(([name, label, value]) => (
                <label key={name}>
                  {label}
                  {name === 'story' ? (
                    <textarea name={name} defaultValue={value} required />
                  ) : (
                    <input
                      name={name}
                      type={name === 'since' ? 'date' : 'text'}
                      defaultValue={value}
                      required={name !== 'birthday'}
                    />
                  )}
                </label>
              ))}
            </>
          ) : (
            <>
              <label>
                {form === 'plan' ? COPY.form.plan : COPY.form.memory}
                <input
                  name="title"
                  defaultValue={
                    form === 'plan'
                      ? planTitle
                      : editingMemoryIndex === null
                        ? ''
                        : (memories[editingMemoryIndex]?.title ?? '')
                  }
                  required
                  maxLength={100}
                />
              </label>
              {form === 'plan' ? (
                <>
                  <label>
                    {COPY.form.when}
                    <input
                      type="date"
                      name="date"
                      defaultValue={planDate}
                      required
                    />
                  </label>
                  <label>
                    {PLANNING_COPY.time}
                    <input
                      type="time"
                      name="time"
                      defaultValue={
                        editingPlanIndex === null
                          ? ''
                          : (plans[editingPlanIndex]?.time ?? '')
                      }
                    />
                  </label>
                  <label>
                    {PLANNING_COPY.notes}
                    <textarea
                      name="notes"
                      maxLength={700}
                      defaultValue={
                        editingPlanIndex === null
                          ? ''
                          : (plans[editingPlanIndex]?.notes ?? '')
                      }
                    />
                  </label>
                </>
              ) : (
                <>
                  <label>
                    {SPACE_COPY.kind}
                    <select
                      name="kind"
                      defaultValue={
                        editingMemoryIndex === null
                          ? 'memory'
                          : (memories[editingMemoryIndex]?.kind ?? 'memory')
                      }
                    >
                      <option value="memory">{SPACE_COPY.memory}</option>
                      <option value="milestone">{SPACE_COPY.milestone}</option>
                    </select>
                  </label>
                  <label>
                    {SPACE_COPY.happened}
                    <input
                      name="occurredOn"
                      type="date"
                      required={editingMemoryIndex === null}
                      defaultValue={
                        editingMemoryIndex === null
                          ? date
                          : (memories[editingMemoryIndex]?.occurredOn ?? '')
                      }
                    />
                  </label>
                  <label>
                    {COPY.form.note}
                    <textarea
                      name="note"
                      required
                      maxLength={700}
                      defaultValue={
                        editingMemoryIndex === null
                          ? ''
                          : (memories[editingMemoryIndex]?.note ?? '')
                      }
                    />
                  </label>
                  <label>
                    {COPY.form.photo}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > MAX_PHOTO_BYTES) {
                            notify(COPY.notifications.photoSize);
                            return;
                          }
                          const r = new FileReader();
                          r.onload = () => setPhoto(String(r.result));
                          r.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <input type="hidden" name="photo" value={photo} />
                </>
              )}
            </>
          )}
          <button className="primary" type="submit">
            <Check size={18} />{' '}
            {form === 'plan'
              ? editingPlanIndex === null
                ? PLANNING_COPY.save
                : PLANNING_COPY.update
              : `${COPY.common.save} ${form === 'profile' ? COPY.form.changes : form}`}
          </button>
        </form>
      </section>
    </div>
  );
}
