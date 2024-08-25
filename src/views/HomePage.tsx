import React from "react";

import {
  Box,
  Container,
  Grid,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import Header from "@/components/Header";

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Header />
      <Box
        sx={{
          height: 300,
          backgroundColor: "#7dbf4b",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            borderRadius: 50,
            boxShadow: 3,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search ..."
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {[...Array(9)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                width: "100%",
                height: 150,
                backgroundColor: "#dcdcdc",
                borderRadius: 8,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};