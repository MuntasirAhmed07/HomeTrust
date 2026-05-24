import { Icon, divIcon, point } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import '../App.css';
import imageMarker from '../assets/marker.svg';

const GestureHandler = () => {
  const map = useMap();
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    const container = map.getContainer();

    const hint = document.createElement('div');
    hint.className = 'map-gesture-hint';
    hint.textContent = window.navigator.platform.includes('Mac')
      ? 'Hold ⌘ Cmd to zoom the map'
      : 'Hold Ctrl to zoom the map';
    hint.style.display = 'none';
    container.appendChild(hint);

    const onWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        map.scrollWheelZoom.enable();
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => map.scrollWheelZoom.disable(), 100);
      } else {
        e.preventDefault();
        e.stopPropagation();
        hint.style.display = 'flex';
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          hint.style.display = 'none';
        }, 1500);
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', onWheel);
      clearTimeout(timerRef.current);
      if (container.contains(hint)) container.removeChild(hint);
    };
  }, [map]);

  return null;
};

const Map = ({
  locations,
  selectedLocation,
  setSelectedLocation,
  showPanel,
  setShowPanel,
}) => {
  const customIcon = new Icon({
    iconUrl: imageMarker,
    iconSize: [35, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  const createIconCluster = (cluster) => {
    return divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: 'custom-marker-cluster',
      iconSize: point(33, 33, true),
    });
  };

  return (
    <>
      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={10}
        scrollWheelZoom={false}>
        <GestureHandler />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          minZoom={0}
          maxZoom={19}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createIconCluster}>
          {locations.map((location, idx) => (
            <Marker
              key={idx}
              position={[location.latitude, location.longitude]}
              icon={customIcon}
              closeOnClick={false}
              eventHandlers={{
                click: () => {
                  setSelectedLocation(location);
                  setShowPanel(!showPanel);
                },
              }}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLocation(location);
                  setShowPanel(!showPanel);
                }}></div>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
};

export default Map;
