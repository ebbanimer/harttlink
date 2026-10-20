import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { COPY } from '../constants/copy';
import { ASSISTANT_COPY } from '../constants/assistant';
import { useCloseby } from '../state/ClosebyProvider';
export function ChatSheet() {
  const { setChat, messages, draft, setDraft, sendMessage } = useCloseby();

  return (
    <div className="overlay">
      <section className="sheet chatsheet">
        <div className="modalbar">
          <button
            aria-label={COPY.accessibility.closeChat}
            onClick={() => setChat(false)}
          >
            <ArrowLeft />
          </button>
          <strong>{ASSISTANT_COPY.title}</strong>
          <span className="avatar smallavatar">
            <Sparkles size={18} />
          </span>
        </div>
        <p className="chatnotice">{ASSISTANT_COPY.notice}</p>
        <p className="privatehint">{ASSISTANT_COPY.intro}</p>
        <div className="messages">
          {messages.map((m, n) => (
            <div key={n} className={'bubble ' + (m.who === 'me' ? 'mine' : '')}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="assistant-suggestions">
          {ASSISTANT_COPY.suggestions.map((suggestion) => (
            <button key={suggestion} onClick={() => setDraft(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
        <form
          className="composer"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            aria-label={COPY.accessibility.message}
            placeholder={ASSISTANT_COPY.placeholder}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button aria-label={COPY.accessibility.send} disabled={!draft.trim()}>
            <Send size={20} />
          </button>
        </form>
      </section>
    </div>
  );
}
