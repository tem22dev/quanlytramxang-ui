import { ReactNode } from 'react';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <>
            <Sidebar />
            <div>
                <Header />
                {children}
            </div>
        </>
    );
};

export default DefaultLayout;
