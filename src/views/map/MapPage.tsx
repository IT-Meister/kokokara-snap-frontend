"use client";

import React from "react";

import MapComponent from "@/components/Map/MapComponent";
import {Box, Typography} from "@mui/material";

export default function MapPage() {
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%", // Full width of the parent container
          textAlign: "center", // Ensure text is centered if it's multiline
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            mt: 2,
            fontWeight: "bold", // Make the text bold
          }}
        >
          もっと見る
        </Typography>

        {/* 近くの関連画像を表示 */}
      </Box>
    </div>
  );
}
