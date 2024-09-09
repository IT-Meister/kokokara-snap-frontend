import {useEffect, useRef, useState} from "react";
import mapboxgl, {MapMouseEvent} from "mapbox-gl";
import {SearchBox} from "@mapbox/search-js-react";

export default function MapboxComponent() {
  const [moveEvent, setMoveEvent] = useState<MapMouseEvent | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

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

    mapRef.current.on("mousemove", (e) => setMoveEvent(e));

    mapRef.current.on("load", () => setMapLoaded(true));

    mapRef.current.on("click", (e) => {
      const {lng, lat} = e.lngLat;

      if (markerRef.current) {
        markerRef.current.setLngLat(e.lngLat);
        markerRef.current.getPopup()?.setText(`Lat: ${lat}, Lng: ${lng}`);
      } else {
        const newMarker = new mapboxgl.Marker()
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
      <div
        id="map"
        ref={mapContainerRef}
        style={{width: "100%", height: "100%"}}
      ></div>
      {mapLoaded && (
        <SearchBox
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
          map={mapRef.current!}
          // @ts-ignore
          mapboxgl={mapboxgl}
        />
      )}
      {moveEvent && <pre>{JSON.stringify(moveEvent.lngLat.wrap())}</pre>}
    </div>
  );
}
