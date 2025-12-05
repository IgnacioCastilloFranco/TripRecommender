import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Destination } from '../types';

// Fix for default marker icon in Leaflet with Vite
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapViewProps {
  destinations: Destination[];
  selectedDestination: Destination | null;
  onSelectDestination: (destination: Destination) => void;
}

// Component to handle map view updates
const MapUpdater: React.FC<{ destination: Destination | null; destinations: Destination[] }> = ({ 
  destination, 
  destinations 
}) => {
  const map = useMap();
  const prevDestinationRef = useRef<Destination | null>(null);

  useEffect(() => {
    if (destination && destination.id !== prevDestinationRef.current?.id) {
      map.flyTo([destination.latitude, destination.longitude], 10, {
        duration: 1.5,
      });
      prevDestinationRef.current = destination;
    } else if (!destination && destinations.length > 0) {
      // Fit bounds to show all destinations
      const bounds = L.latLngBounds(
        destinations.map((d) => [d.latitude, d.longitude] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
    }
  }, [destination, destinations, map]);

  return null;
};

const MapView: React.FC<MapViewProps> = ({
  destinations,
  selectedDestination,
  onSelectDestination,
}) => {
  const defaultCenter: [number, number] = [20, 0];
  const defaultZoom = 2;

  return (
    <div 
      className="w-full h-full min-h-[300px] rounded-xl overflow-hidden shadow-lg"
      role="application"
      aria-label="Map showing travel destinations"
    >
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ minHeight: '300px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater destination={selectedDestination} destinations={destinations} />
        
        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            position={[destination.latitude, destination.longitude]}
            icon={selectedDestination?.id === destination.id ? selectedIcon : icon}
            eventHandlers={{
              click: () => onSelectDestination(destination),
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-semibold text-gray-900">{destination.name}</h3>
                <p className="text-sm text-gray-600">{destination.country}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Best time: {destination.bestTimeToVisit}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
