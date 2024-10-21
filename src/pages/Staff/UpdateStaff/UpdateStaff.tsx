import React, { useEffect, useState } from 'react';
import { Modal, Col, Form, Input, Row, App, DatePicker, Select } from 'antd';
import { SaveOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';

import * as staffServices from '../../../services/staffServices';
import * as stationServices from '../../../services/stationServices';
import dayjs from 'dayjs';

interface UpdateStaffProps {
    openModal: boolean;
    setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
    dataUpdate:
        | {
              key: number;
              full_name: string;
              tel: string;
              gas_station_id: number;
              address: string;
              birth_date: string;
              position: string;
          }
        | {}
        | null;
    setDataUpdate: React.Dispatch<React.SetStateAction<any>>;
    fetchListStaff: () => Promise<void>;
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

const UpdateStaff: React.FC<UpdateStaffProps> = ({
    openModal,
    setOpenModel,
    dataUpdate,
    setDataUpdate,
    fetchListStaff,
}) => {
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

    // Set fieldsValue
    useEffect(() => {
        if (dataUpdate && 'key' in dataUpdate) {
            const fetchDataUpdate = async () => {
                const data = await staffServices.getAStaff(dataUpdate.key);

                if (!!data && data.status === 200) {
                    const init = {
                        id: data.data.id,
                        full_name: data.data.full_name,
                        address: data.data.address,
                        tel: data.data.tel,
                        gas_station_id: data.data.gas_station_id,
                        birth_date: dayjs(data.data.birth_date, 'DD-MM-YYYY'),
                        position: data.data.position,
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
        const formattedBirthDate = dayjs(values.birth_date).format('D-M-YYYY');
        values.birth_date = formattedBirthDate;

        const result = await staffServices.updateStaff(values);

        if (!!result && result.status === 200) {
            message.success('Cập nhật nhân viên thành công', 4);
            setOpenModel(false);
            await fetchListStaff();
        } else if (result.status === 422) {
            message.warning('Nhập đầy đủ các trường', 4);
        } else {
            message.error('Cập nhật nhân viên thất bại', 4);
        }
        setIsSubmit(false);
    };

    return (
        <Modal
            forceRender
            title="Cập nhật nhân viên"
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
            <Form form={form} layout="vertical" name="update-staff" onFinish={onFinish}>
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

export default UpdateStaff;
