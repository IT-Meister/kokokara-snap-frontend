import React from "react";
import MapComponent from "../common/Map/MapComponent";
import MapSidebar from "../common/Map/MapSidebar";

const MapPage: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Map Component */}
      <MapComponent />

      {/* bottom Sidebar (Shows images and information) */}
      <MapSidebar />
    </div>
  );
};

export default MapPage;
