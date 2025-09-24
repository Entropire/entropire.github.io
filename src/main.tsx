import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Routing } from './routing';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
        <Routing/>
    </HashRouter>
  </StrictMode>,
)
