import React, {useEffect, useRef, useState} from "react";

import mapboxgl, {LngLatLike} from "mapbox-gl";
import {SearchBox} from "@mapbox/search-js-react";
import "mapbox-gl/dist/mapbox-gl.css";

import MapSidebar from "./MapSidebar";
import MapPhotoDetailsPanel from "./MapPhotoDetailsPanel";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoia3RzdWdhdTUyNSIsImEiOiJjbTAxdXFzazcxd2liMmlzMnQ4ZWE0cGR3In0.98x_7QdykqBFX_NKvKnGJQ";

export default function MapComponent () {
  // Initialize with null instead of leaving it undefined
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [selectedPhoto, setSelectedPhoto] = useState<{
    title: string;
    imageUrl: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      // Initialize the map and assign it to mapRef.current
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current, // Type-safe container reference
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-65.017, -16.457],
        zoom: 6,
        attributionControl: false,
      });

      mapRef.current.on("load", () => {
        setMapLoaded(true);
      });

      // DB
      const geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              message: "Foo",
              imageId: 1011,
              iconSize: [60, 60],
            },
            geometry: {
              type: "Point",
              coordinates: [-66.324462, -16.024695],
            },
          },
          {
            type: "Feature",
            properties: {
              message: "Bar",
              imageId: 870,
              iconSize: [50, 50],
            },
            geometry: {
              type: "Point",
              coordinates: [-61.21582, -15.971891],
            },
          },
          {
            type: "Feature",
            properties: {
              message: "Baz",
              imageId: 837,
              iconSize: [40, 40],
            },
            geometry: {
              type: "Point",
              coordinates: [-63.292236, -18.281518],
            },
          },
        ],
      };

      for (const marker of geojson.features) {
        const el = document.createElement("div");
        const width = marker.properties.iconSize[0];
        const height = marker.properties.iconSize[1];
        el.className = "marker";
        el.style.backgroundImage = `url(https://picsum.photos/id/${marker.properties.imageId}/${width}/${height})`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = "100%";
        el.style.display = "block";
        el.style.border = "none";
        el.style.borderRadius = "50%";
        el.style.cursor = "pointer";
        el.style.padding = "0";

        // click action
        el.addEventListener("click", () => {
          setSelectedPhoto({
            title: marker.properties.message,
            imageUrl: `https://picsum.photos/id/${marker.properties.imageId}/600/400`,
            description: marker.properties.message,
          });
        });

        // custom popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false,
        }).setHTML(`
        <div style="display: flex; flex-direction: column; align-items: center;">
          <img src="https://picsum.photos/id/${marker.properties.imageId}/100/100" alt="Popup Image" style="border-radius: 8px; margin-bottom: 8px;" />
          <p style="margin: 0; font-size: 14px; text-align: center;">${marker.properties.message}</p>
        </div>
      `);

        // show popup when hover
        el.addEventListener("mouseover", () => {
          popup
            .setLngLat(marker.geometry.coordinates as LngLatLike)
            .addTo(mapRef.current!);
        });

        el.addEventListener("mouseleave", () => {
          popup.remove();
        });

        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates as LngLatLike)
          .setPopup(popup)
          .addTo(mapRef.current!);
      }
    }

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {mapLoaded && (
        <SearchBox
          accessToken={MAPBOX_TOKEN}
          map={mapRef.current!} // Safe because of mapLoaded check
          mapboxgl={mapboxgl}
          value={inputValue}
          onChange={(d) => {
            setInputValue(d);
          }}
          marker
        />
      )}
      <div ref={mapContainerRef} id="map" style={{ height: "100vh" }}>
        {selectedPhoto && (
          <MapPhotoDetailsPanel
            title={selectedPhoto.title}
            imageUrl={selectedPhoto.imageUrl}
            description={selectedPhoto.description}
          />
        )}
      </div>
      <MapSidebar />
    </div>
  );
};
