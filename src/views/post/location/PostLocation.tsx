"use client";

import {useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";

import "mapbox-gl/dist/mapbox-gl.css";
import {Box, Button, Paper} from "@mui/material";
import dynamic from "next/dynamic";

// Dynamically import the Mapbox component (client-side only)
const MapboxComponent = dynamic(
  () => import("@/components/common/MapboxComponent"),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

export default function PostLocation() {
  const searchParams = useSearchParams();
  const imagePath = searchParams.get("imagePath"); // Retrieve the imagePath data from the query parameters
  const router = useRouter();

  const handleNextClick = () => {
    if (imagePath) {
      // Here, we pass the Object URL via router push
      router.push(`/post/details?imagePath=${imagePath}`);
    } else {
      alert("Please select an image and capture a map screenshot");
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
        <Paper // Image preview on the left side
          variant="outlined"
          sx={{
            width: 800,
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            display: "flex",
            backgroundColor: "#fafafa",
            margin: "10px", // Add margin to the Paper component
          }}
        >
          <Image
            src={decodeURIComponent(imagePath!)}
            alt="Preview"
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
          alignItems: "center", // Center vertically
          flexDirection: "column", // Stack items vertically
          margin: "10px", // Add margin to the container div
        }}
      >
        <MapboxComponent />
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
