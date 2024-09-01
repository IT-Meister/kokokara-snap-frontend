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
  "北海道", // Hokkaido
  "青森県", // Aomori
  "岩手県", // Iwate
  "宮城県", // Miyagi
  "秋田県", // Akita
  "山形県", // Yamagata
  "福島県", // Fukushima
  // Add more prefectures as needed
];

export default function ProfileEditPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("ユーザーの表示名"); // Example default value
  const [userName, setUserName] = useState("ユーザーの名前"); // Example default value
  const [email, setEmail] = useState("user@example.com"); // Example default value
  const [password, setPassword] = useState(""); // Password field should be empty for security
  const [selectedPrefecture, setSelectedPrefecture] = useState("東京都"); // Example default value

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
    // Logic to handle form submission, such as sending the updated data to your server
    console.log({
      profileImage,
      displayName,
      userName,
      email,
      password,
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
          プロフィール編集
        </Typography>

        {/* Profile Image */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginBottom="1rem"
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

        {/* Email */}
        <TextField
          fullWidth
          label="メールアドレス"
          variant="outlined"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <TextField
          fullWidth
          label="パスワード"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          プロフィールを更新
        </Button>
      </Box>
    </Box>
  );
}
