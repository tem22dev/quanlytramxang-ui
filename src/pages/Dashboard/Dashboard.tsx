import { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Statistic, Table, Image } from 'antd';
import CountUp from 'react-countup';

import * as siteService from '../../services/siteServices';
import * as stationServices from '../../services/stationServices';

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

function Dashboard() {
    const { Content } = Layout;
    const [counterUser, setCounterUser] = useState(0);
    const [counterInvoices, setCounterInvoices] = useState(0);
    const [counterStation, setCounterStation] = useState(0);
    const [counterStaff, setCounterStaff] = useState(0);
    const [listStation, setListStation] = useState<Station[] | []>([]);

    const formatter = (value: any) => <CountUp end={value} separator="," />;

    const fetchCounter = async () => {
        const resCounterUser = await siteService.counterUser();
        const resCounterInvoices = await siteService.counterInvoices();
        const resCounterStaff = await siteService.counterStaff();
        const resCounterStation = await siteService.counterStation();

        if (resCounterUser) setCounterUser(resCounterUser.data.countAccount);
        if (resCounterInvoices) setCounterInvoices(resCounterInvoices.data.countInvoice);
        if (resCounterStaff) setCounterStaff(resCounterStaff.data.countStaff);
        if (resCounterStation) setCounterStation(resCounterStation.data.countGasStation);
    };

    // Fetch list station
    const fetchListStation = async () => {
        try {
            const result = await stationServices.getListStation();

            if (!!result && result.status === 200) {
                const dataSource = result.data.map((item: Station) => {
                    return {
                        key: item.id,
                        name_station: item.name_station,
                        thumbnail: item.image,
                        user_id: item.user.full_name,
                        address: item.address,
                        created_at: item.created_at,
                    };
                });

                setListStation(dataSource);
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
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            render: (text: string) => (
                <div>
                    <Image width={120} height={60} src={`${import.meta.env.VITE_BASE_URL_ROOT}${text}`} />
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
        fetchListStation();
    }, []);

    return (
        <Content className="m-5 min-[calc(100vh - 104px)] rounded-lg">
            <Row gutter={[12, 12]}>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic title="Hoá Đơn" value={counterInvoices} formatter={formatter} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic title="Trạm Xăng" value={counterStation} formatter={formatter} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic title="Nhân Viên" value={counterStaff} formatter={formatter} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic title="Người Dùng" value={counterUser} formatter={formatter} />
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
                            dataSource={listStation}
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
