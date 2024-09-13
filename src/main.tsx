import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { geekblue } from '@ant-design/colors';

import '../public/styles.css';
import App from './App.tsx';
import GlobalStyles from './components/GlobalStyles/GlobalStyles.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider theme={{ token: { colorPrimary: geekblue[5] } }}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </ConfigProvider>
    </StrictMode>,
);
