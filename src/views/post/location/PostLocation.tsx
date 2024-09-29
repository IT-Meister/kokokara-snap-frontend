"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Box, Button, Paper} from "@mui/material";
import dynamic from "next/dynamic";

// Dynamically import the Mapbox component (client-side only)
const LocationMapboxComponent = dynamic(
  () => import("@/components/Post/LocationMapboxComponent"),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

export default function PostLocation() {
  const [imagePath, setImagePath] = useState<string | null>(null); // State for image path
  const [angle, setAngle] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const path = searchParams.get("imagePath");
      setImagePath(path); // Set the image path once available
    }
  }, []); // Runs only once when the component is mounted (client-side)

  const handleNextClick = () => {
    if (imagePath) {
      router.push(
        `/post/details?imagePath=${imagePath}&angle=${angle}&latitude=${latitude}&longitude=${longitude}`
      );
    } else {
      alert("Please select an image");
    }
  };

  return (
    <div
      style={{
        display: "flex", // Use Flexbox to create a two-column layout
        width: "100%",
        height: "100vh",
        alignItems: "center", // Center vertically
      }}
    >
      {imagePath && (
        <Paper
          variant="outlined"
          sx={{
            width: 800,
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            display: "flex",
            backgroundColor: "#fafafa",
            margin: "10px",
          }}
        >
          <Image
            src={decodeURIComponent(imagePath)}
            alt="Preview"
            fill
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Paper>
      )}

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", //s Center vertically
          flexDirection: "column", // Stack items vertically
          top: 44,
        }}
      >
        {/* Mapbox */}
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            width: "100%", // Full width of the parent container
          }}
        >
          <LocationMapboxComponent
            markerRotation={angle}
            setMarkerRotation={setAngle}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </Box>
        {/* Next Button */}
        <Box
          className="Next Button"
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
            onClick={handleNextClick}
          >
            次へ
          </Button>
        </Box>
      </div>
    </div>
  );
}
