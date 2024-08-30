import React from "react";
import Image from 'next/image';

import {
  Paper,
  Box,
  Typography,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {styled} from "@mui/system";
import {Search as SearchIcon} from "@mui/icons-material";

interface SearchBarDropdownProps {
  searchQuery: string;
  searchHistory: string[];
  suggestions: {label: string; image: string}[];
}

const SearchDropdownWrapper = styled(Paper)({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "97%",
  zIndex: 10,
  padding: "20px",
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
});

const SearchBarDropdown: React.FC<SearchBarDropdownProps> = ({
  searchQuery,
  searchHistory,
  suggestions,
}) => {
  const mockRecommendations = [
    "React",
    "JavaScript",
    "TypeScript",
    "Material-UI",
    "Redux",
    "Node.js",
    "Express",
    "MongoDB",
  ];

  return (
    <SearchDropdownWrapper>
      {searchQuery ? (
        <List>
          {mockRecommendations
            .filter((rec: string) =>
              rec.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((rec: string, index: React.Key) => (
              <ListItem
                key={index}
                sx={{
                  cursor: "pointer",
                  "&:hover": {backgroundColor: "rgba(0, 0, 0, 0.08)"},
                }}
              >
                <SearchIcon sx={{p: 2}} />
                <ListItemText primary={rec} />
              </ListItem>
            ))}
        </List>
      ) : (
        <>
          <Box sx={{mt: 2}}>
            <Typography variant="h6">検索履歴</Typography>
            <Box sx={{display: "flex", flexWrap: "wrap", gap: "8px", mt: 2}}>
              {searchHistory.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => {}}
                  variant="outlined"
                  sx={{fontSize: "14px"}}
                />
              ))}
            </Box>
          </Box>
          <Box sx={{mt: 2}}>
            <Typography variant="h6">あなたへのおすすめ</Typography>
            <Grid container spacing={2} sx={{mt: 2}}>
              {suggestions.map((item, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Paper
                    sx={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      textAlign: "center",
                      p: 1,
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Typography variant="body2">{item.label}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </SearchDropdownWrapper>
  );
};

export default SearchBarDropdown;
