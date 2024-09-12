import { Button, Checkbox, Flex, Form, Input } from 'antd';
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
        <section className="relative bg-gray-100 min-h-screen flex box-border justify-center items-center">
            <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl px-5 py-6 items-center relative z-10">
                <div className="md:w-1/2 px-8">
                    <h2 className="font-bold text-3xl text-[#002D74]">Đăng nhập</h2>
                    <p className="text-sm mt-4 text-[#002D74]">
                        Nếu bạn đã là thành viên, hãy đăng nhập dễ dàng ngay bây giờ.
                    </p>
                    <Form className="flex flex-col gap-0" initialValues={{ remember: true }} onFinish={onFinish}>
                        <Form.Item className="mb-5" name="user_identifier">
                            <Input
                                className="p-2 mt-6"
                                prefix={<UserOutlined />}
                                placeholder="Email hoặc số điện thoại"
                            />
                        </Form.Item>
                        <Form.Item className="mb-5" name="password">
                            <Input className="p-2" prefix={<LockOutlined />} type="password" placeholder="Mật khẩu" />
                        </Form.Item>
                        <Form.Item className="mb-5">
                            <Flex justify="space-between" align="center">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox className="text-[#002D74]">Ghi nhớ tôi</Checkbox>
                                </Form.Item>
                            </Flex>
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" htmlType="submit" size={'large'}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="mt-3 items-center text-gray-100">
                        <hr className="border-gray-300" />
                        <p className="text-center text-sm my-1">Hoặc</p>
                        <hr className="border-gray-300" />
                    </div>
                    <button className="bg-white border py-2 w-full rounded-md mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:opacity-95 font-medium">
                        <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                            <path
                                fill="#FFC107"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                            ></path>
                            <path
                                fill="#FF3D00"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                            ></path>
                            <path
                                fill="#4CAF50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                            ></path>
                            <path
                                fill="#1976D2"
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                            ></path>
                        </svg>
                        Đăng nhập với Google
                    </button>
                </div>
                <div className="md:block hidden w-1/2">
                    <img className="rounded-2xl max-h-[1600px]" src={images.bgLogin} alt="login form image" />
                </div>
            </div>
            <div
                className="absolute inset-0 bg-black bg-opacity-50 bg-cover bg-center opacity-95 blur-[8px]"
                style={{ backgroundImage: `url(${images.bgLogin})` }}
            ></div>
        </section>
    );
};

export default Login;
