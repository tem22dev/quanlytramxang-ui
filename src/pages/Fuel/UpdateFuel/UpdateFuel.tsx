import React, { useEffect, useState } from 'react';
import { Modal, Col, Form, Input, Row, App, Select } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import * as fuelService from '../../../services/fuelServices';

interface UpdateFuelProps {
    openModal: boolean;
    setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
    dataUpdate:
        | {
              key: number;
              name: string;
              type_fuel: number;
              price: number;
              description: string;
          }
        | {}
        | null;
    setDataUpdate: React.Dispatch<React.SetStateAction<any>>;
    fetchListFuel: () => Promise<void>;
}

const UpdateFuel: React.FC<UpdateFuelProps> = ({
    openModal,
    setOpenModel,
    dataUpdate,
    setDataUpdate,
    fetchListFuel,
}) => {
    const [form] = Form.useForm();
    const { message } = App.useApp();
    const [isSubmit, setIsSubmit] = useState(false);

    const listTypeFuel = [
        {
            label: 'Xăng',
            value: 1,
            key: 1,
        },
        {
            label: 'Dầu',
            value: 2,
            key: 2,
        },
    ];

    // Set fieldsValue
    useEffect(() => {
        if (dataUpdate && 'key' in dataUpdate) {
            const fetchDataUpdate = async () => {
                const data = await fuelService.getAFuel(dataUpdate.key);

                if (!!data && data.status === 200) {
                    const init = {
                        id: data.data.id,
                        name: data.data.name,
                        type_fuel: parseInt(data.data.type_fuel),
                        price: data.data.price_number,
                        description: data.data.description,
                    };
                    form.setFieldsValue(init);
                }
            };

            fetchDataUpdate();
        }

        return () => {
            form.resetFields(); // Reset fields on component unmount
        };
    }, [dataUpdate]);

    // Handle submit form
    const onFinish = async (values: any) => {
        setIsSubmit(true);

        const result = await fuelService.updateFuel(values);

        if (!!result && result.status === 200) {
            message.success('Cập nhật nhiên liệu thành công', 4);
            setOpenModel(false);
            await fetchListFuel();
        } else if (result.status === 422) {
            message.warning('Nhập đầy đủ các trường', 4);
        } else {
            message.error('Cập nhật nhiên liệu thất bại', 4);
        }
        setIsSubmit(false);
    };

    return (
        <Modal
            forceRender
            title="Cập nhật nhiên liệu"
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
                            <Select placeholder="Chọn loại nhiên liệu" options={listTypeFuel} />
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

export default UpdateFuel;
