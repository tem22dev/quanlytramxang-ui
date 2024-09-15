import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import { privateRoutes, publicRoutes } from './routes';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import { getAccount } from './services/authServices';
import { useAppDispatch, useAppSelector } from './hooks';
import { doGetAccount } from './redux/account/accountSlice';
import Loading from './components/Loading';

function App() {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.account.isAuthenticated);

    if (isAuthenticated && window.location.pathname === '/login') {
        window.location.replace('/');
    }

    const fetchAccount = async () => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
            return;
        }

        const result = await getAccount();

        if (result.status === 200 && result.data) {
            dispatch(doGetAccount(result.data.user));
        }
    };

    useEffect(() => {
        fetchAccount();
    }, []);

    return (
        <>
            {isAuthenticated === true || window.location.pathname === '/login' ? (
                <Router>
                    <div className="app">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                let Layout = route.layout;

                                if (route.layout === null) {
                                    Layout = Fragment;
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}

                            {privateRoutes.map((route, index) => {
                                const Page = route.component;
                                let Layout = route.layout;

                                if (route.layout === null) {
                                    Layout = Fragment;
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <ProtectedRoute>
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            </ProtectedRoute>
                                        }
                                    />
                                );
                            })}

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </Router>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default App;
