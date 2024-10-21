import { useEffect, useState } from 'react';
import { Layout, Card, Table, Space, Tag, Popconfirm, Button, App } from 'antd';

import * as staffServices from '../../services/staffServices';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import AddStaff from './AddStaff';
import UpdateStaff from './UpdateStaff';

interface Staff {
    id: number;
    gas_station_id: number;
    gas_station: {
        name_station: string;
        address: string;
    };
    full_name: string;
    tel: string;
    birth_date: string;
    position: string;
    address: string;
    created_at: string;
}

const Staff = () => {
    const { Content } = Layout;
    const { message } = App.useApp();
    const [openAddStaff, setOpenAddStaff] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [openUpdateStaff, setOpenUpdateStaff] = useState(false);
    const [listStaff, setListStaff] = useState<Staff[] | []>([]);

    // Fetch list staff
    const fetchListStaff = async () => {
        try {
            const result = await staffServices.getListStaff();

            if (!!result && result.status === 200) {
                const dataSource = result.data.map((item: Staff) => {
                    return {
                        key: item.id,
                        full_name: item.full_name,
                        tel: item.tel,
                        name_station: item.gas_station.name_station,
                        position: item.position,
                        created_at: item.created_at,
                    };
                });

                setListStaff(dataSource);
            }
        } catch (error) {}
    };

    // Handle delete staff
    const handleDeleteStaff = async (id: number) => {
        try {
            const result = await staffServices.deleteStaff(id);
            if (!!result && result.status === 200) {
                message.success('Xoá nhân viên thành công', 4);
                fetchListStaff();
            } else {
                message.error('Xoá nhân viên thất bại');
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
            title: 'Họ tên',
            width: 220,
            dataIndex: 'full_name',
            render: (text: string) => <p className="line-clamp-2">{text}</p>,
        },
        {
            title: 'Số điện thoại',
            width: 220,
            dataIndex: 'tel',
            render: (text: string) => <p className="line-clamp-2">{text}</p>,
        },
        {
            title: 'Trạm',
            dataIndex: 'name_station',
            render: (name_station: string) => name_station,
        },
        {
            title: 'Vị trí',
            dataIndex: 'position',
            render: (position: string) => position,
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
                            setOpenUpdateStaff(true);
                            setDataUpdate(record);
                        }}
                    >
                        <EditOutlined />
                    </Tag>
                    <Popconfirm
                        placement="topLeft"
                        title="Xác nhận xoá nhân viên"
                        description="Bạn có chắc chắn muốn xoá nhân viên này ?"
                        okText="Xác nhận"
                        cancelText="Huỷ"
                        onConfirm={() => handleDeleteStaff(record.key)}
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
        fetchListStaff();
    }, []);

    return (
        <Content className="m-5 min-[calc(100vh - 104px)] rounded-lg">
            <Card bordered={false}>
                <div className="flex items-center mb-4">
                    <h1 className="m-0 text-base">Danh sách nhân viên</h1>
                    <Space className="ml-auto">
                        <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddStaff(true)}>
                            Thêm mới
                        </Button>
                    </Space>
                </div>
                <Table
                    columns={columns}
                    rowKey="key"
                    dataSource={listStaff}
                    pagination={{
                        showSizeChanger: true,
                        showTotal: (total, range) => (
                            <div>
                                {range[0]}-{range[1]} trên {total} dòng
                            </div>
                        ),
                    }}
                />

                {/* Add Staff */}
                <AddStaff
                    openModalCreate={openAddStaff}
                    setOpenModalCreate={setOpenAddStaff}
                    fetchListStaff={fetchListStaff}
                />

                {/* Update Staff */}
                <UpdateStaff
                    openModal={openUpdateStaff}
                    setOpenModel={setOpenUpdateStaff}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    fetchListStaff={fetchListStaff}
                />
            </Card>
        </Content>
    );
};

export default Staff;
