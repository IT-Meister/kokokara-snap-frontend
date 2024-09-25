// components/MapComponent.tsx
import React, {useEffect, useRef, useState} from "react";
import mapboxgl, {LngLatLike} from "mapbox-gl";
import {SearchBox} from "@mapbox/search-js-react";
import "mapbox-gl/dist/mapbox-gl.css";
import {Box} from "@mui/material";

import MapCustomMarker from "./MapCustomMarker";
import PhotoDetailView from "./MapPostDetailsPanel";
import {PostData} from "@/types/PostData";
import {useUser} from "@/libs/store/store";
import {mockPostData} from "@/mock-data/mockPosts";

export default function MapboxComponent() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isMapReady, setIsMapReady] = useState(false);

  const [data, setData] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const user = useUser();

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v8",
        center: [139.75, 35.6764],
        zoom: 12,
        attributionControl: false,
      });

      mapRef.current.on("load", () => {
        setIsMapReady(true);
      });
    }

    // fetch post data
    async function fetchData() {
      var latLng = mapRef.current?.getCenter();
      var zoom = mapRef.current?.getZoom();
      try {
        const res = await fetch(
          "http://127.0.0.1:8080/api/v1/post/map?latitude=40.78&longitude=-73.96&zoom=20"

          // use this URL
          // `http://127.0.0.1:8080/api/v1/post/map?latitude=${latLng?.lat}&longitude=${latLng?.lng}&zoom=${zoom}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await res.json();
        setData(jsonData.data);
      } catch (e: any) {
        setError(e.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

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
      {isMapReady && (
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
            map={mapRef.current!}
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
      )}
      <Box
        ref={mapContainerRef}
        id="map"
        sx={{height: "800px", borderRadius: 8}}
      >
        {!loading &&
          mockPostData.map((data, index) => (
            <MapCustomMarker
              key={index}
              mapRef={mapRef}
              data={data}
              setSelectedPost={setSelectedPost}
            />
          ))}

        <PhotoDetailView
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      </Box>
    </Box>
  );
}
