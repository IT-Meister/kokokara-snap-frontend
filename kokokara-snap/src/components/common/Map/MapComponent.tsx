import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoia3RzdWdhdTUyNSIsImEiOiJjbTAxdXFzazcxd2liMmlzMnQ4ZWE0cGR3In0.98x_7QdykqBFX_NKvKnGJQ"; // Replace with your Mapbox access token

const MapComponent: React.FC = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
  });

  const [selectedLocation, setSelectedLocation] = useState<{
    longitude: number;
    latitude: number;
    description: string;
  } | null>(null);

  const locations = [
    {
      longitude: -122.4194,
      latitude: 37.7749,
      description: "Property in San Francisco",
    },
    {
      longitude: -122.418,
      latitude: 37.7749,
      description: "Property in New York",
    },
    {
      longitude: -118.243683,
      latitude: 34.052235,
      description: "Property in Los Angeles",
    },
  ];

  return (
    <ReactMapGL
      {...viewport}
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={(evt) => setViewport(evt.viewState)}
    >
      {locations.map((location, index) => (
        <Marker
          key={index}
          longitude={location.longitude}
          latitude={location.latitude}
        >
          <div
            onClick={() => setSelectedLocation(location)}
            style={{
              backgroundColor: "#fff",
              padding: "5px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            📍
          </div>
        </Marker>
      ))}

      {selectedLocation && (
        <Popup
          longitude={selectedLocation.longitude}
          latitude={selectedLocation.latitude}
          onClose={() => setSelectedLocation(null)}
          closeOnClick={true}
          anchor="top"
        >
          <div>{selectedLocation.description}</div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default MapComponent;
