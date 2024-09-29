"use client";

import React, {useState, useRef, useEffect} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const MapWithImage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  const [markerRotation, setMarkerRotation] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initializeMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40], // Initial center coordinates
      zoom: 9,
    });

    initializeMap.on("load", () => {
      setMap(initializeMap);
    });

    // Add or update marker when clicking on the map
    initializeMap.on("click", (e) => {
      if (!marker) {
        const newMarker = new mapboxgl.Marker({
          draggable: true,
          rotation: markerRotation,
        })
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(initializeMap);
        setMarker(newMarker);
      } else {
        marker.setLngLat([e.lngLat.lng, e.lngLat.lat]);
      }
    });

    return () => {
      initializeMap.remove();
    };
  }, [marker, markerRotation]);

  // Rotate the marker
  const rotateMarker = (direction: "left" | "right") => {
    const newRotation =
      direction === "left" ? markerRotation - 10 : markerRotation + 10;
    setMarkerRotation(newRotation);

    if (marker) {
      marker.setRotation(newRotation);
    }
  };

  // Search functionality (placeholder, expand based on your needs)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Implement search logic (e.g., use Mapbox Geocoding API)
  };

  return (
    <div style={{display: "flex", height: "100vh", width: "100%"}}>
      {/* Left half: Image */}
      <div style={{flex: 1, background: "#f3f3f3"}}>
        <img
          src="/path/to/your/image.jpg"
          alt="Left-side Image"
          style={{width: "100%", height: "100%", objectFit: "cover"}}
        />
      </div>

      {/* Right half: Map */}
      <div style={{flex: 1, position: "relative"}}>
        <div style={{position: "absolute", top: 10, left: 10, zIndex: 1}}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            style={{padding: "5px", fontSize: "14px", width: "200px"}}
          />
        </div>

        {/* Mapbox map */}
        <div ref={mapContainerRef} style={{width: "100%", height: "100%"}} />

        {/* Rotation buttons */}
        <div style={{position: "absolute", bottom: 20, left: 20, zIndex: 1}}>
          <button onClick={() => rotateMarker("left")}>Rotate Left</button>
          <button onClick={() => rotateMarker("right")}>Rotate Right</button>
        </div>
      </div>
    </div>
  );
};

export default MapWithImage;
