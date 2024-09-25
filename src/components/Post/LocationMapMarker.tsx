import {useEffect, useRef} from "react";
import mapboxgl from "mapbox-gl";

interface UseMapMarkerProps {
  map: mapboxgl.Map | null;
  markerRotation: number;
  setMarkerRotation: React.Dispatch<React.SetStateAction<number>>;
}

export const useMapMarker = ({
  map,
  markerRotation,
  setMarkerRotation,
}: UseMapMarkerProps) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
      const {lng, lat} = e.lngLat;

      // Create a custom marker element
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
          .addTo(map);

        markerRef.current = newMarker;
      }
    };

    // Add click event listener for the map
    map.on("click", handleMapClick);

    // Cleanup event listener when component unmounts
    return () => {
      if (map) {
        map.off("click", handleMapClick);
      }
    };
  }, [map]);

  // Function to rotate the marker
  const handleRotationChange = (change: number) => {
    if (markerRef.current) {
      const newRotation = markerRotation + change;
      setMarkerRotation(newRotation);
      markerRef.current.setRotation(newRotation);
    }
  };

  return {handleRotationChange};
};
