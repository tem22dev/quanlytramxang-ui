import { useEffect, useState } from 'react';
import { Layout, Card, Table, Space, Tag, Button } from 'antd';

import * as entryFormServices from '../../services/entryFormServices';
import { EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AddEntryForm from './AddEntryForm';
import ViewEntryForm from './ViewEntryForm';

interface EntryForm {
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

const EntryForm = () => {
    const { Content } = Layout;
    const [openAddEntryForm, setOpenAddEntryForm] = useState(false);
    const [dataView, setDataView] = useState({});
    const [openModalView, setOpenModalView] = useState(false);
    const [listEntryForm, setListEntryForm] = useState<EntryForm[] | []>([]);

    // Fetch list entryForm
    const fetchListEntryForm = async () => {
        try {
            const result = await entryFormServices.getListEntryForm();

            if (!!result && result.status === 200) {
                const dataSource = result.data.map((item: EntryForm) => {
                    return {
                        key: item.id,
                        name_station: item.gas_station.name_station,
                        total_price: item.total_price_format,
                        created_at: item.created_at,
                    };
                });

                setListEntryForm(dataSource);
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
            title: 'Tổng tiền',
            dataIndex: 'total_price',
            render: (total_price: string) => total_price,
        },
        {
            title: 'Thời gian',
            dataIndex: 'created_at',
            render: (date: string) => date,
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Tag
                        onClick={() => {
                            setOpenModalView(true);
                            setDataView(record);
                        }}
                        color="#27d674"
                        style={{ cursor: 'pointer' }}
                    >
                        <EyeOutlined />
                    </Tag>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchListEntryForm();
    }, []);

    return (
        <Content className="m-5 min-[calc(100vh - 104px)] rounded-lg">
            <Card bordered={false}>
                <div className="flex items-center mb-4">
                    <h1 className="m-0 text-base">Danh sách phiếu nhập</h1>
                    <Space className="ml-auto">
                        <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddEntryForm(true)}>
                            Thêm mới
                        </Button>
                    </Space>
                </div>
                <Table
                    columns={columns}
                    rowKey="key"
                    dataSource={listEntryForm}
                    pagination={{
                        showSizeChanger: true,
                        showTotal: (total, range) => (
                            <div>
                                {range[0]}-{range[1]} trên {total} dòng
                            </div>
                        ),
                    }}
                />

                {/* Add EntryForm */}
                <AddEntryForm
                    openModalCreate={openAddEntryForm}
                    setOpenModalCreate={setOpenAddEntryForm}
                    fetchListEntryForm={fetchListEntryForm}
                />

                {/* View EntryForms */}
                <ViewEntryForm
                    openModal={openModalView}
                    setOpenModel={setOpenModalView}
                    dataView={dataView}
                    setDataView={setDataView}
                />
            </Card>
        </Content>
    );
};

export default EntryForm;
