"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

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

import SearchBar from "./SearchBar/SearchBar"; // Import the SearchBar component
import {useSetUser, useUser} from "@/libs/store/store";

export default function Headeraa() {
  const [activeButton, setActiveButton] = useState<string>("home");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const user = useUser();
  const setUser = useSetUser();

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

  const handleLogoutClick = () => {
    // Handle logout
    // setUser({});
    window.location.reload();
  };

  const handleLoginClick = () => {
    router.push("/accounts/login");
  };

  const handleLogoClick = () => {
    setActiveButton("home");
    router.push("/");
  };

  const handlePostClick = () => {
    setActiveButton("post");
    router.push("/post/imageupload"); // Adjust the route as needed
  };

  function isEmptyUser(dictionary: Record<string, any>): boolean {
    return Object.keys(dictionary).length === 0;
  }

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
            <Image
              src="/pinterest-logo.png"
              alt="Pinterest Logo"
              width={40}
              height={40}
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
          {/* ログイン Button */}
          {isEmptyUser(user) && (
            <Button
              sx={{
                ml: 2,
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#b30000", // Slightly darker red
                padding: "8px 20px",
                borderRadius: "24px",
                "&:hover": {
                  backgroundColor: "#800000", // Darker red on hover
                },
              }}
              onClick={handleLoginClick}
            >
              ログイン
            </Button>
          )}
          <IconButton
            onClick={handleMenuOpen}
            edge="end"
            sx={{height: 60, ml: 1}}
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
            <MenuItem>{user["displayName"]}</MenuItem>
            <MenuItem onClick={handleProfileClick}>プロフィール</MenuItem>
            <MenuItem onClick={handleSettingsClick}>設定</MenuItem>
            <MenuItem onClick={handleLogoutClick} sx={{color: "red"}}>
              ログアウト
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
