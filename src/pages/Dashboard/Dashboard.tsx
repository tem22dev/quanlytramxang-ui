import { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Statistic } from 'antd';
import CountUp from 'react-countup';

import Map from '../../components/Map';
import * as siteService from '../../services/siteServices';

function Dashboard() {
    const { Content } = Layout;
    const [counterUser, setCounterUser] = useState(0);

    const formatter = (value: any) => <CountUp end={value} separator="," />;

    const fetchCounter = async () => {
        const resCounterUser = await siteService.counterUser();

        if (resCounterUser) setCounterUser(resCounterUser.data.countAccount);
    };

    const optionsMap = {
        center: [105.14427879379264, 9.916562292555803],
        style: 'mapbox://styles/mapbox/standard',
        zoom: 2,
    };

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
                        <Map options={optionsMap} />
                    </Card>
                </Col>
            </Row>
        </Content>
    );
}

export default Dashboard;
