import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ClosebyProvider } from './state/ClosebyProvider';
import './style.css';
createRoot(document.getElementById('root')!).render(
  <ClosebyProvider>
    <App />
  </ClosebyProvider>,
);
