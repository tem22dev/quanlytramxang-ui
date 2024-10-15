import { ReactNode } from 'react';

import { useEffect, useState } from 'react';
import { Layout } from 'antd';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useAppSelector } from '../../hooks';

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const { Content } = Layout;

    const isCollapsedSidebar = useAppSelector((state) => state?.app.isCollapsedSidebar);
    const [width, setWidth] = useState(isCollapsedSidebar ? '80px' : '220px');

    useEffect(() => {
        isCollapsedSidebar ? setWidth('80px') : setWidth('220px');
    }, [isCollapsedSidebar]);

    return (
        <Layout hasSider>
            <Sidebar />
            <Layout style={{ marginLeft: width }}>
                <Header />
                <Content>{children}</Content>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
