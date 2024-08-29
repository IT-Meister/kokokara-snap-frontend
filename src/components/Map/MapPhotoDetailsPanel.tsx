import React from "react";

import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Fade,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PhotoDetailViewProps {
  selectedPhoto: {
    title: string;
    imageUrl: string;
    description: string;
  } | null;
  setSelectedPhoto: React.Dispatch<
    React.SetStateAction<{
      title: string;
      imageUrl: string;
      description: string;
    } | null>
  >;
}

export default function PhotoDetailView(props: PhotoDetailViewProps) {
  const {selectedPhoto, setSelectedPhoto} = props;
  const handleClose = () => {
    setSelectedPhoto(null);
  };

  return (
    <Box>
      {selectedPhoto && (
        <Box
          sx={{
            position: "relative",
            right: 0,
            m: 2,
            width: "40%", // 1/4 of the map's width
            height: "750px",
            bgcolor: "background.paper",
            boxShadow: 24,
            zIndex: 1, // Ensure it appears above the map
            borderRadius: 4, // Change the roundness of the corners
            p: 2,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "40%",
              maxWidth: "100%",
              maxHeight: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={selectedPhoto?.imageUrl}
              alt={selectedPhoto?.title}
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          </Box>
          <Box
            sx={{
              width: "60%",
              padding: 2,
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" component="h2" sx={{mb: 2}}>
              {selectedPhoto?.title}
            </Typography>
            <Typography variant="body1" sx={{mt: 2}}>
              {selectedPhoto?.description}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
