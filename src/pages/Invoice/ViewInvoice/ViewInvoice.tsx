import React, { useEffect, useState } from 'react';
import { Divider, Modal, Descriptions, Table } from 'antd';

import * as invoiceServices from '../../../services/invoiceServices';

interface ViewInvoiceProps {
    openModal: boolean;
    setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
    setDataView: React.Dispatch<React.SetStateAction<any>>;
    dataView:
        | {
              key: number;
          }
        | {}
        | null;
}

export interface ViewInvoice {
    id: number;
    gas_station: {
        id: number;
        name_station: string;
        lng: number;
        lat: number;
        address: string;
    };
    staff: {
        id: number;
        gas_station_id: number;
        full_name: string;
        tel: string;
        address: string;
        position: string;
    };
    total_price: number;
    total_price_format: string;
    detail: Array<{
        id: number;
        fuel: {
            id: number;
            name: string;
            price: number;
            description: string;
        };
        quantity: number;
        price: number;
        price_format: string;
    }>;
    created_at: string;
}

const ViewInvoice: React.FC<ViewInvoiceProps> = ({ openModal, dataView, setOpenModel, setDataView }) => {
    const [dataViewFetch, setDataViewFetch] = useState<ViewInvoice | null>(null);

    useEffect(() => {
        if (dataView && 'key' in dataView) {
            const fetchDataView = async () => {
                const data = await invoiceServices.getAInvoice(dataView.key);

                if (!!data && data.status === 200) {
                    setDataViewFetch(data.data);
                }
            };

            fetchDataView();
        }
    }, [dataView]);

    // Columns for the detail table
    const columns = [
        {
            title: '#',
            dataIndex: '#',
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: 'Nhiên liệu',
            dataIndex: ['fuel', 'name'],
            key: 'fuel',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text: string) => <p>{text} lít</p>,
        },
        {
            title: 'Giá',
            dataIndex: 'price_format',
            key: 'price',
        },
    ];

    return (
        <Modal
            open={openModal}
            onCancel={() => {
                setOpenModel(false);
                setDataView(null); // Reset lại khi đóng modal
            }}
            maskClosable={false}
            centered={true}
            width={840}
            footer={null}
        >
            {dataViewFetch ? (
                <>
                    <Descriptions title="Thông tin hóa đơn" bordered>
                        <Descriptions.Item label="Mã hoá đơn">{dataViewFetch.id}</Descriptions.Item>
                        <Descriptions.Item label="Cửa hàng">{dataViewFetch.gas_station.name_station}</Descriptions.Item>
                        <Descriptions.Item label="Nhân viên">{dataViewFetch.staff.full_name}</Descriptions.Item>
                        <Descriptions.Item label="Tổng giá">{dataViewFetch.total_price_format}</Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">{dataViewFetch.created_at}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <h1 className="text-base font-medium">Chi tiết hoá đơn</h1>
                    <Table dataSource={dataViewFetch.detail} columns={columns} rowKey="id" pagination={false} />
                </>
            ) : (
                <div>Đang tải dữ liệu...</div>
            )}
        </Modal>
    );
};

export default ViewInvoice;
