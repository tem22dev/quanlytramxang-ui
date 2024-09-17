import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ZoomControl from '@mapbox-controls/zoom';
import '@mapbox-controls/zoom/src/index.css';

import SearchMap from '../SearchMap ';

interface MapProps {
    options: object;
}

const Map: React.FC<MapProps> = ({ options }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const accessToken = import.meta.env.VITE_API_KEY_MAP as string;

    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;

        mapboxgl.accessToken = accessToken;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            cooperativeGestures: true,
            ...options,
        });

        mapRef.current.addControl(new mapboxgl.FullscreenControl());
        mapRef.current.addControl(new ZoomControl(), 'top-right');
    }, [options]);

    return (
        <div className="relative w-full h-[100vh]" ref={mapContainerRef}>
            <div className="absolute top-4 left-4 z-10">
                <SearchMap map={mapRef.current} accessToken={accessToken} />
            </div>
        </div>
    );
};

export default Map;
