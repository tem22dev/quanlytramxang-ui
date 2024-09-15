import { Button, Layout, Avatar, Space, Dropdown, theme, App } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

import images from '../../../assets/images';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleSidebar } from '../../../redux/app/appSlice';
import * as authService from '../../../services/authServices';
import { doLogoutAction } from '../../../redux/account/accountSlice';

function Header() {
    const { Header } = Layout;
    const { message } = App.useApp();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.account.user);

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const isCollapsedSidebar = useAppSelector((state) => state.app.isCollapsedSidebar);

    const items = [
        {
            label: (
                <label style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
                    Đăng xuất
                </label>
            ),
            key: 'logout',
        },
    ];

    const handleLogout = async () => {
        const result = await authService.logout();
        if (result && result.status === 200) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công', 4);
            navigate('/login');
        }
    };

    return (
        <Header style={{ padding: 0, background: colorBgContainer }} className="flex items-center">
            <Button
                type="text"
                icon={isCollapsedSidebar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => dispatch(toggleSidebar())}
                className="text-base"
            />
            <Space size={16} className="ml-auto mr-4">
                <Dropdown menu={{ items }} trigger={['click']}>
                    <div className="flex items-center cursor-pointer" onClick={(e) => e.preventDefault()}>
                        <Avatar shape="circle" size="default" src={images.avatar} className="mr-2" />
                        <div className="text-base">{user?.full_name}</div>
                        <DownOutlined />
                    </div>
                </Dropdown>
            </Space>
        </Header>
    );
}

export default Header;
