"use client";

import React, {useState} from "react";

import {Paper, InputBase, IconButton} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";

import SearchBarDropdown from "./SearchBarDropdown";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery) {
      console.log(`Searching for: ${searchQuery}`);
      // You can add the search logic here, such as navigating to a search results page.
    }
  };

  const mockSearchHistory = [
    "horizontal ipad wallpaper",
    "more button UI",
    "photo showcase UI",
    "photo preview ui",
  ];

  const mockSuggestions = [
    {label: "東京", image: "/mockImages/post1.jpg"},
    {label: "長野", image: "/mockImages/post2.jpg"},
    {label: "鹿児島", image: "/mockImages/post7.jpg"},
    {label: "沖縄", image: "/mockImages/post8.jpg"},
  ];

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <Paper
      component="form"
      onSubmit={handleSearchSubmit}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: "#e0e0e0",
        boxShadow: "none",
        width: "100%",
        // This ensures the absolute positioning of the SeachDropDown is relative to this Paper
        position: "relative",
      }}
    >
      <InputBase
        sx={{ml: 2, flex: 1}}
        placeholder="マップから写真を探す"
        value={searchQuery}
        onChange={handleSearchChange}
        inputProps={{"aria-label": "search"}}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <IconButton type="submit" sx={{p: "10px"}} aria-label="search">
        <SearchIcon />
      </IconButton>
      {isFocused && (
        <SearchBarDropdown
          searchQuery={searchQuery}
          searchHistory={mockSearchHistory}
          suggestions={mockSuggestions}
        />
      )}
    </Paper>
  );
}
