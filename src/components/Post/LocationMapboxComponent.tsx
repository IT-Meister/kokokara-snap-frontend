import {useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import {SearchBox} from "@mapbox/search-js-react";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import {Box, IconButton} from "@mui/material";
import {useMapMarker} from "./LocationMapMarker";

interface MapComponentProps {
  markerRotation: number;
  setMarkerRotation: React.Dispatch<React.SetStateAction<number>>;
}

export default function LocationMapboxComponent({
  markerRotation,
  setMarkerRotation,
}: MapComponentProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window === "undefined") return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [139.75, 35.6764],
      zoom: 12,
      attributionControl: false,
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
    <div style={{position: "relative", width: "100%", height: "100vh"}}>
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
      <Box
        ref={mapContainerRef}
        id="map"
        sx={{
          width: "100%", // Set map width
          height: "100vh", // Set map height
          borderRadius: 8,
        }}
      ></Box>

      {/* Rotate Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          position: "absolute", // Position it absolutely within the map container
          bottom: 10,
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
