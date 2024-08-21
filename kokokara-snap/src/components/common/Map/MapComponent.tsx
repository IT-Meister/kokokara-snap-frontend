import React, { useEffect, useRef } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapMarker from "./MapMarker";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoia3RzdWdhdTUyNSIsImEiOiJjbTAxdXFzazcxd2liMmlzMnQ4ZWE0cGR3In0.98x_7QdykqBFX_NKvKnGJQ";

const MapComponent: React.FC = () => {
  // Initialize with null instead of leaving it undefined
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      // Initialize the map and assign it to mapRef.current
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current, // Type-safe container reference
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-65.017, -16.457],
        zoom: 6,
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
          window.alert(marker.properties.message);
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
  }, []);

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

  return (
    <div
      ref={mapContainerRef}
      id="map"
      style={{ width: "100vw", height: "100vh" }}
    >
      {mapRef.current &&
        geojson.features.map((feature, index) => (
          <MapMarker
            key={index}
            coordinates={feature.geometry.coordinates as LngLatLike}
            imageId={feature.properties.imageId}
            message={feature.properties.message}
            iconSize={feature.properties.iconSize as [number, number]}
            map={mapRef.current}
          />
        ))}
    </div>
  );
};

export default MapComponent;
