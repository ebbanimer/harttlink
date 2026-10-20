import { useState } from 'react';
import { X, Copy, Share2 } from 'lucide-react';
import { SHARE_COPY } from '../constants/sharing';
import { useCloseby } from '../state/ClosebyProvider';

export function PartnerShareSheet() {
  const { sharingText, setSharingText, notify } = useCloseby();
  const [manual, setManual] = useState(false);
  async function nativeShare() {
    try {
      await navigator.share({ title: 'Hartlink', text: sharingText });
    } catch (error) {
      if (!(error instanceof Error && error.name === 'AbortError'))
        setManual(true);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(sharingText);
      notify(SHARE_COPY.copied);
    } catch {
      setManual(true);
    }
  }
  return (
    <div className="overlay">
      <section className="sheet">
        <div className="modalbar">
          <h3>{SHARE_COPY.titleShare}</h3>
          <button
            aria-label={SHARE_COPY.close}
            onClick={() => setSharingText('')}
          >
            <X />
          </button>
        </div>
        <p className="intro">{SHARE_COPY.help}</p>
        <textarea
          className="share-message"
          aria-label={SHARE_COPY.message}
          readOnly
          value={sharingText}
          onFocus={(event) => event.currentTarget.select()}
        />
        {typeof navigator !== 'undefined' &&
          typeof navigator.share === 'function' && (
            <button className="primary" onClick={nativeShare}>
              <Share2 size={17} />
              {SHARE_COPY.native}
            </button>
          )}
        <button className="share" onClick={copy}>
          <Copy size={17} />
          {SHARE_COPY.copy}
        </button>
        {manual && (
          <p role="status" className="intro">
            {SHARE_COPY.manual}
          </p>
        )}
      </section>
    </div>
  );
}
