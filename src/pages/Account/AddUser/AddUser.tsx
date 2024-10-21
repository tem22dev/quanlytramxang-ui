import React, { useState } from 'react';
import { App, Col, Divider, Form, Input, Modal, Row } from 'antd';
import { PlusOutlined, UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

import * as userService from '../../../services/userServices';

interface AddUserProps {
    openModalCreate: boolean;
    setOpenModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
    fetchListUser: () => Promise<void>;
}

export interface CreateUser {
    full_name: string;
    tel: string;
    email: string;
    password: string;
}

const AddUser: React.FC<AddUserProps> = ({ openModalCreate, setOpenModalCreate, fetchListUser }) => {
    const { message } = App.useApp();
    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values: CreateUser) => {
        const { full_name, password, email, tel } = values;
        setIsSubmit(true);

        try {
            const result = await userService.createUser({
                full_name,
                password,
                email,
                tel,
            });

            if (!!result && result.status === 200) {
                message.success('Tạo mới người dùng thành công', 4);
                form.resetFields();
                setOpenModalCreate(false);
                await fetchListUser();
            } else if (result.status === 422) {
                message.warning('Nhập đầy đủ các trường', 4);
            } else {
                message.error('Thêm tài khoản thất bại', 4);
            }
        } catch (error) {
            console.log(error);
        }

        setIsSubmit(false);
    };

    return (
        <Modal
            title="Thêm tài khoản"
            open={openModalCreate}
            onOk={() => {
                form.submit();
            }}
            okButtonProps={{ icon: <PlusOutlined /> }}
            okText="Thêm"
            confirmLoading={isSubmit}
            onCancel={() => {
                form.resetFields();
                setIsSubmit(false);
                setOpenModalCreate(false);
            }}
            cancelText="Huỷ bỏ"
            maskClosable={false}
            centered={true}
            width={680}
        >
            <Divider />
            <Form form={form} layout="vertical" name="add-user" onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="full_name"
                            label="Họ tên"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                            hasFeedback
                        >
                            <Input prefix={<UserOutlined />} placeholder="Họ tên" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="E-Mail"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Không phải email hợp lệ!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" type="email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="tel"
                            label="Số điện thoại"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại!',
                                },
                                {
                                    len: 10,
                                    message: 'Số điện thoại không hợp lệ!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input prefix={<PhoneOutlined />} type="number" placeholder="Số điện thoại" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                                {
                                    min: 6,
                                    max: 32,
                                    message: 'Độ dài mật khẩu từ 6 đến 32 ký tự!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirmPass"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng xác nhận mật khẩu!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu mới bạn nhập không khớp!'));
                                    },
                                }),
                            ]}
                            hasFeedback
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" type="password" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default AddUser;
