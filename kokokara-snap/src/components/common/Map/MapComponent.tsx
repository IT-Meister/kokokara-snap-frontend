import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3RzdWdhdTUyNSIsImEiOiJjbTAxdXFzazcxd2liMmlzMnQ4ZWE0cGR3In0.98x_7QdykqBFX_NKvKnGJQ";

const MapComponent: React.FC = () => {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-122.4194);
  const [lat, setLat] = useState(37.7749);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(parseFloat(map.current!.getCenter().lng.toFixed(4)));
      setLat(parseFloat(map.current!.getCenter().lat.toFixed(4)));
      setZoom(parseFloat(map.current!.getZoom().toFixed(2)));
    });

    // Adding marker on map click
    map.current.on("click", (e) => {
      const { lngLat } = e;
      new mapboxgl.Marker().setLngLat(lngLat).addTo(map.current!);
      console.log(`Clicked at ${lngLat.lng}, ${lngLat.lat}`);
    });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
};

export default MapComponent;
