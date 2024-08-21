import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

const MapSidebar: React.FC = () => {
  const mockData = Array.from({ length: 10 }).map((_, index) => ({
    title: `Location ${index + 1}`,
    image: `https://picsum.photos/seed/${index}/150/100`, // Random image with a seed
  }));

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100vw",
          height: "25vh",
          backgroundColor: "rgba(245, 245, 245, 0.85)", // Set background color with opacity
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          whiteSpace: "nowrap", // Keeps cards on a single line
          padding: 2,
        }}
      >
        {mockData.map((item, index) => (
          <Card
            key={index}
            sx={{
              minWidth: "200px", // Ensures each card has a minimum width
              marginRight: 2, // Space between cards
              opacity: 1,
            }}
          >
            <CardMedia component="img" image={item.image} alt={item.title} />
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default MapSidebar;
