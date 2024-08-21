import React from "react";
import { Box, Typography, Button } from "@mui/material";

const MapDetailsPanel: React.FC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 20,
        left: 20,
        backgroundColor: "white",
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
        zIndex: 2,
      }}
    >
      <Typography variant="h6">When you click a point...</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Details about the selected location will appear here. You can click the
        button below to get more information.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        View Details
      </Button>
    </Box>
  );
};

export default MapDetailsPanel;
