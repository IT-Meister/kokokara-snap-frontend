import React from "react";
import Avatar from "@mui/material/Avatar";
import {styled} from "@mui/system";

interface IconProps {
  src: string;
  size?: number;
}

const StyledAvatar = styled(Avatar)<{size: number}>(({size}) => ({
  width: size,
  height: size,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  },
}));

const CustomProfileIcon: React.FC<IconProps> = ({src, size = 50}) => {
  return <StyledAvatar alt="Profile Image" src={src} size={size} />;
};

export default CustomProfileIcon;
