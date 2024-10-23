import { useEffect, useState } from 'react';
import { Layout, Card, Table, Space, Tag, Button, App } from 'antd';

import * as invoiceServices from '../../services/invoiceServices';
import { EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AddInvoice from './AddInvoice';

interface Invoice {
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
    detail: [
        {
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
            created_at: string;
        },
    ];
    created_at: string;
}

const Invoice = () => {
    const { Content } = Layout;
    const { message } = App.useApp();
    const [openAddInvoice, setOpenAddInvoice] = useState(false);
    const [listInvoice, setListInvoice] = useState<Invoice[] | []>([]);

    // Fetch list invoice
    const fetchListInvoice = async () => {
        try {
            const result = await invoiceServices.getListInvoice();

            if (!!result && result.status === 200) {
                const dataSource = result.data.map((item: Invoice) => {
                    return {
                        key: item.id,
                        name_station: item.gas_station.name_station,
                        full_name: item.staff.full_name,
                        total_price: item.total_price_format,
                        created_at: item.created_at,
                    };
                });

                setListInvoice(dataSource);
            }
        } catch (error) {}
    };

    // Columns table
    const columns = [
        {
            title: '#',
            dataIndex: '#',
            render: (_: any, __: any, index: number) => <p>{index + 1}</p>,
        },
        {
            title: 'Tên trạm',
            width: 220,
            dataIndex: 'name_station',
            render: (text: string) => <p className="line-clamp-2">{text}</p>,
        },
        {
            title: 'Nhân viên thanh toán',
            width: 220,
            dataIndex: 'full_name',
            render: (text: string) => <p className="line-clamp-2">{text}</p>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_price',
            render: (total_price: string) => total_price,
        },
        {
            title: 'Thời gian',
            dataIndex: 'created_at',
            render: (date: string) => date,
        },
        // {
        //     title: 'Thao tác',
        //     dataIndex: 'action',
        //     render: (_: any, record: any) => (
        //         <Space>
        //             <Tag color="#27d674" style={{ cursor: 'pointer' }}>
        //                 <EyeOutlined />
        //             </Tag>
        //         </Space>
        //     ),
        // },
    ];

    useEffect(() => {
        fetchListInvoice();
    }, []);

    return (
        <Content className="m-5 min-[calc(100vh - 104px)] rounded-lg">
            <Card bordered={false}>
                <div className="flex items-center mb-4">
                    <h1 className="m-0 text-base">Danh sách hoá đơn</h1>
                    <Space className="ml-auto">
                        <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddInvoice(true)}>
                            Thêm mới
                        </Button>
                    </Space>
                </div>
                <Table
                    columns={columns}
                    rowKey="key"
                    dataSource={listInvoice}
                    pagination={{
                        showSizeChanger: true,
                        showTotal: (total, range) => (
                            <div>
                                {range[0]}-{range[1]} trên {total} dòng
                            </div>
                        ),
                    }}
                />

                {/* Add Invoice */}
                <AddInvoice
                    openModalCreate={openAddInvoice}
                    setOpenModalCreate={setOpenAddInvoice}
                    fetchListInvoice={fetchListInvoice}
                />
            </Card>
        </Content>
    );
};

export default Invoice;
