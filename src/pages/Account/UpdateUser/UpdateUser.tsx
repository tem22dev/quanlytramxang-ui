import React, { useEffect, useState } from 'react';
import { Modal, Col, Form, Input, Row, Switch, Divider, App } from 'antd';
import { SaveOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';

import * as userService from '../../../services/userServices';

interface UpdateUserProps {
    openModal: boolean;
    setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
    dataUpdate:
        | {
              key: number;
              full_name: string;
              tel: string;
              email: string;
              created_at: string;
          }
        | {}
        | null;
    setDataUpdate: React.Dispatch<React.SetStateAction<any>>;
    fetchListUser: () => Promise<void>;
}

const UpdateUser: React.FC<UpdateUserProps> = ({
    openModal,
    setOpenModel,
    dataUpdate,
    setDataUpdate,
    fetchListUser,
}) => {
    const [form] = Form.useForm();
    const { message } = App.useApp();
    const [isSubmit, setIsSubmit] = useState(false);
    const [isChangePass, setIsChangePass] = useState(false);

    // Set fieldsValue
    useEffect(() => {
        if (dataUpdate && 'key' in dataUpdate) {
            const init = {
                id: dataUpdate.key,
                full_name: dataUpdate.full_name,
                email: dataUpdate.email,
                tel: dataUpdate.tel, // Correct field
            };
            form.setFieldsValue(init);
        }

        return () => {
            form.resetFields(); // Reset fields on component unmount
        };
    }, [dataUpdate]);

    // Handle submit form
    const onFinish = async (values: any) => {
        setIsSubmit(true);

        const result = await userService.updateUser(values);

        if (!!result && result.status === 200) {
            message.success('Cập nhật người dùng thành công', 4);
            setOpenModel(false);
            await fetchListUser();
        } else if (result.status === 422) {
            message.warning('Nhập đầy đủ các trường', 4);
        } else {
            message.error('Cập nhật tài khoản thất bại', 4);
        }
        setIsSubmit(false);
    };

    return (
        <Modal
            forceRender
            title="Cập nhật người dùng"
            open={openModal}
            onOk={() => {
                form.submit();
            }}
            okButtonProps={{ icon: <SaveOutlined /> }}
            okText="Lưu thay đổi"
            confirmLoading={isSubmit}
            onCancel={() => {
                setDataUpdate(null);
                setIsSubmit(false);
                setOpenModel(false);
                setIsChangePass(false);
            }}
            cancelText="Trở lại"
            maskClosable={false}
            centered={true}
            width={680}
        >
            <Form form={form} layout="vertical" name="update-user" onFinish={onFinish}>
                <Form.Item hidden={true} name="id" label="Id" hasFeedback>
                    <Input placeholder="Id" />
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="full_name"
                            label="Họ tên"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                            hasFeedback
                        >
                            <Input placeholder="Họ tên" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="E-Mail"
                            rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                            hasFeedback
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="tel"
                            label="Số điện thoại"
                            rules={[{ required: true, message: 'Nhập số điện thoại' }]}
                            hasFeedback
                        >
                            <Input placeholder="Số điện thoại" type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider orientation="left">
                    <Switch
                        checked={isChangePass}
                        checkedChildren={<LockOutlined />}
                        unCheckedChildren={<UnlockOutlined />}
                        onChange={() => {
                            setIsChangePass(!isChangePass);
                        }}
                    />
                </Divider>
                {isChangePass && (
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
                                initialValue=""
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Password"
                                    disabled={!isChangePass}
                                />
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
                                initialValue=""
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Xác nhận mật khẩu"
                                    type="password"
                                    disabled={!isChangePass}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                )}
            </Form>
        </Modal>
    );
};

export default UpdateUser;
