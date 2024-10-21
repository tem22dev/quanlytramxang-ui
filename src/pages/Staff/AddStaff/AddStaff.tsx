import React, { useEffect, useState } from 'react';
import { App, Col, DatePicker, Divider, Form, Input, Modal, Row, Select } from 'antd';
import { PlusOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';

import * as staffServices from '../../../services/staffServices';
import * as stationServices from '../../../services/stationServices';
import dayjs from 'dayjs';

interface AddStaffProps {
    openModalCreate: boolean;
    setOpenModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
    fetchListStaff: () => Promise<void>;
}

export interface CreateStaff {
    full_name: string;
    tel: string;
    gas_station_id: number;
    address: string;
    birth_date: string;
    position: string;
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

const AddStaff: React.FC<AddStaffProps> = ({ openModalCreate, setOpenModalCreate, fetchListStaff }) => {
    const [form] = Form.useForm();
    const { message } = App.useApp();
    const [isSubmit, setIsSubmit] = useState(false);
    const [listStation, setListStation] = useState<Station[] | []>([]);

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

    useEffect(() => {
        fetchListStation();
    }, []);

    const onFinish = async (values: CreateStaff) => {
        const { full_name, gas_station_id, address, birth_date, position, tel } = values;
        setIsSubmit(true);

        const formattedBirthDate = dayjs(birth_date).format('D-M-YYYY');
        values.birth_date = formattedBirthDate;

        try {
            const result = await staffServices.createStaff({
                full_name,
                gas_station_id,
                address,
                birth_date,
                position,
                tel,
            });

            if (!!result && result.status === 200) {
                message.success('Tạo mới nhân viên thành công', 4);
                form.resetFields();
                setOpenModalCreate(false);
                await fetchListStaff();
            } else if (result.status === 422) {
                message.warning('Nhập đầy đủ các trường', 4);
            } else {
                message.error('Thêm nhân viên thất bại', 4);
            }
        } catch (error) {
            console.log(error);
        }

        setIsSubmit(false);
    };

    return (
        <Modal
            title="Thêm nhân viên"
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
                            name="position"
                            label="Công việc"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Công việc!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input placeholder="Công việc" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="gas_station_id"
                            label="Chọn trạm"
                            rules={[{ required: true, message: 'Vui lòng chọn trạm!' }]}
                        >
                            <Select placeholder="Chọn trạm" options={listStation}></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Ngày sinh"
                            name="birth_date"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                            hasFeedback
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                picker="date"
                                placeholder="01/01/2025"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="address"
                            label="Địa chỉ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input placeholder="Địa chỉ" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default AddStaff;
