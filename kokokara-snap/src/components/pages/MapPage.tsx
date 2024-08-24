import React from "react";
import MapComponent from "../common/Map/MapComponent";

const MapPage: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: "100vh",
        width: "100%",
      }}
    >
      {/* Map Component */}
      <MapComponent />
    </div>
  );
};

export default MapPage;
