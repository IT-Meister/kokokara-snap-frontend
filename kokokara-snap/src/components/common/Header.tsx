// src/components/common/Header.tsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar"; // Import the SearchBar component

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    handleMenuClose();
    // Handle settings click
  };

  const handleLogoClick = () => {
    navigate("/");
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
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton
            onClick={handleLogoClick}
            edge="start"
            sx={{ padding: 0 }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
              alt="Pinterest Logo"
              style={{ height: 50 }}
            />
          </IconButton>
          <Box sx={{ flexGrow: 1, ml: 2 }}>
            <SearchBar /> {/* Insert the SearchBar here */}
          </Box>
        </Box>
        <Box sx={{ paddingLeft: 2 }}>
          <IconButton onClick={handleMenuOpen} edge="end" sx={{ height: 60 }}>
            {" "}
            {/* Adjust the size here */}
            <Avatar
              alt="Kojiro Tsugaru"
              src="https://via.placeholder.com/50"
              sx={{ width: "100%", height: "100%" }}
            />
          </IconButton>
        </Box>
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
