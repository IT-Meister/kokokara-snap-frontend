import React from "react";
import Avatar from "@mui/material/Avatar";
import {styled} from "@mui/system";
import {IconButton} from "@mui/material";
import {useRouter} from "next/navigation";

interface IconProps {
  src: string;
  size?: number;
  onClick?: () => void;
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

const CustomProfileIcon: React.FC<IconProps> = ({src, size = 50, onClick}) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/profile/1");
  };

  return (
    <StyledAvatar
      alt="Profile Image"
      src={src}
      size={size}
      onClick={onClick || handleOnClick}
    />
  );
};

export default CustomProfileIcon;
