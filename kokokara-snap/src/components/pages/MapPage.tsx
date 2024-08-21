import React from "react";
import MapComponent from "../common/Map/MapComponent";
import MapSidebar from "../common/Map/MapSidebar";

const MapPage: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: "100vh",
      }}
    >
      {/* Map Component */}
      <MapComponent />
    </div>
  );
};

export default MapPage;
