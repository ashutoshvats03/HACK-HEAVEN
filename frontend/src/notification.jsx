import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Threats data with coordinates within 10 km of the user's location
const threats = [
  { type: 'Accident', coords: [22.5121066, 88.3972014], radius: 300 }, // Radius in meters
  { type: 'Theft', coords: [22.5021066, 88.3932014], radius: 300 },
  { type: 'Road Construction', coords: [22.5071066, 88.3902014], radius: 300 },
];

const MapComponent = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Initialize the map centered on your coordinates
    const mapInstance = L.map('map', {
      center: [22.5061066, 88.3952014], // Center on your location
      zoom: 13,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(mapInstance);

    setMap(mapInstance);

    // Clean up on unmount
    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Update map view and add marker for user location
        if (map) {
          map.setView([latitude, longitude], 13);
          L.marker([latitude, longitude]).addTo(map)
            .bindPopup('You are here!')
            .openPopup();
        }
      }, () => {
        alert('Unable to retrieve your location.');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, [map]);

  useEffect(() => {
    // Draw threat areas on the map
    if (map) {
      threats.forEach(threat => {
        const { type, coords, radius } = threat;

        // Create a red circle for the threat area
        L.circle(coords, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: radius, // Radius in meters
        }).addTo(map).bindPopup(`${type} detected!`);
      });
    }
  }, [map]);

  return <div id="map" style={{ height: '500px' }}></div>;
};

export default MapComponent;
