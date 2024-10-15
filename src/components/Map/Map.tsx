import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ZoomControl from '@mapbox-controls/zoom';
import '@mapbox-controls/zoom/src/index.css';
import {
    App,
    Button,
    Form,
    Image,
    Input,
    Modal,
    Popconfirm,
    Popover,
    Select,
    Upload,
    Typography,
    Flex,
    Rate,
    Descriptions,
    Badge,
    Card,
    Tooltip,
} from 'antd';
import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    FrownOutlined,
    MehOutlined,
    PieChartOutlined,
    PlusCircleOutlined,
    PlusOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import { createRoot } from 'react-dom/client';
import type { DescriptionsProps } from 'antd';

import SearchMap from '../SearchMap ';
import images from '../../assets/images';
import * as stationServices from '../../services/stationServices';
import * as siteServices from '../../services/siteServices';
import * as userServices from '../../services/userServices';

interface MapProps {
    options: object;
}

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

const { Option } = Select;
const { Title } = Typography;

const Map: React.FC<MapProps> = ({ options }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map>(null!);
    const [popupPosition, setPopupPosition] = useState<{ lng: number; lat: number } | null>(null);
    const [popupPixelPosition, setPopupPixelPosition] = useState<{ x: number; y: number } | null>(null);
    const [isPopconfirmOpen, setIsPopconfirmOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [listUser, setListUser] = useState([]);
    const [listStation, setListStation] = useState<Station[] | []>([]);
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);

    const [form] = Form.useForm();
    const { message } = App.useApp();
    const accessToken = import.meta.env.VITE_API_KEY_MAP as string;

    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;

        mapboxgl.accessToken = accessToken;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            cooperativeGestures: false,
            ...options,
        });

        // mapRef.current.addControl(new mapboxgl.FullscreenControl());
        mapRef.current.addControl(new ZoomControl(), 'top-right');

        // Event click handler
        mapRef.current.on('contextmenu', (e) => {
            const coordinates = e.lngLat;

            setPopupPosition({
                lng: coordinates.lng,
                lat: coordinates.lat,
            });

            const pixelCoords = mapRef.current?.project([coordinates.lng, coordinates.lat]);
            setPopupPixelPosition(pixelCoords);
            setIsPopconfirmOpen(true);
        });
    }, [options]);

    // handle show card info station
    const handleShowCard = (station: Station) => {
        setSelectedStation(station);
    };

    // Add custom markers for each gas station
    const customIcons: Record<number, React.ReactNode> = {
        1: <FrownOutlined />,
        2: <FrownOutlined />,
        3: <MehOutlined />,
        4: <SmileOutlined />,
        5: <SmileOutlined />,
    };
    listStation.forEach((station) => {
        // Create a custom DOM element for the marker
        const el = document.createElement('div');
        el.className = 'marker';
        const content = (
            <>
                <Image width={240} height={120} src={`${import.meta.env.VITE_BASE_URL_ROOT}${station.image}`} />
                <Title level={5}>{station.name_station}</Title>
                <Flex gap="middle">
                    <Rate defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} />
                </Flex>
                <Flex gap="middle">
                    <p>{station.user.full_name}</p>
                    <Badge status="processing" color="green" text="Đang hoạt động" />
                </Flex>
            </>
        );

        const popoverElement = (
            <div className="z-50 flex flex-col items-center max-w-28 text-center">
                <Popover content={content} title="Thông tin trạm">
                    <img
                        src={images.marker}
                        onClick={() => handleShowCard(station)}
                        alt="Gas Station"
                        className="w-8 h-8"
                    />
                </Popover>
                <div className="mr-1 text-xs text-[#28ad00] text-center">{station.name_station}</div>
            </div>
        );
        createRoot(el).render(popoverElement);

        // Add marker to map
        new mapboxgl.Marker(el).setLngLat([station.lng, station.lat]).addTo(mapRef.current);
    });

    const handleAdd = () => {
        setIsModalOpen(true);
        setIsPopconfirmOpen(false);
    };

    const handleCancel = () => {
        setIsPopconfirmOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleCloseCard = () => {
        setSelectedStation(null);
    };

    // Handle create new station
    const handleModalSubmit = () => {
        form.validateFields().then(async (values) => {
            setIsSubmit(true);
            const { user_id, name_station, lng, lat, image, address } = values;
            let imgName = '';

            try {
                // Upload file
                const formDataFile = new FormData();
                formDataFile.append('file', image[0]?.originFileObj);
                formDataFile.append('topic', 'map');

                const uploadResult = await siteServices.uploadFile(formDataFile);
                if (!!uploadResult && uploadResult.status === 200) {
                    imgName = uploadResult.data.image;
                } else {
                    throw new Error('Thêm ảnh thất bại');
                }

                // Create station
                const formData = new FormData();
                formData.append('user_id', user_id.toString());
                formData.append('name_station', name_station);
                formData.append('lng', lng.toString());
                formData.append('lat', lat.toString());
                formData.append('image', imgName);
                formData.append('address', address);

                const stationResult = await stationServices.createStation(formData);
                if (!!stationResult && stationResult.status === 200) {
                    fetchListStation();
                    message.success('Thêm trạm thành công!', 4);
                } else {
                    throw new Error('Thêm trạm thất bại');
                }
            } catch (error: any) {
                message.error('Thêm trạm thất bại, vui lòng thử lại sau', 4);
                throw new Error(error.message);
            } finally {
                setIsSubmit(false);
                setIsModalOpen(false);
                form.resetFields();
            }
        });
    };

    // Fetch list station
    const fetchListStation = async () => {
        try {
            const result = await stationServices.getListStation();

            if (!!result && result.status === 200) {
                setListStation(result.data);
            }
        } catch (error) {}
    };

    // Fetch list user
    const fetchListUser = async () => {
        try {
            const result = await userServices.getListUser();

            if (!!result && result.status === 200) {
                setListUser(result.data);
            }
        } catch (error) {}
    };

    useEffect(() => {
        fetchListUser();
        fetchListStation();
    }, []);

    return (
        <div className="relative w-full h-[100vh]" ref={mapContainerRef}>
            <div className="absolute top-4 left-4 z-10">
                <SearchMap map={mapRef.current} accessToken={accessToken} />
            </div>

            {popupPosition && popupPixelPosition && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${popupPixelPosition.x}px`,
                        top: `${popupPixelPosition.y}px`,
                        transform: 'translate(40%, 100%)',
                    }}
                >
                    <Popconfirm
                        title="Thêm trạm"
                        description="Bạn muốn thêm tại điểm này?"
                        open={isPopconfirmOpen}
                        onConfirm={handleAdd}
                        onCancel={handleCancel}
                        okText="Thêm"
                        cancelText="Huỷ"
                    />
                </div>
            )}

            <Modal
                title="Thêm trạm mới"
                open={isModalOpen}
                onCancel={handleModalCancel}
                onOk={handleModalSubmit}
                maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={handleModalCancel}>
                        Huỷ
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={isSubmit}
                        icon={<PlusCircleOutlined />}
                        onClick={handleModalSubmit}
                    >
                        Thêm
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    {/* Upload Image */}
                    <Form.Item
                        name="image"
                        label="Upload Ảnh"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        rules={[{ required: true, message: 'Vui lòng tải ảnh lên!' }]}
                    >
                        <Upload multiple={true} listType="picture-card" beforeUpload={() => false}>
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    {/* Name Station */}
                    <Form.Item
                        name="name_station"
                        label="Tên Trạm"
                        rules={[{ required: true, message: 'Vui lòng nhập tên trạm!' }]}
                    >
                        <Input placeholder="Nhập tên trạm" />
                    </Form.Item>

                    {/* Select User */}
                    <Form.Item
                        name="user_id"
                        label="Chọn chủ trạm"
                        rules={[{ required: true, message: 'Vui lòng chọn chủ trạm!' }]}
                    >
                        <Select placeholder="Chọn chủ trạm">
                            {listUser &&
                                listUser.map((user: { id: number; full_name: string }) => (
                                    <Option key={user.id} value={`${user.id}`}>
                                        {user?.full_name}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>

                    {/* Latitude */}
                    <Form.Item
                        name="lat"
                        label="Vĩ độ"
                        initialValue={popupPosition?.lat}
                        rules={[{ required: true, message: 'Vui lòng nhập vĩ độ!' }]}
                    >
                        <Input disabled value={popupPosition?.lat} />
                    </Form.Item>

                    {/* Longitude */}
                    <Form.Item
                        name="lng"
                        label="Kinh độ"
                        initialValue={popupPosition?.lng}
                        rules={[{ required: true, message: 'Vui lòng nhập kinh độ!' }]}
                    >
                        <Input disabled value={popupPosition?.lng} />
                    </Form.Item>

                    {/* Address */}
                    <Form.Item
                        name="address"
                        label="Địa chỉ"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input placeholder="Nhập địa chỉ" />
                    </Form.Item>
                </Form>
            </Modal>

            {selectedStation && (
                <div className="absolute top-[50%] right-0 z-50 translate-y-[-50%]">
                    <Card
                        title="Chi tiết trạm"
                        extra={<CloseOutlined onClick={handleCloseCard} style={{ cursor: 'pointer' }} />}
                        style={{ width: 400, overflowY: 'scroll', height: '552px' }}
                        size="small"
                        cover={
                            <img
                                style={{ height: '200px', width: '100%' }}
                                src={`${import.meta.env.VITE_BASE_URL_ROOT}${selectedStation.image}`}
                            />
                        }
                        actions={[
                            <Tooltip title="Xem thống kê">
                                <PieChartOutlined key="statistical" />
                            </Tooltip>,
                            <Tooltip title="Chỉnh sửa">
                                <EditOutlined key="edit" />
                            </Tooltip>,
                            <Tooltip title="Xoá">
                                <DeleteOutlined key="delete" />
                            </Tooltip>,
                        ]}
                    >
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Mã trạm">{selectedStation.id}</Descriptions.Item>
                            <Descriptions.Item label="Tên trạm">{selectedStation.name_station}</Descriptions.Item>
                            <Descriptions.Item label="Chủ trạm">{selectedStation.user.full_name}</Descriptions.Item>
                            <Descriptions.Item label="Kinh độ">{selectedStation.lng}</Descriptions.Item>
                            <Descriptions.Item label="Vĩ độ">{selectedStation.lat}</Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ">{selectedStation.address}</Descriptions.Item>
                            <Descriptions.Item label="Ngày tạo">{selectedStation.created_at}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Map;
