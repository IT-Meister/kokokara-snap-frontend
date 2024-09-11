import {useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import {SearchBox} from "@mapbox/search-js-react";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import {Box, IconButton} from "@mui/material";

export default function LocationMapboxComponent() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [markerRotation, setMarkerRotation] = useState(0); // State to keep track of marker rotation

  const handleRotationChange = (change: number) => {
    if (markerRef.current) {
      const newRotation = markerRotation + change;
      setMarkerRotation(newRotation);
      markerRef.current.setRotation(newRotation);
    }
  };

  useEffect(() => {
    // Ensure that this runs only on the client
    if (typeof window === "undefined") return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 9,
    });

    mapRef.current.on("load", () => setMapLoaded(true));

    mapRef.current.on("click", (e) => {
      const {lng, lat} = e.lngLat;

      // make a custom marker element
      const el = document.createElement("div");
      el.className = "custom-marker";

      el.style.width = "50px";
      el.style.height = "50px";
      el.style.backgroundImage =
        "url('/2559828_camera_media_network_social_icon.png')";
      el.style.backgroundSize = "cover";
      el.style.cursor = "pointer";
      el.style.transformOrigin = "center";

      if (markerRef.current) {
        markerRef.current.setLngLat(e.lngLat);
        markerRef.current.getPopup()?.setText(`Lat: ${lat}, Lng: ${lng}`);
      } else {
        const newMarker = new mapboxgl.Marker(el)
          .setLngLat([lng, lat])
          .setPopup(
            new mapboxgl.Popup({offset: 25}).setText(`Lat: ${lat}, Lng: ${lng}`)
          )
          .addTo(mapRef.current!);

        markerRef.current = newMarker;
      }
    });

    return () => mapRef.current!.remove();
  }, []);

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
          height: "100%", // Set map height
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
