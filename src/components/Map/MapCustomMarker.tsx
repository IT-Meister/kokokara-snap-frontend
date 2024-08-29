import React, {useEffect} from "react";
import mapboxgl, {LngLatLike} from "mapbox-gl";

interface MarkerComponentProps {
  mapRef: React.RefObject<mapboxgl.Map>;
  marker: {
    properties: {
      message: string;
      imageId: number;
      iconSize: number[];
    };
    geometry: {
      coordinates: number[];
    };
  };
  setSelectedPhoto: (photo: {
    title: string;
    imageUrl: string;
    description: string;
  }) => void;
}

const MarkerComponent: React.FC<MarkerComponentProps> = ({
  mapRef,
  marker,
  setSelectedPhoto,
}) => {
  useEffect(() => {
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

    // show popup when hovers
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
  }, [marker, mapRef, setSelectedPhoto]);

  return null;
};

export default MarkerComponent;
