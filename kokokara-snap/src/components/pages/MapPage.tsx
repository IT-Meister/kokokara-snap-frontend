import React from "react";
import MapComponent from "../common/Map/MapComponent";
import MapPhotoDetailsPanel from "../common/Map/MapPhotoDetailsPanel";
import MapSidebar from "../common/Map/MapSidebar";

const MapPage: React.FC = () => {
  return (
    <div style={{ position: "relative", display: "flex" }}>
      {/* Map Component */}
      <MapComponent />

      {/* Details Panel (Displays details on clicking a map point) */}
      <MapPhotoDetailsPanel />

      {/* Right Sidebar (Shows images and information) */}
      <MapSidebar />
    </div>
  );
};

export default MapPage;
