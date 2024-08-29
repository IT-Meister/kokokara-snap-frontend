import React from "react";
import {
  Modal,
  Box,
  Typography,
  CardMedia,
  IconButton,
  Button,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useRouter} from "next/navigation";

interface Post {
  id: number;
  title: string;
  description: string;
  url: string;
}

interface PhotoModalProps {
  open: boolean;
  post: Post | null;
  onClose: () => void;
}

const HomePhotoModal: React.FC<PhotoModalProps> = ({open, post, onClose}) => {
  const router = useRouter();
  const handleMoreClick = () => {
    // navigate to mapView with this photo is pointed.
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open} timeout={700}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 4,
            p: 2,
            display: "flex",
            flexDirection: "row", // Aligns CardMedia and content side by side
          }}
        >
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <IconButton onClick={onClose}>
              <CloseIcon sx={{fontSize: 40}} />
            </IconButton>
          </Box>
          {post && (
            <>
              <Box
                sx={{
                  width: "50%", // Adjust this percentage based on how much space you want the image to take
                  maxWidth: "100%", // Ensure the image fits within its container
                  maxHeight: "100%", // Ensure the image does not exceed the modal height
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  image={post.url}
                  alt={post.title}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain", // Maintain the aspect ratio of the image
                    borderRadius: 2,
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: "50%", // The content area takes the remaining space
                  padding: 2, // Space around the text content
                  overflowY: "auto", // Allows scrolling if content exceeds modal height
                }}
              >
                <Typography variant="h6" component="h2" sx={{mb: 2}}>
                  {post.title}
                </Typography>
                <Typography variant="body1" sx={{mt: 2}}>
                  {post.description}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#e60023",
                    color: "#fff",
                    padding: "8px 24px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                  onClick={handleMoreClick}
                >
                  詳しく見る
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default HomePhotoModal;
