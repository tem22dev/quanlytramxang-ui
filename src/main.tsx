import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import { geekblue } from '@ant-design/colors';
import { App as AntdApp } from 'antd';

import '../public/styles.css';
import App from './App.tsx';
import GlobalStyles from './components/GlobalStyles/GlobalStyles.ts';
import { persistor, store } from './redux/store';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ConfigProvider theme={{ token: { colorPrimary: geekblue[5] } }}>
                    <AntdApp>
                        <GlobalStyles>
                            <App />
                        </GlobalStyles>
                    </AntdApp>
                </ConfigProvider>
            </PersistGate>
        </Provider>
    </StrictMode>,
);
