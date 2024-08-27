"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";
import { SearchBox } from "@mapbox/search-js-react";
import { Box, Button, Paper } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import BackButton from "@/components/common/backButton";

export default function MapboxExample() {
  const [inputValue, setInputValue] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [moveEvent, setMoveEvent] = useState<MapMouseEvent | undefined>(
    undefined
  );
  const markerRef = useRef<mapboxgl.Marker | null>(null); // Using a ref for the marker
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const imagePath = searchParams.get("imagePath"); // Retrieve the imagePath data from the query parameters

  const handlexNextClick = () => {
    router.push("/post/details");
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Stack items vertically
          alignItems: "center", // Center items horizontally
          gap: 2, // Space between items
        }}
      >
        <BackButton /> {/* Using the reusable BackButton */}
        <Paper
          variant="outlined"
          sx={{
            width: 600,
            height: 800,
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
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Paper>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          flexDirection: "column", // Stack items vertically
          margin: "10px", // Add margin to the container
        }}
      >
        {/* Next Button */}
        <Box
          className="Next Button"
          sx={{
            display: "flex",
            alignSelf: "flex-end",
            mt: 2,
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            endIcon={<NavigateNextIcon />}
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

        <Box
          id="map"
          ref={mapContainerRef}
          sx={{
            width: "100%", // Set map width
            height: "100%", // Set map height
            position: "relative", // Keep position relative to handle overlays
            margin: "10px", // Add margin to the map container
          }}
        ></Box>

        <Box
          component="pre"
          id="info"
          sx={{
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
            backgroundColor: "#fff",
          }}
        >
          {moveEvent && (
            <>
              <br />
              {JSON.stringify(moveEvent.lngLat.wrap())}
            </>
          )}
        </Box>
      </Box>
    </div>
  );
}
