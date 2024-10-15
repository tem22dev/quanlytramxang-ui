import { Layout, Menu, Avatar, Space } from 'antd';
import {
    DashboardOutlined,
    DatabaseOutlined,
    DollarOutlined,
    ShopOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';

import images from '../../../assets/images';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';

function Sidebar() {
    const { Sider } = Layout;
    const isCollapsedSidebar = useAppSelector(
        (state: { app: { isCollapsedSidebar: boolean } }) => state.app.isCollapsedSidebar,
    );

    const items = [
        {
            key: '/',
            icon: <DashboardOutlined />,
            label: <Link to="/">Trang chủ</Link>,
        },
        {
            key: '/tram-xang-dau',
            icon: <ShopOutlined />,
            label: <Link to="/tram-xang-dau">Trạm xăng dầu</Link>,
        },
        {
            key: '/hoa-don',
            icon: <DollarOutlined />,
            label: <Link to="/tram-xang-dau">Hoá đơn</Link>,
        },
        {
            key: '/kho-hang',
            icon: <DatabaseOutlined />,
            label: <Link to="/tram-xang-dau">Kho hàng</Link>,
        },
        {
            key: '/nhan-vien',
            icon: <UsergroupAddOutlined />,
            label: <Link to="/nhan-vien">Nhân viên</Link>,
        },
        {
            key: '/tai-khoan',
            icon: <UserAddOutlined />,
            label: <Link to="/tai-khoan">Tài khoản</Link>,
        },
    ];

    const listItem = items.map((item) => {
        return {
            key: item.key,
            icon: item.icon,
            label: item.label,
        };
    });

    return (
        <Sider
            trigger={null}
            width={220}
            collapsible
            collapsed={isCollapsedSidebar}
            theme="light"
            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
        >
            <div className="flex items-center justify-center px-0 pt-3 pb-9">
                <Space wrap size={16}>
                    <Avatar shape="square" size="default" src={images.logo} />
                </Space>
                {isCollapsedSidebar || <p className="text-sm font-bold ml-3">TEM</p>}
            </div>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['/']}
                selectedKeys={[location.pathname]}
                items={listItem}
            ></Menu>
        </Sider>
    );
}

export default Sidebar;
