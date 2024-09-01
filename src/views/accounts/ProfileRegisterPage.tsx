"use client";

import React, {useState} from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Avatar,
} from "@mui/material";

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  // Add more prefectures as needed
];

export default function ProfileRegisterPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedPrefecture, setSelectedPrefecture] = useState("");

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic to handle form submission, such as sending the data to your server
    console.log({
      profileImage,
      displayName,
      userName,
      selectedPrefecture,
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Box
        width="400px"
        padding="2rem"
        borderRadius="8px"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        bgcolor="#fff"
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          プロフィール登録
        </Typography>
        <Typography variant="body1" gutterBottom>
          ユーザー情報を登録してください
        </Typography>

        {/* Profile Image */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginBottom="1rem"
          marginTop="1rem"
        >
          <Avatar
            src={profileImage || ""}
            sx={{width: 80, height: 80, marginBottom: "1rem"}}
          />
          <Button
            variant="contained"
            component="label"
            sx={{marginBottom: "1rem"}}
          >
            写真をアップロード
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </Button>
        </Box>

        {/* Display Name */}
        <TextField
          fullWidth
          label="ディスプレイネーム"
          variant="outlined"
          margin="normal"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />

        {/* Username */}
        <TextField
          fullWidth
          label="ユーザーネーム"
          variant="outlined"
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        {/* Prefecture */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="prefecture-label">都道府県</InputLabel>
          <Select
            labelId="prefecture-label"
            value={selectedPrefecture}
            onChange={(e) => setSelectedPrefecture(e.target.value as string)}
            label="都道府県"
            required
          >
            {prefectures.map((prefecture) => (
              <MenuItem key={prefecture} value={prefecture}>
                {prefecture}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            marginTop: "1rem",
            background: "linear-gradient(to right, #4f44e0, #6c63ff)",
            textTransform: "none",
          }}
        >
          プロフィールを登録
        </Button>
      </Box>
    </Box>
  );
}
