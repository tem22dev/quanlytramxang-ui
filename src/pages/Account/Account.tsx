import { useEffect, useState } from 'react';
import { Layout, Card, Table, Space, Tag, Popconfirm, Button, App } from 'antd';

import * as userServices from '../../services/userServices';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';

interface User {
    id: number;
    full_name: string;
    tel: string;
    email: string;
    user_type: number;
    created_at: string;
}

const Account = () => {
    const { Content } = Layout;
    const { message } = App.useApp();
    const [openAddUser, setOpenAddUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [openUpdateUser, setOpenUpdateUser] = useState(false);
    const [listUser, setListUser] = useState<User[] | []>([]);

    // Fetch list user
    const fetchListUser = async () => {
        try {
            const result = await userServices.getListUser();

            if (!!result && result.status === 200) {
                const dataSource = result.data.map((item: User) => {
                    return {
                        key: item.id,
                        full_name: item.full_name,
                        tel: item.tel,
                        email: item.email,
                        created_at: item.created_at,
                    };
                });

                setListUser(dataSource);
            }
        } catch (error) {}
    };

    // Handle delete user
    const handleDeleteUser = async (id: number) => {
        try {
            const result = await userServices.deleteUser(id);
            if (!!result && result.status === 200) {
                message.success('Xoá tài khoản thành công', 4);
                fetchListUser();
            } else {
                message.error('Xoá tài khoản thất bại');
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
            title: 'Email',
            dataIndex: 'email',
            render: (address: string) => address,
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
                            setOpenUpdateUser(true);
                            setDataUpdate(record);
                        }}
                    >
                        <EditOutlined />
                    </Tag>
                    <Popconfirm
                        placement="topLeft"
                        title="Xác nhận xoá user"
                        description="Bạn có chắc chắn muốn xoá user này ?"
                        okText="Xác nhận"
                        cancelText="Huỷ"
                        onConfirm={() => handleDeleteUser(record.key)}
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
        fetchListUser();
    }, []);

    return (
        <Content className="m-5 min-[calc(100vh - 104px)] rounded-lg">
            <Card bordered={false}>
                <div className="flex items-center mb-4">
                    <h1 className="m-0 text-base">Danh sách tài khoản</h1>
                    <Space className="ml-auto">
                        <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenAddUser(true)}>
                            Thêm mới
                        </Button>
                    </Space>
                </div>
                <Table
                    columns={columns}
                    rowKey="key"
                    dataSource={listUser}
                    pagination={{
                        showSizeChanger: true,
                        showTotal: (total, range) => (
                            <div>
                                {range[0]}-{range[1]} trên {total} dòng
                            </div>
                        ),
                    }}
                />

                {/* Add User */}
                <AddUser
                    openModalCreate={openAddUser}
                    setOpenModalCreate={setOpenAddUser}
                    fetchListUser={fetchListUser}
                />

                {/* Update User */}
                <UpdateUser
                    openModal={openUpdateUser}
                    setOpenModel={setOpenUpdateUser}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    fetchListUser={fetchListUser}
                />
            </Card>
        </Content>
    );
};

export default Account;
