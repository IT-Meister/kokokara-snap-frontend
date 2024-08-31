import React, {useEffect, useRef, useState} from "react";

import mapboxgl, {LngLatLike} from "mapbox-gl";
import {SearchBox} from "@mapbox/search-js-react";
import "mapbox-gl/dist/mapbox-gl.css";

import {Box, Typography} from "@mui/material";

import MapCustomMarker from "./MapCustomMarker";
import PhotoDetailView from "./MapPhotoDetailsPanel";

// DB
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      properties: {
        message: "Foo",
        imageId: 1011,
        iconSize: [60, 60],
      },
      geometry: {
        coordinates: [-66.324462, -16.024695],
      },
    },
    {
      properties: {
        message: "Bar",
        imageId: 870,
        iconSize: [50, 50],
      },
      geometry: {
        coordinates: [-61.21582, -15.971891],
      },
    },
    {
      properties: {
        message: "Baz",
        imageId: 837,
        iconSize: [40, 40],
      },
      geometry: {
        coordinates: [-63.292236, -18.281518],
      },
    },
  ],
};

export default function MapComponent() {
  // Initialize with null instead of leaving it undefined
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isMapReady, setIsMapReady] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState<{
    title: string;
    imageUrl: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
    if (mapContainerRef.current) {
      // Initialize the map and assign it to mapRef.current
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current, // Type-safe container reference
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-65.017, -16.457],
        zoom: 6,
        attributionControl: false,
      });

      mapRef.current.on("load", () => {
        setIsMapReady(true); // Map is ready
      });
    }

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <SearchBox
          accessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
          map={mapRef.current!} // Safe because of mapLoaded check
          // @ts-ignore
          mapboxgl={mapboxgl}
          value={inputValue}
          // @ts-ignore
          onChange={(d) => {
            setInputValue(d);
          }}
          marker
        />
      </Box>
      <Box
        ref={mapContainerRef}
        id="map"
        sx={{height: "800px", borderRadius: 8}}
      >
        {isMapReady &&
          geojson.features.map((marker, index) => (
            <MapCustomMarker
              key={index}
              mapRef={mapRef}
              marker={marker}
              setSelectedPhoto={setSelectedPhoto}
            />
          ))}
        <PhotoDetailView
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%", // Full width of the parent container
          textAlign: "center", // Ensure text is centered if it's multiline
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            mt: 2,
            fontWeight: "bold", // Make the text bold
          }}
        >
          もっと見る
        </Typography>

        {/* 近くの関連画像を表示 */}
      </Box>
    </Box>
  );
}
