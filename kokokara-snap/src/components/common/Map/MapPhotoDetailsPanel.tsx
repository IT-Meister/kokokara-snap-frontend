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
        position: "relative",
        right: 0,
        margin: 1,
        width: "35%", // 1/4 of the map's width
        height: "620px", // Full height of the viewport
        backgroundColor: "#fff",
        boxShadow: "-2px 0px 5px rgba(0,0,0,0.1)",
        zIndex: 2, // Ensure it appears above the map
        borderRadius: "16px", // Change the roundness of the corners
      }}
    >
      <Card
        sx={{
          height: "100%",
          minWidth: "200px", // Ensures each card has a minimum width
          overflow: "hidden", // Ensure content doesn't overflow rounded corners
          borderRadius: "16px", // Change the roundness of the corners
        }}
      >
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
