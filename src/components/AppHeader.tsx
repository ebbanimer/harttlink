import { COPY, TAB_LABELS } from '../constants/copy';
import { useCloseby } from '../state/ClosebyProvider';
import { CircleHelp } from 'lucide-react';
import { EXCHANGE_COPY } from '../constants/exchanges';
import { questionNeedsReply } from '../utils/exchanges';
export function AppHeader() {
  const {
    profile,
    setTab,
    exchanges,
    questionPerson,
    setQuestionInbox,
    setSelectedQuestionId,
  } = useCloseby();
  const pending = exchanges.filter((item) =>
    questionNeedsReply(item, questionPerson),
  ).length;
  return (
    <header>
      <button className="brand" onClick={() => setTab(TAB_LABELS.home)}>
        {COPY.common.brand}
        <span>✳</span>
      </button>
      <div className="header-actions">
        <button
          className="header-inbox"
          aria-label={EXCHANGE_COPY.open}
          onClick={() => {
            setSelectedQuestionId(null);
            setQuestionInbox(true);
          }}
        >
          <CircleHelp size={21} />
          {pending > 0 && <span className="inbox-badge">{pending}</span>}
        </button>
        <button
          className="avatar"
          aria-label={COPY.accessibility.relationship}
          onClick={() => setTab(TAB_LABELS.relationship)}
        >
          {profile.you[0]}
          <span>{profile.partner[0]}</span>
        </button>
      </div>
    </header>
  );
}
