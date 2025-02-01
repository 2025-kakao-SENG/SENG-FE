// import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import {Provider} from 'react-redux';
import {persistor, store} from '@/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Router from '@/router/Router';
import {ThemeProvider} from '@/constants/ThemeProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <CookiesProvider>
                    <ThemeProvider>
                        <BrowserRouter>
                            <Router />
                        </BrowserRouter>
                    </ThemeProvider>
                </CookiesProvider>
            </PersistGate>
        </Provider>
    </StrictMode>,
);
