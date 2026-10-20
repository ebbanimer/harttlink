import { createContext, useContext, type ReactNode } from 'react';
import { useClosebyState } from '../hooks/useClosebyState';
type ClosebyState = ReturnType<typeof useClosebyState>;
const ClosebyContext = createContext<ClosebyState | null>(null);
export function ClosebyProvider({ children }: { children: ReactNode }) {
  const state = useClosebyState();
  return (
    <ClosebyContext.Provider value={state}>{children}</ClosebyContext.Provider>
  );
}
export function useCloseby() {
  const state = useContext(ClosebyContext);
  if (!state) throw new Error('useCloseby must be used within ClosebyProvider');
  return state;
}
