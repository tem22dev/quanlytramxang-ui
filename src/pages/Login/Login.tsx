import { Button, Card, Checkbox, Flex, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';

import images from '../../assets/images';

type FieldType = {
    user_identifier: string;
    password: string;
    remember: boolean;
};

const Login: React.FC = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
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
                    initialValues={{ remember: true }}
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
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Ghi nhớ tôi</Checkbox>
                            </Form.Item>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
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
