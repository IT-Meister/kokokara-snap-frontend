import React, {useEffect} from "react";
import mapboxgl, {LngLatLike} from "mapbox-gl";
import {PostData} from "@/types/PostData";

interface MarkerComponentProps {
  mapRef: React.RefObject<mapboxgl.Map>;
  data: PostData;
  setSelectedPhoto: (photo: {
    title: string;
    imageUrl: string;
    description: string;
  }) => void;
}

const MarkerComponent: React.FC<MarkerComponentProps> = ({
  mapRef,
  data,
  setSelectedPhoto,
}) => {
  useEffect(() => {
    const el = document.createElement("div");
    const width = 40;
    const height = 40;

    el.className = "marker";
    el.style.backgroundImage = data.url;
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
        title: data.title,
        imageUrl: data.url,
        description: data.description,
      });
    });

    // custom popup
    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      closeOnClick: false,
    }).setHTML(`
      <div style="display: flex; flex-direction: column; align-items: center;">
        <img src=${data.url} alt="Popup Image" style="border-radius: 8px; margin-bottom: 8px;" />
        <p style="margin: 0; font-size: 14px; text-align: center;">${data.description}</p>
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
  }, [data, mapRef, setSelectedPhoto]);

  return null;
};

export default MarkerComponent;
