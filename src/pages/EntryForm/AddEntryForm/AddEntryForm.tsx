import React, { useEffect, useState } from 'react';
import { App, Button, Col, Divider, Form, Input, Modal, Row, Select } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

import * as entryFormServices from '../../../services/entryFormServices';
import * as stationServices from '../../../services/stationServices';
import * as fuelServices from '../../../services/fuelServices';

interface AddEntryFormProps {
    openModalCreate: boolean;
    setOpenModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
    fetchListEntryForm: () => Promise<void>;
}

export interface CreateEntryForm {
    gas_station_id: number;
    detail_entry_form: Array<{
        fuel_id: number;
        quantity: number;
        price: number;
    }>;
    fuel_id: number;
    quantity: number;
    price: number;
}

interface Station {
    id: number;
    user_id: number;
    user: {
        tel: string;
        full_name: string;
        email: string;
        user_type: number;
        created_at: string;
    };
    name_station: string;
    lng: number;
    lat: number;
    image: string;
    address: string;
    created_at: string;
}

interface Fuel {
    id: number;
    name: string;
    type_fuel: number;
    price: number;
    description: string;
    created_at: string;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ openModalCreate, setOpenModalCreate, fetchListEntryForm }) => {
    const [form] = Form.useForm();
    const { message } = App.useApp();
    const [isSubmit, setIsSubmit] = useState(false);
    const [listStation, setListStation] = useState<Station[] | []>([]);
    const [listFuel, setListFuel] = useState<Fuel[] | []>([]);

    // Fetch list station
    const fetchListStation = async () => {
        try {
            const result = await stationServices.getListStation();

            if (!!result && result.status === 200) {
                const dataStation = result.data.map((gasStation: { id: number; name_station: string }) => {
                    return {
                        label: gasStation.name_station,
                        value: gasStation.id,
                        key: gasStation.id,
                    };
                });

                setListStation(dataStation);
            }
        } catch (error) {}
    };

    // Fetch list fuel
    const fetchListFuel = async () => {
        try {
            const result = await fuelServices.getListFuel();

            if (!!result && result.status === 200) {
                const dataFuel = result.data.map((fuel: { id: number; name: string }) => {
                    return {
                        label: fuel.name,
                        value: fuel.id,
                        key: fuel.id,
                    };
                });

                setListFuel(dataFuel);
            }
        } catch (error) {}
    };

    useEffect(() => {
        fetchListStation();
        fetchListFuel();
    }, []);

    const handleSelectFuel = async (id: number, fieldKey?: number) => {
        try {
            const result = await fuelServices.getAFuel(id);

            if (!!result && result.status === 200) {
                if (typeof fieldKey === 'number') {
                    // Nếu có fieldKey, tức là đang thao tác với Form.List
                    form.setFieldValue(['detail_entry_form', fieldKey, 'price'], result.data.price_number);
                } else {
                    // Nếu không có fieldKey, tức là đang thao tác với Select phía trên
                    form.setFieldValue('fuel_id', id);
                    form.setFieldValue('price', result.data.price_number);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onFinish = async (values: CreateEntryForm) => {
        const { gas_station_id, fuel_id, quantity, price } = values;

        setIsSubmit(true);

        // Chuyển đổi quantity và price về kiểu số nếu cần
        const convertedQuantity = parseFloat(quantity as unknown as string);
        const convertedPrice = parseFloat(price as unknown as string);

        // Tạo đối tượng chi tiết phiếu nhập từ fuel_id, quantity, price
        const newDetailEntryForm = [
            {
                fuel_id,
                quantity: convertedQuantity,
                price: convertedPrice,
            },
        ];

        // Nếu values.detail_entry_form đã tồn tại, chuyển đổi quantity trong các phần tử trước đó sang số
        const existingDetailEntryForm =
            values.detail_entry_form?.map((item) => ({
                ...item,
                quantity: parseFloat(item.quantity as unknown as string),
            })) || [];

        // Gộp mảng detail_entry_form mới và cũ
        values.detail_entry_form = [...existingDetailEntryForm, ...newDetailEntryForm];

        // Thực hiện gửi request tới server (tạm thời comment vì bạn đã comment sẵn)
        try {
            const result = await entryFormServices.createEntryForm({
                gas_station_id, // Gán gas_station_id
                detail_entry_form: values.detail_entry_form, // Truyền detail_entry_form
            });

            if (result && result.status === 200) {
                message.success('Tạo mới phiếu nhập thành công', 4);
                form.resetFields();
                setOpenModalCreate(false);
                await fetchListEntryForm();
            } else if (result.status === 422) {
                message.warning('Nhập đầy đủ các trường', 4);
            } else {
                message.error('Thêm phiếu nhập thất bại', 4);
            }
        } catch (error) {
            console.error(error);
        }

        setIsSubmit(false);
    };

    return (
        <Modal
            title="Thêm phiếu nhập"
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
                            name="gas_station_id"
                            label="Chọn trạm"
                            rules={[{ required: true, message: 'Vui lòng chọn trạm!' }]}
                            hasFeedback
                        >
                            <Select placeholder="Chọn trạm" options={listStation}></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="fuel_id"
                            label="Nhiên liệu"
                            rules={[{ required: true, message: 'Vui lòng chọn nhiên liệu!' }]}
                            hasFeedback
                        >
                            <Select
                                onChange={(value) => handleSelectFuel(value)}
                                placeholder="Chọn nhiên liệu"
                                options={listFuel}
                            ></Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="price"
                            label="Giá"
                            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                            hasFeedback
                        >
                            <Input disabled={true} placeholder="Giá" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="quantity"
                            label="Nhập số lượng"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                            hasFeedback
                        >
                            <Input type="number" placeholder="Nhập số lượng" />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Chi tiết hóa đơn */}
                <Form.List name="detail_entry_form">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Row gutter={16} key={key}>
                                    <Col span={8}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'fuel_id']}
                                            label="Nhiên liệu"
                                            rules={[{ required: true, message: 'Vui lòng chọn nhiên liệu!' }]}
                                        >
                                            <Select
                                                onChange={(value) => handleSelectFuel(value, fieldKey)}
                                                placeholder="Chọn nhiên liệu"
                                                options={listFuel}
                                            ></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'price']}
                                            label="Giá"
                                            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                                        >
                                            <Input disabled={true} placeholder="Giá" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'quantity']}
                                            label="Nhập số lượng"
                                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                                        >
                                            <Input type="number" placeholder="Nhập số lượng" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                        <CloseOutlined
                                            onClick={() => remove(name)}
                                            style={{ color: 'red', cursor: 'pointer' }}
                                        />
                                    </Col>
                                </Row>
                            ))}
                            <Button type="dashed" onClick={() => add()} block>
                                + Thêm nhiên liệu
                            </Button>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default AddEntryForm;
