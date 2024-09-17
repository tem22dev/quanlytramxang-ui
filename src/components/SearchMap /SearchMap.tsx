import React, { useRef, useState } from 'react';
import { App, Empty, Select } from 'antd';
import mapboxgl from 'mapbox-gl';

import * as siteServices from '../../services/siteServices';

interface SearchMapProps {
    map: mapboxgl.Map | null;
    accessToken: string;
}

interface ResultSearchProps {
    geometry: {
        coordinates: [number, number];
    };
    id: string;
    properties: {
        coordinates: {
            latitude: number;
            longitude: number;
        };
        full_address: string;
        place_formatted: string;
        bbox?: number[];
    };
}

const SearchMap: React.FC<SearchMapProps> = ({ map, accessToken }) => {
    const { message } = App.useApp();
    const [searchResults, setSearchResults] = useState<ResultSearchProps[]>([]);
    const markerRef = useRef<mapboxgl.Marker | null>(null);

    const handleSearch = async (value: string) => {
        if (!value) return setSearchResults([]);

        try {
            const response: any = await siteServices.searchMap(
                `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
                    value,
                )}&access_token=${accessToken}&language=vi&limit=10&proximity=105.14427879379264,9.916562292555803`,
            );
            setSearchResults(response.features);
        } catch (error) {
            message.error('Lỗi khi tìm nạp kết quả mã hóa địa lý', 4);
            console.error('Error fetching geocoding results:', error);
        }
    };

    const handleChange = (value: string) => {
        const [lng, lat] = value.split(',').map(Number);

        if (!isNaN(lng) && !isNaN(lat)) {
            if (map) {
                map.flyTo({
                    center: [lng, lat],
                    zoom: 12,
                });

                // Xóa marker cũ nếu có
                if (markerRef.current) {
                    markerRef.current.remove();
                }

                // Tạo marker mới và thêm vào bản đồ
                markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map!);
            }
        } else {
            message.error('Tọa độ không hợp lệ', 4);
            console.error('Invalid coordinates:', lng, lat);
        }
    };

    return (
        <Select
            showSearch
            style={{ width: 300 }}
            placeholder="Nhập địa chỉ"
            onSearch={handleSearch}
            onSelect={handleChange}
            notFoundContent={<Empty description="Không có dữ liệu" />}
            filterOption={(input, option) => option?.label?.toLowerCase().includes(input.toLowerCase()) ?? false}
            options={searchResults.map((result: ResultSearchProps) => ({
                key: result.id,
                value: `${result.properties.coordinates.longitude},${result.properties.coordinates.latitude}`,
                label: result.properties.full_address,
                bbox: result.properties.bbox,
            }))}
        />
    );
};

export default SearchMap;
