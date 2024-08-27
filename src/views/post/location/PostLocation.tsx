"use client";

import React, {useEffect, useRef, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, {MapMouseEvent} from "mapbox-gl";
import {SearchBox} from "@mapbox/search-js-react";
import {Box, Button, Paper} from "@mui/material";

export default function MapboxExample() {
  const [inputValue, setInputValue] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapSnapshotPath, setMapSnapshotPath] = useState<string | null>(null);
  const [moveEvent, setMoveEvent] = useState<MapMouseEvent | undefined>(
    undefined
  );
  const markerRef = useRef<mapboxgl.Marker | null>(null); // Using a ref for the marker
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();
  const imagePath = searchParams.get("imagePath"); // Retrieve the imagePath data from the query parameters

  const captureScreenshot = () => {
    if (!mapRef.current) return;
    const canvas = mapRef.current.getCanvas();

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setMapSnapshotPath(url); // Set the Object URL as the map snapshot path
      }
    }, "image/png");
  };

  const router = useRouter();
  const handleNextClick = () => {
    captureScreenshot();
    if (imagePath && mapSnapshotPath) {
      // Here, we pass the Object URL via router push
      router.push(
        `/post/details?imagePath=${imagePath}&mapSnapshotPath=${encodeURIComponent(
          mapSnapshotPath
        )}`
      );
    } else {
      alert("Please select an image and capture a map screenshot");
    }
  };

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

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
      const {lng, lat} = e.lngLat;

      if (markerRef.current) {
        // If marker already exists, update its position
        markerRef.current.setLngLat(e.lngLat);
        markerRef.current.getPopup()?.setText(`Lat: ${lat}, Lng: ${lng}`); // Update popup text
      } else {
        // Create a new marker and set it at the click position
        const newMarker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({offset: 25}).setText(
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
          src={decodeURIComponent(imagePath!)}
          // src={imagePath!}
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
            accessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
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
              <br/>
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
            onClick={handleNextClick}
          >
            次へ
          </Button>
        </Box>
      </div>
    </div>
  );
}
