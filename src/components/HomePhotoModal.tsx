import React from "react";
import {Modal, Box, Typography, CardMedia, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Box sx={{display: "flex", justifyContent: "flex-end"}}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {post && (
          <>
            <Typography variant="h6" component="h2" sx={{mb: 2}}>
              {post.title}
            </Typography>
            <CardMedia
              component="img"
              height="300"
              image={post.url}
              alt={post.title}
              sx={{borderRadius: 2}}
            />
            <Typography variant="body1" sx={{mt: 2}}>
              {post.description}
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default HomePhotoModal;
