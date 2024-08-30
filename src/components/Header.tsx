"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";

import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";

import SearchBar from "./SearchBar"; // Import the SearchBar component

export default function Headeraa() {
  const [activeButton, setActiveButton] = useState<string>("home");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    router.push("/profile");
  };

  const handleSettingsClick = () => {
    handleMenuClose();
    // Handle settings click
  };

  const handleLogoClick = () => {
    setActiveButton("home");
    router.push("/");
  };

  const handlePostClick = () => {
    setActiveButton("post");
    router.push("/post/imageupload"); // Adjust the route as needed
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <Box sx={{display: "flex", alignItems: "center", flexGrow: 1}}>
          <IconButton onClick={handleLogoClick} edge="start" sx={{padding: 0}}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
              alt="Pinterest Logo"
              style={{height: 50}}
            />
          </IconButton>
          {/* ホーム Button */}
          <Button
            sx={{
              marginLeft: 2,
              fontWeight: "bold",
              color: activeButton === "home" ? "white" : "black",
              backgroundColor:
                activeButton === "home" ? "black" : "transparent",
              padding: "8px 20px",
              borderRadius: "24px",
              "&:hover": {
                backgroundColor: activeButton === "home" ? "#333" : "#e0e0e0",
              },
            }}
            onClick={handleLogoClick}
          >
            ホーム
          </Button>
          {/* 投稿する Button */}
          <Button
            sx={{
              marginLeft: 2,
              fontWeight: "bold",
              color: activeButton === "post" ? "white" : "black",
              backgroundColor:
                activeButton === "post" ? "black" : "transparent",
              padding: "8px 20px",
              borderRadius: "24px",
              "&:hover": {
                backgroundColor: activeButton === "post" ? "#333" : "#e0e0e0",
              },
            }}
            onClick={handlePostClick}
          >
            投稿する
          </Button>

          <Box sx={{flexGrow: 1, ml: 2}}>
            <SearchBar /> {/* Insert the SearchBar here */}
          </Box>
          <IconButton
            onClick={handleMenuOpen}
            edge="end"
            sx={{height: 60, ml: 2}}
          >
            {" "}
            {/* Adjust the size here */}
            <Avatar
              src="https://via.placeholder.com/50"
              sx={{width: "100%", height: "100%"}}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
