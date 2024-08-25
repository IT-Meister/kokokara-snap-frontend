"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { SearchBox } from "@mapbox/search-js-react";
import { Box, Button, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

const MapboxExample = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [moveEvent, setMoveEvent] = useState<MapMouseEvent | undefined>(
    undefined
  );
  const markerRef = useRef<mapboxgl.Marker | null>(null); // Using a ref for the marker
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();
  const handlexNextClick = () => {
    router.push("/");
  };

  const MAPBOX_TOKEN =
    "pk.eyJ1Ijoia3RzdWdhdTUyNSIsImEiOiJjbTAxdXFzazcxd2liMmlzMnQ4ZWE0cGR3In0.98x_7QdykqBFX_NKvKnGJQ";

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 9,
    });

    mapRef.current.on("mousemove", (e) => {
      setMoveEvent(e);
    });

    mapRef.current.on("load", () => {
      setMapLoaded(true);
    });

    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;

      if (markerRef.current) {
        // If marker already exists, update its position
        markerRef.current.setLngLat(e.lngLat);
        markerRef.current.getPopup()?.setText(`Lat: ${lat}, Lng: ${lng}`); // Update popup text
      } else {
        // Create a new marker and set it at the click position
        const newMarker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setText(
              `Lat: ${lat}, Lng: ${lng}`
            )
          )
          .addTo(mapRef.current!);

        markerRef.current = newMarker; // Store marker in ref
      }
    });

    return () => {
      mapRef.current!.remove();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex", // Use Flexbox to create a two-column layout
        width: "100%",
        height: "100vh",
        alignItems: "center", // Center vertically
      }}
    >
      <Paper // Image preview on the left side
        variant="outlined"
        sx={{
          width: 800,
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          backgroundColor: "#fafafa",
          margin: "10px", // Add margin to the Paper component
        }}
      >
        <img
          src="https://via.placeholder.com/400x300"
          alt="Preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Paper>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          flexDirection: "column", // Stack items vertically
          margin: "10px", // Add margin to the container div
        }}
      >
        {mapLoaded && (
          <SearchBox
            accessToken={MAPBOX_TOKEN}
            map={mapRef.current!} // Safe because of mapLoaded check
            mapboxgl={mapboxgl}
            value={inputValue}
            onChange={(d) => {
              setInputValue(d);
            }}
            marker={false}
          />
        )}
        <div
          id="map"
          ref={mapContainerRef}
          style={{
            width: "100%", // Set map width
            height: "100%", // Set map height
            position: "relative", // Keep position relative to handle overlays
            margin: "10px", // Add margin to the map container
          }}
        ></div>
        <pre
          id="info"
          style={{
            display: "table",
            position: "relative",
            margin: "10px", // Add margin to the pre element
            whiteSpace: "pre-wrap",
            padding: "10px",
            border: "none",
            borderRadius: "3px",
            fontSize: "12px",
            textAlign: "center",
            color: "#222",
            background: "#fff",
          }}
        >
          {moveEvent && (
            <>
              <br />
              {JSON.stringify(moveEvent.lngLat.wrap())}
            </>
          )}
        </pre>
        {/* Next Button */}
        <Box
          className="Next Button"
          sx={{
            display: "flex",
            mt: 2,
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e60023",
              color: "#fff",
              padding: "8px 24px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            onClick={handlexNextClick}
          >
            次へ
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default MapboxExample;
