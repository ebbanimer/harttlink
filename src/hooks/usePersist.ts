import { useEffect, useState } from 'react';

/** Browser persistence adapter. Keep storage access here when changing platforms. */
export function usePersist<T>(
  key: string,
  initial: T,
  decode?: (value: unknown) => T,
) {
  const [value, set] = useState<T>(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(key) || 'null');
      if (stored === null) return initial;
      return decode ? decode(stored) : (stored as T);
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Keep the app usable when the browser blocks storage or its quota is full.
    }
  }, [key, value]);
  return [value, set] as const;
}
