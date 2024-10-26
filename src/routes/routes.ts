import React from 'react';
// Config
import config from '../config';
// Layout
import DefaultLayout from '../layouts/DefaultLayout';
// Pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Account from '../pages/Account';
import GasStation from '../pages/GasStation';
import Staff from '../pages/Staff';
import Fuel from '../pages/Fuel';
import Invoice from '../pages/Invoice';
import EntryForm from '../pages/EntryForm';

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
    { path: config.routes.gasStation, component: GasStation, layout: DefaultLayout },
    { path: config.routes.staffs, component: Staff, layout: DefaultLayout },
    { path: config.routes.fuels, component: Fuel, layout: DefaultLayout },
    { path: config.routes.invoices, component: Invoice, layout: DefaultLayout },
    { path: config.routes.entryForm, component: EntryForm, layout: DefaultLayout },
];
