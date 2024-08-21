import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

interface PhotoDetailViewProps {
  title: string;
  imageUrl: string;
  description: string;
}

const PhotoDetailView: React.FC<PhotoDetailViewProps> = ({
  title,
  imageUrl,
  description,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "25%", // 1/4 of the map's width
        height: "65vh", // Full height of the viewport
        backgroundColor: "#fff",
        boxShadow: "-2px 0px 5px rgba(0,0,0,0.1)",
        zIndex: 1, // Ensure it appears above the map
      }}
    >
      <Card sx={{ height: "100%" }}>
        <CardMedia component="img" height="300" image={imageUrl} alt={title} />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PhotoDetailView;
