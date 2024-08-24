import React, { useEffect, useRef } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";

interface MapMarkerProps {
  coordinates: LngLatLike;
  imageId: number;
  message: string;
  iconSize: [number, number];
  map: mapboxgl.Map | null;
}

const MapMarker: React.FC<MapMarkerProps> = ({
  coordinates,
  imageId,
  message,
  iconSize,
  map,
}) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    const el = document.createElement("div");
    const [width, height] = iconSize;
    el.className = "marker";
    el.style.backgroundImage = `url(https://picsum.photos/id/${imageId}/${width}/${height})`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = "100%";
    el.style.display = "block";
    el.style.border = "none";
    el.style.borderRadius = "50%";
    el.style.cursor = "pointer";
    el.style.padding = "0";

    el.addEventListener("click", () => {
      window.alert(message);
    });

    // Create the marker and add it to the map
    new mapboxgl.Marker(el).setLngLat(coordinates).addTo(map!);

    // Cleanup when the component is unmounted
    return () => {
      el.remove();
    };
  }, [coordinates, imageId, iconSize, message, map]);

  return null;
};

export default MapMarker;
