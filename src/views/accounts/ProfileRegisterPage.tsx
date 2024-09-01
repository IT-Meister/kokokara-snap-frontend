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
  "Hokkaido",
  "Aomori",
  "Iwate",
  "Miyagi",
  "Akita",
  "Yamagata",
  "Fukushima",
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
          Register
        </Typography>

        {/* Profile Image */}
        <Box display="flex" justifyContent="center" marginBottom="1rem">
          <Avatar src={profileImage || ""} sx={{width: 80, height: 80}} />
        </Box>
        <Button
          variant="contained"
          component="label"
          sx={{marginBottom: "1rem"}}
        >
          Upload Profile Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleProfileImageChange}
          />
        </Button>

        {/* Display Name */}
        <TextField
          fullWidth
          label="Display Name"
          variant="outlined"
          margin="normal"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />

        {/* Username */}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        {/* Prefecture */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="prefecture-label">Prefecture</InputLabel>
          <Select
            labelId="prefecture-label"
            value={selectedPrefecture}
            onChange={(e) => setSelectedPrefecture(e.target.value as string)}
            label="Prefecture"
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
          Register
        </Button>
      </Box>
    </Box>
  );
}
