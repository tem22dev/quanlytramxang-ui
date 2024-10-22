import { useEffect, useState } from 'react';
import { Layout, Card, Table, Space, Tag, Popconfirm, Button, App } from 'antd';

import * as fuelServices from '../../services/fuelServices';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import AddFuel from './AddFuel';
import UpdateFuel from './UpdateFuel';

interface Fuel {
    id: number;
    name: string;
    type_fuel: number;
    price: number;
    description: string;
    created_at: string;
}

const Fuel = () => {
    const { Content } = Layout;
    const { message } = App.useApp();
    const [openAddFuel, setOpenAddFuel] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [openUpdateFuel, setOpenUpdateFuel] = useState(false);
    const [listFuel, setListFuel] = useState<Fuel[] | []>([]);

    // Fetch list fuel
    const fetchListFuel = async () => {
        try {
            const result = await fuelServices.getListFuel();

            if (!!result && result.status === 200) {
                const dataSource = result.data.map((item: Fuel) => {
                    return {
                        key: item.id,
                        name: item.name,
                        type_fuel: item.type_fuel,
                        price: item.price,
                        description: item.description,
                        created_at: item.created_at,
                    };
                });

                setListFuel(dataSource);
            }
        } catch (error) {}
    };

    // Handle delete fuel
    const handleDeleteFuel = async (id: number) => {
        try {
            const result = await fuelServices.deleteFuel(id);
            if (!!result && result.status === 200) {
                message.success('Xoá nhiên liệu thành công', 4);
                fetchListFuel();
            } else {
                message.error('Xoá nhiên liệu thất bại');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Columns table
    const columns = [
        {
            title: '#',
            dataIndex: '#',
            render: (_: any, __: any, index: number) => <p>{index + 1}</p>,
        },
        {
            title: 'Tên nhiên liệu',
            width: 220,
            dataIndex: 'name',
            render: (name: string) => <p className="line-clamp-2">{name}</p>,
        },
        {
            title: 'Loại nhiên liệu',
            width: 220,
            dataIndex: 'type_fuel',
            render: (type_fuel: number) =>
                type_fuel == 1 ? <p className="line-clamp-2">Xăng</p> : <p className="line-clamp-2">Dầu</p>,
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            render: (price: string) => price,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            render: (description: string) => description,
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
                        color="#2db7f5"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setOpenUpdateFuel(true);
                            setDataUpdate(record);
                        }}
                    >
                        <EditOutlined />
                    </Tag>
                    <Popconfirm
                        placement="topLeft"
                        title="Xác nhận xoá nhiên liệu"
                        description="Bạn có chắc chắn muốn xoá nhiên liệu này ?"
                        okText="Xác nhận"
                        cancelText="Huỷ"
                        onConfirm={() => handleDeleteFuel(record.key)}
                        icon={<QuestionCircleOutlined style={{ color: 'red', cursor: 'pointer' }} />}
                    >
                        <Tag color="#f50" style={{ cursor: 'pointer' }}>
                            <DeleteOutlined />
                        </Tag>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchListFuel();
    }, []);

    return (
        <Content className="m-5 min-[calc(100vh - 104px)] rounded-lg">
            <Card bordered={false}>
                <div className="flex items-center mb-4">
                    <h1 className="m-0 text-base">Danh sách nhiên liệu</h1>
                    <Space className="ml-auto">
                        <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddFuel(true)}>
                            Thêm mới
                        </Button>
                    </Space>
                </div>
                <Table
                    columns={columns}
                    rowKey="key"
                    dataSource={listFuel}
                    pagination={{
                        showSizeChanger: true,
                        showTotal: (total, range) => (
                            <div>
                                {range[0]}-{range[1]} trên {total} dòng
                            </div>
                        ),
                    }}
                />

                {/* Add Fuel */}
                <AddFuel
                    openModalCreate={openAddFuel}
                    setOpenModalCreate={setOpenAddFuel}
                    fetchListFuel={fetchListFuel}
                />

                {/* Update Fuel */}
                <UpdateFuel
                    openModal={openUpdateFuel}
                    setOpenModel={setOpenUpdateFuel}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    fetchListFuel={fetchListFuel}
                />
            </Card>
        </Content>
    );
};

export default Fuel;
