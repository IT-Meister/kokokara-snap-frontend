import {useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import {SearchBox} from "@mapbox/search-js-react";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import {Box, IconButton} from "@mui/material";
import {useMapMarker} from "./LocationMapMarker";

export default function LocationMapboxComponent() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [markerRotation, setMarkerRotation] = useState<number>(0); // State to keep track of marker rotation

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window === "undefined") return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 9,
    });

    mapRef.current.on("load", () => setMapLoaded(true));

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // Use the custom hook for handling marker interactions
  const {handleRotationChange} = useMapMarker({
    map: mapRef.current,
    markerRotation,
    setMarkerRotation,
  });

  return (
    <div style={{width: "100%", height: "100%"}}>
      {mapLoaded && (
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 1,
          }}
        >
          <SearchBox
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
            map={mapRef.current!}
            // @ts-ignore
            mapboxgl={mapboxgl}
          />
        </Box>
      )}

      <div
        id="map"
        ref={mapContainerRef}
        style={{
          width: "100%", // Set map width
          height: "100vh", // Set map height
          position: "relative", // Keep position relative to handle overlays
        }}
      ></div>

      {/* Rotate Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          position: "absolute", // Position it absolutely within the map container
          bottom: "90px",
          left: "50%",
          transform: "translateX(-50%)", // Center horizontally
          zIndex: 1,
        }}
      >
        <IconButton
          onClick={() => handleRotationChange(-10)} // Rotate left
          sx={{
            backgroundColor: "black",
            color: "#fff",
            padding: "8px",
            "&:hover": {
              backgroundColor: "darkgrey",
            },
          }}
        >
          <RotateLeftIcon />
        </IconButton>
        <IconButton
          onClick={() => handleRotationChange(10)} // Rotate right
          sx={{
            backgroundColor: "black",
            color: "#fff",
            padding: "8px",
            "&:hover": {
              backgroundColor: "darkgrey",
            },
          }}
        >
          <RotateRightIcon />
        </IconButton>
      </Box>
    </div>
  );
}
