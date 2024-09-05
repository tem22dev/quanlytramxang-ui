// Config
import config from '../config';

// Layout
import DefaultLayout from '../layouts/DefaultLayout';

// Pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Account from '../pages/Account';
import React from 'react';

interface Route {
    path: string;
    component: React.ComponentType;
    layout: any;
}

// Public routes
export const publicRoutes: Route[] = [{ path: config.routes.login, component: Login, layout: null }];

// Private routes
export const privateRoutes: Route[] = [
    { path: config.routes.dashboard, component: Dashboard, layout: DefaultLayout },
    { path: config.routes.accounts, component: Account, layout: DefaultLayout },
];
