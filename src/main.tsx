import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../public/styles.css';
import App from './App.tsx';
import GlobalStyles from './components/GlobalStyles/GlobalStyles.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </StrictMode>,
);
