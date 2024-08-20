// src/components/common/Grid.tsx
import React from "react";
import { Grid as MuiGrid, Box } from "@mui/material";

interface GridProps {
  items: number[];
}

const Grid: React.FC<GridProps> = ({ items }) => {
  return (
    <MuiGrid
      container
      spacing={3}
      justifyContent="center"
      sx={{ marginTop: 3 }}
    >
      {items.map((_, index) => (
        <MuiGrid item xs={12} sm={6} md={4} key={index}>
          <Box
            sx={{
              width: "100%",
              height: 150,
              backgroundColor: "#dcdcdc",
              borderRadius: 2,
            }}
          />
        </MuiGrid>
      ))}
    </MuiGrid>
  );
};

export default Grid;
