"use client";

import React from "react";

import MapComponent from "@/components/Map/MapComponent";

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
    </div>
  );
}
