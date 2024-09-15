import { App, Button, Card, Form, Input } from 'antd';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import * as authService from '../../services/authServices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { doLoginAccount } from '../../redux/account/accountSlice';

import images from '../../assets/images';

type FieldType = {
    user_identifier: string;
    password: string;
};

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const { message } = App.useApp();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const { user_identifier, password } = values;
        setIsSubmit(true);

        const fetchApiLogin = async () => {
            const result = await authService.login({ user_identifier, password });

            if (!!result && result.status === 200) {
                localStorage.setItem('access_token', result.data.token);
                dispatch(doLoginAccount(result.data.user));

                navigate('/');
                setIsSubmit(false);
                message.success('Đăng nhập thành công!', 4);
            } else {
                message.error('Sai thông tin tài khoản!', 4);
                setIsSubmit(false);
            }
        };

        if (!!user_identifier && !!password) {
            fetchApiLogin();
        } else {
            message.info('Vui lòng nhập đầy đủ các thông tin!', 4);
            setIsSubmit(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <Card
                className="z-10 rounded-lg border shadow-md w-[350px]"
                styles={{ header: { fontSize: '1.2rem', textAlign: 'center' } }}
                title="Đăng nhập"
            >
                <Form
                    name="login"
                    initialValues={{ remember_me: true }}
                    size="middle"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item name="user_identifier" label="Tài khoản">
                        <Input prefix={<UserOutlined />} placeholder="Tài khoản" />
                    </Form.Item>

                    <Form.Item name="password" label="Mật khẩu">
                        <Input prefix={<LockOutlined />} type="password" placeholder="Mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit" icon={<LoginOutlined />} loading={isSubmit}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <div
                className="absolute inset-0 z-0 bg-cover bg-center after:content-[''] after:absolute after:inset-0 after:bg-black after:bg-opacity-10"
                style={{ backgroundImage: `url(${images.bgLogin})` }}
            ></div>
        </div>
    );
};

export default Login;
