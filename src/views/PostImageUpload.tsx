'use client'

import React, {useCallback, useState} from "react";
import {useRouter} from "next/navigation";

import {Box, Paper, Button} from "@mui/material";
import {useDropzone} from "react-dropzone";

import Header from "@/components/Header";

export default function PostImageUploadPage() {
  const router = useRouter();

  // for drag & drop
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    console.log("acceptedFiles:", acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handlexNextClick = () => {
    router.push("/post/location");
  };

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header component */}
      <Header />

      {/* Container for centering the image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          height: "calc(100vh - 64px)", // Adjust height to account for header (assuming header height is 64px)
          position: "relative", // Needed for the button to position relative to this container
          flexDirection: "column", // Stack items vertically
        }}
      >
        {/* Drag & drop box */}
        <div {...getRootProps()} style={{ width: "100%", maxWidth: 800 }}>
          <input {...getInputProps()} />
          <Paper
            variant="outlined"
            sx={{
              width: 800,
              height: 600,
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              border: isDragActive ? "3px solid #e60023" : "1px solid #ddd",
              transition: "border 0.1s ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fafafa",
            }}
          >
            <img
              src="https://via.placeholder.com/300x400"
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </Paper>
        </div>

        {/* Next Button */}
        <Box
          className="Next Button"
          sx={{
            display: "flex",
            mt: 4,
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
            onClick={handlexNextClick}
          >
            次へ
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
