import React, { useState } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const SearchBar: React.FC = () => {
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
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
