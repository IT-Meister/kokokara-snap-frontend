// src/components/common/ProfileBanner.tsx
import React from "react";
import { Box } from "@mui/material";

interface ProfileBannerProps {
  imageUrl: string;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({ imageUrl }) => {
  return (
    <Box
      component="div"
      sx={{
        width: "1000px",
        height: "300px",
        margin: "0 auto",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 2,
      }}
    />
  );
};

export default ProfileBanner;
