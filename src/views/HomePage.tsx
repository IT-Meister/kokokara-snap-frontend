"use client";

import React, {useEffect, useState} from "react";

import {
  Box,
  Container,
  Grid,
  Paper,
  InputBase,
  IconButton,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";

import HomePhotoModal from "@/components/Home/HomePhotoModal";
import mockPosts, {Post} from "../mock-data/mockPosts";
import {useUser} from "@/libs/store/store";

export default function HomePage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const user = useUser();
  const prefecture = user["prefecture"];

  const handleOpenModal = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  function isEmptyUser(dictionary: Record<string, any>): boolean {
    return Object.keys(dictionary).length === 0;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Start loading before the fetch

      try {
        const url = isEmptyUser(user)
          ? `http://127.0.0.1:8080/api/v1/post?prefecture=${prefecture}`
          : "http://127.0.0.1:8080/api/v1/post";

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        console.log(data);

        setPosts(data); // Assuming the data is an array of posts
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); // Always stop loading after the request
      }
    };

    fetchPosts();
  }, []);

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
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh", // Full viewport height to center vertically
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!loading &&
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post["id"]}>
              <Card
                onClick={() => handleOpenModal(post)}
                sx={{cursor: "pointer", borderRadius: 8, boxShadow: 1}}
              >
                <CardMedia component="img" height="200" image={post["url"]} />
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
