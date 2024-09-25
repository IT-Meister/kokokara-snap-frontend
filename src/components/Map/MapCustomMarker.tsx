import React, {useEffect} from "react";
import mapboxgl, {LngLatLike} from "mapbox-gl";
import {PostData} from "@/types/PostData";

interface MarkerComponentProps {
  mapRef: React.RefObject<mapboxgl.Map>;
  data: PostData;
  setSelectedPost: React.Dispatch<React.SetStateAction<PostData | null>>;
}

const MarkerComponent: React.FC<MarkerComponentProps> = ({
  mapRef,
  data,
  setSelectedPost,
}) => {
  useEffect(() => {
    const el = document.createElement("div");
    const width = 50;
    const height = 50;

    el.className = "marker";
    el.style.backgroundImage = `url(${data.url})`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = "cover";
    el.style.display = "block";
    el.style.border = "none";
    el.style.borderRadius = "50%";
    el.style.cursor = "pointer";
    el.style.padding = "0";

    // click action
    el.addEventListener("click", () => {
      setSelectedPost(data);
    });

    // custom popup
    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      closeOnClick: false,
    }).setHTML(`
      <div style="display: flex; flex-direction: column; align-items: center; padding: 10px; max-width: 200px; border-radius: 12px; overflow: hidden;">
        <img src="${data.url}" alt="${data.title}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 8px;" />
        <p style="margin: 0; font-size: 14px; text-align: center; word-wrap: break-word;">${data.description}</p>
      </div>
    `);

    // show popup when hovers
    el.addEventListener("mouseover", () => {
      popup
        .setLngLat([data.longitude, data.latitude] as LngLatLike)
        .addTo(mapRef.current!);
    });

    el.addEventListener("mouseleave", () => {
      popup.remove();
    });

    new mapboxgl.Marker(el)
      .setLngLat([data.longitude, data.latitude] as LngLatLike)
      .setPopup(popup)
      .addTo(mapRef.current!);
  }, [data, mapRef, setSelectedPost]);

  return null;
};

export default MarkerComponent;
