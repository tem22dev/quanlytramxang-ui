import React, { useState } from 'react';
import { App, Col, Divider, Form, Input, Modal, Row, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import * as fuelService from '../../../services/fuelServices';

interface AddFuelProps {
    openModalCreate: boolean;
    setOpenModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
    fetchListFuel: () => Promise<void>;
}

export interface CreateFuel {
    name: string;
    type_fuel: number;
    price: number;
    description: string;
}

const AddFuel: React.FC<AddFuelProps> = ({ openModalCreate, setOpenModalCreate, fetchListFuel }) => {
    const { message } = App.useApp();
    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values: CreateFuel) => {
        const { name, type_fuel, price, description } = values;
        setIsSubmit(true);

        try {
            const result = await fuelService.createFuel({
                name,
                type_fuel,
                price,
                description,
            });

            if (!!result && result.status === 200) {
                message.success('Tạo mới nhiên liệu thành công', 4);
                form.resetFields();
                setOpenModalCreate(false);
                await fetchListFuel();
            } else if (result.status === 422) {
                message.warning('Nhập đầy đủ các trường', 4);
            } else {
                message.error('Thêm nhiên liệu thất bại', 4);
            }
        } catch (error) {
            console.log(error);
        }

        setIsSubmit(false);
    };

    return (
        <Modal
            title="Thêm nhiên liệu"
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
                            name="name"
                            label="Tên nhiên liệu"
                            rules={[{ required: true, message: 'Vui lòng nhập tên nhiên liệu' }]}
                            hasFeedback
                        >
                            <Input placeholder="Tên nhiên liệu" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="price"
                            label="Giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input type="number" placeholder="Giá" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="type_fuel"
                            label="Chọn loại nhiên liệu"
                            rules={[{ required: true, message: 'Vui lòng chọn loại nhiên liệu!' }]}
                        >
                            <Select placeholder="Chọn loại nhiên liệu">
                                <Select.Option value={1}>Xăng</Select.Option>
                                <Select.Option value={2}>Dầu</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="description" label="Mô tả">
                            <Input placeholder="Mô tả" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default AddFuel;
