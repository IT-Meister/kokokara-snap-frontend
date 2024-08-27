'use client'

import React, {useState} from "react";

import {
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";

import Layout from "@/views/Layout";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const gridItems = Array(6).fill(0); // Example grid data

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{mt: 3, textAlign: "center"}}>
          <Box
            sx={{
              height: 300,
              backgroundColor: "#dcdcdc",
              backgroundImage: 'url("https://via.placeholder.com/1000x300")', // Replace with actual image URL
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
              position: "relative",
              marginBottom: -8,
            }}
          />
          <Avatar
            src="https://via.placeholder.com/150"
            sx={{
              width: 150,
              height: 150,
              border: "5px solid white",
              position: "relative",
              top: "0px",
              margin: "0 auto",
            }}
          />
          <Typography variant="h5" sx={{mt: 2, fontWeight: "bold"}}>
            木嶋くん
          </Typography>
          <Typography variant="body2" color="textSecondary">
            僕の名前は木嶋隆: 僕は新潟出身なんだよね。写真を楽しんでいってね。
          </Typography>
          <Box sx={{mt: 2, display: "flex", justifyContent: "center", gap: 1}}>
            <Typography variant="body1">フォロワー: 1234 人</Typography>
            <Typography variant="body1">|</Typography>
            <Typography variant="body1">フォロー: 233 人</Typography>
          </Box>
          <Box sx={{mt: 3, display: "flex", justifyContent: "center", gap: 2}}>
            <Button variant="outlined" sx={{minWidth: 40}}>
              🔗
            </Button>
            <Button variant="contained" color="success">
              フォロー
            </Button>
            <Button variant="outlined" sx={{minWidth: 40}}>
              •••
            </Button>
          </Box>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{mt: 3, borderBottom: 1, borderColor: "divider"}}
          >
            <Tab label="ポスト" value="posts"/>
            <Tab label="お気に入り" value="favorites"/>
          </Tabs>
        </Box>
        <Grid container spacing={3} sx={{marginTop: 3}}>
          {gridItems.map((_, index) => (
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
    </Layout>
  );
};
