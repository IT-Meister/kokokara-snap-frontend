import React from "react";
import Button from "@mui/material/Button";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useRouter } from "next/navigation";

export default function BackButton({
  text = "戻る",
  onClick = () => {},
  startIcon = <NavigateBeforeIcon />,
  sx = {},
}) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="contained"
      startIcon={startIcon}
      onClick={handleClick}
      sx={{
        alignSelf: "flex-start",
        backgroundColor: "#007bff",
        margin: 2,
        "&:hover": {
          backgroundColor: "#0056b3",
        },
        color: "#fff",
        padding: "8px 24px",
        fontSize: "16px",
        fontWeight: "bold",
        ...sx, // Allow additional styling through the sx prop
      }}
    >
      {text}
    </Button>
  );
}
