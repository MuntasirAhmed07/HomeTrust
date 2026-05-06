import { Icon, divIcon, point } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import '../App.css';
import imageMarker from '../assets/marker.png';

const Map = ({
  locations,
  selectedLocation,
  setSelectedLocation,
  showPanel,
  setShowPanel,
}) => {
  const customIcon = new Icon({
    iconUrl: imageMarker,
    iconSize: [25, 41],
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
      <MapContainer center={[23.8103, 90.4125]} zoom={13}>
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
