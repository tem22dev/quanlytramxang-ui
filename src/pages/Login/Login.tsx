import { Button, Card, Checkbox, Flex, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';

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
                className="rounded-lg border shadow-md w-[350px]"
                styles={{ header: { fontSize: '1.2rem', textAlign: 'center' } }}
                title="Đăng nhập"
            >
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    size="large"
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
        </div>
    );
};

export default Login;
