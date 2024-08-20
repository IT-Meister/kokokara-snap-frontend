import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

const MapSidebar: React.FC = () => {
  const mockData = [
    {
      title: "Golden Gate Bridge",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Downtown SF",
      image: "https://via.placeholder.com/150",
    },
    // Add more items as needed
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 400,
        height: "100vh",
        backgroundColor: "#f5f5f5",
        overflowY: "scroll",
      }}
    >
      {mockData.map((item, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={item.image}
            alt={item.title}
          />
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MapSidebar;
