import { Layout } from 'antd';

import Map from '../../components/Map';

function GasStation() {
    const { Content } = Layout;

    const optionsMap = {
        center: [105.14427879379264, 9.916562292555803],
        style: 'mapbox://styles/mapbox/standard',
        zoom: 2,
    };

    return (
        <Content className="m-4 min-h-[calc(100vh - 104px)] rounded-lg">
            <div className="bg-white rounded-lg p-4 mt-3">
                <Map options={optionsMap} />
            </div>
        </Content>
    );
}

export default GasStation;
