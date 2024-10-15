import { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Statistic, Table, Image } from 'antd';
import CountUp from 'react-countup';

import * as siteService from '../../services/siteServices';

function Dashboard() {
    const { Content } = Layout;
    const [counterUser, setCounterUser] = useState(0);

    const formatter = (value: any) => <CountUp end={value} separator="," />;

    const fetchCounter = async () => {
        const resCounterUser = await siteService.counterUser();

        if (resCounterUser) setCounterUser(resCounterUser.data.countAccount);
    };

    const dataSource = [
        {
            key: '1',
            name_station: 'Mike',
            thumbnail: 'assets/maps/image_20240920205043VVijT2XdSU.jpg',
            user_id: 'Mike',
            address: '10 Downing Street',
            created_at: '12:30 | 12-12-2023',
        },
        {
            key: '2',
            name_station: 'John',
            thumbnail: 'assets/maps/image_20240920205043VVijT2XdSU.jpg',
            user_id: 'Mike',
            address: '10 Downing Street',
            created_at: '12:30 | 12-12-2022',
        },
    ];

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
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            render: (text: string) => (
                <div>
                    <Image width={50} height={50} src={`${import.meta.env.VITE_BASE_URL_ROOT}${text}`} />
                </div>
            ),
        },
        {
            title: 'Chủ trạm',
            width: 220,
            dataIndex: 'user_id',
            render: (text: string) => <p className="line-clamp-2">{text}</p>,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            render: (address: string) => address,
        },
        {
            title: 'Thời gian',
            dataIndex: 'created_at',
            render: (date: string) => date,
        },
    ];

    useEffect(() => {
        fetchCounter();
    }, []);

    return (
        <Content className="m-5 min-[calc(100vh - 104px)] rounded-lg">
            <Row gutter={[12, 12]}>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic title="Số Hoá Đơn" value={10} formatter={formatter} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic title="Số Trạm Xăng" value={20} formatter={formatter} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic title="Số Nhân Viên" value={75} formatter={formatter} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic title="Số Người Dùng" value={counterUser} formatter={formatter} />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card bordered={false}>
                        <div className="flex items-center mb-4">
                            <h1 className="m-0 text-base">Danh sách trạm</h1>
                        </div>
                        <Table
                            columns={columns}
                            rowKey="key"
                            dataSource={dataSource}
                            pagination={{
                                showSizeChanger: true,
                                showTotal: (total, range) => (
                                    <div>
                                        {range[0]}-{range[1]} trên {total} dòng
                                    </div>
                                ),
                            }}
                        />
                    </Card>
                </Col>
            </Row>
        </Content>
    );
}

export default Dashboard;
