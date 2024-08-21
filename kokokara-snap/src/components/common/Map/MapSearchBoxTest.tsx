import { useRef, useEffect, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoia3RzdWdhdTUyNSIsImEiOiJjbTAxdXFzazcxd2liMmlzMnQ4ZWE0cGR3In0.98x_7QdykqBFX_NKvKnGJQ";

export default function MapWithGeocoder() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      mapInstanceRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });

      mapInstanceRef.current.on("load", () => {
        setMapLoaded(true);
      });
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  return (
    <>
      {mapLoaded && (
        <SearchBox
          accessToken={MAPBOX_TOKEN}
          map={mapInstanceRef.current!} // Safe because of mapLoaded check
          mapboxgl={mapboxgl}
          value={inputValue}
          onChange={(d) => {
            setInputValue(d);
          }}
          marker
        />
      )}
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{ height: "100vh" }}
      />
    </>
  );
}
