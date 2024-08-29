"use client";

import React, {useState} from "react";

import {
  Box,
  Container,
  Grid,
  Paper,
  InputBase,
  IconButton,
  Card,
  CardMedia,
} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";

import HomePhotoModal from "@/components/HomePhotoModal";
import mockPosts, {Post} from "../mock-data/mockPosts";

export default function HomePage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleOpenModal = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <Container maxWidth="lg">
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
            sx={{ml: 1, flex: 1}}
            placeholder="Search ..."
            inputProps={{"aria-label": "search"}}
          />
          <IconButton type="submit" sx={{p: "10px"}} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      {/* post showcase */}
      <Grid container spacing={3} sx={{mt: 4}}>
        {mockPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              onClick={() => handleOpenModal(post)}
              sx={{cursor: "pointer", borderRadius: 8, boxShadow: 1}}
            >
              <CardMedia component="img" height="200" image={post.url} />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Use the HomePostModal component */}
      <HomePhotoModal
        open={!!selectedPost}
        post={selectedPost}
        onClose={handleCloseModal}
      />
    </Container>
  );
}
