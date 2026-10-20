import { ASSISTANT_COPY } from '../constants/assistant';

/** Offline prototype adapter. Replace with a server-side AI endpoint for live chat. */
export function getDemoReply(message: string): string {
  if (/date|dinner|weekend|activity|adventure/i.test(message))
    return ASSISTANT_COPY.date;
  if (/gesture|sweet|appreciat|love|service|gift|care/i.test(message))
    return ASSISTANT_COPY.gesture;
  if (/talk|conversation|argu|disagree|listen|upset|communicat/i.test(message))
    return ASSISTANT_COPY.conversation;
  return ASSISTANT_COPY.fallback;
}
