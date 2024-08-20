import React from "react";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HomeIcon from "@mui/icons-material/Home";

const MapControls: React.FC<{ map: mapboxgl.Map | null }> = ({ map }) => {
  const handleZoomIn = () => {
    map?.zoomIn();
  };

  const handleZoomOut = () => {
    map?.zoomOut();
  };

  const handleReset = () => {
    map?.flyTo({ center: [-122.4194, 37.7749], zoom: 12 });
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: 10,
        transform: "translateY(-50%)",
        zIndex: 2,
      }}
    >
      <IconButton onClick={handleZoomIn} sx={{ mb: 1 }} color="primary">
        <AddIcon />
      </IconButton>
      <IconButton onClick={handleZoomOut} sx={{ mb: 1 }} color="primary">
        <RemoveIcon />
      </IconButton>
      <IconButton onClick={handleReset} sx={{ mb: 1 }} color="primary">
        <HomeIcon />
      </IconButton>
    </Box>
  );
};

export default MapControls;
