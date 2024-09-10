// pages/post/location.tsx
import React from "react";
import dynamic from "next/dynamic";
import {Box, Button, Paper} from "@mui/material";

// Dynamically import MapComponent, disabling SSR
const MapboxComponent = dynamic(() => import("./MapboxComponent"), {
  ssr: false, // Disable server-side rendering
});

export default function MapComponent() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
      }}
    >
      {/* MapComponent is loaded dynamically */}
      <MapboxComponent />
    </div>
  );
}
