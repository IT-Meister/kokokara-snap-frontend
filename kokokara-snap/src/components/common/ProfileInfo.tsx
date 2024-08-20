// src/components/common/ProfileInfo.tsx
import React from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";

interface ProfileInfoProps {
  avatarUrl: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  avatarUrl,
  name,
  bio,
  followers,
  following,
}) => {
  return (
    <Box sx={{ textAlign: "center", position: "relative", marginTop: -10 }}>
      <Avatar
        src={avatarUrl}
        sx={{
          width: 150,
          height: 150,
          margin: "0 auto",
          border: "5px solid white",
          position: "relative",
          top: "-75px",
        }}
      />
      <Typography variant="h5" sx={{ marginTop: 2 }}>
        {name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {bio}
      </Typography>
      <Box
        sx={{ marginTop: 2, display: "flex", justifyContent: "center", gap: 2 }}
      >
        <Typography>フォロワー：{followers} 人</Typography>
        <Typography>|</Typography>
        <Typography>フォロー：{following} 人</Typography>
      </Box>
      <Box
        sx={{ marginTop: 3, display: "flex", justifyContent: "center", gap: 2 }}
      >
        <Button variant="outlined">🔗</Button>
        <Button variant="contained" color="success">
          フォロー
        </Button>
        <Button variant="outlined">•••</Button>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
