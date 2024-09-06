import { Button, Checkbox, Col, Form, Input, Layout, Row, Typography } from 'antd';
import type { FormProps } from 'antd';

import images from '../../assets/images';

type FieldType = {
    user_identifier: string;
    password: string;
    remember: boolean;
};

const Login: React.FC = () => {
    const { Title } = Typography;
    const { Content } = Layout;

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    return (
        <Layout className="layout-default layout-signin">
            <Content className="signin">
                <Row gutter={[24, 0]} justify="space-around">
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
                        <Title className="mb-15">Đăng nhập</Title>
                        <Title className="font-regular text-muted" level={5}>
                            Nhập email hoặc số điện thoại và mật khẩu để đăng nhập
                        </Title>
                        <Form onFinish={onFinish} layout="vertical" className="row-col">
                            <Form.Item<FieldType>
                                className="username"
                                label="Email hoặc số điện thoại"
                                name="user_identifier"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email hoặc số điện thoại!',
                                    },
                                ]}
                            >
                                <Input placeholder="Email hoặc số điện thoại" />
                            </Form.Item>

                            <Form.Item
                                className="username"
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Mật khẩu" />
                            </Form.Item>

                            <Form.Item<FieldType> name="remember" valuePropName="checked">
                                <Checkbox>Ghi nhớ tôi</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    ĐĂNG NHẬP
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col
                        className="sign-img"
                        style={{ padding: 12 }}
                        xs={{ span: 24 }}
                        lg={{ span: 12 }}
                        md={{ span: 12 }}
                    >
                        <img src={images.bgSignin} alt="" />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Login;
