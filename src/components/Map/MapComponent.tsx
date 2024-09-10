// pages/post/location.tsx
import React from "react";
import dynamic from "next/dynamic";
import {Box, Button, Paper} from "@mui/material";

// Dynamically import MapComponent, disabling SSR
const MapboxComponent = dynamic(() => import("./MapboxComponent"), {
  ssr: false, // Disable server-side rendering
});

export default function PostLocation() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "10px",
        }}
      >
        {/* MapComponent is loaded dynamically */}
        <MapboxComponent />

        {/* Other content */}
        <Box
          sx={{
            display: "flex",
            mt: 2,
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e60023",
              color: "#fff",
              padding: "8px 24px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            次へ
          </Button>
        </Box>
      </div>
    </div>
  );
}
