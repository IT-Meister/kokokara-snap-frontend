import React, {useState} from "react";
import Image from "next/image";

import {Box, Typography, CardMedia, IconButton, Modal} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useRouter} from "next/navigation";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

import CustomProfileIcon from "../common/CustomProfileIcon";
import {PostData} from "@/types/PostData";

interface PostDetailViewProps {
  selectedPost: PostData | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<PostData | null>>;
}

export default function PostDetailView(props: PostDetailViewProps) {
  const router = useRouter();
  const {selectedPost, setSelectedPost} = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleClose = () => {
    setSelectedPost(null);
  };

  const handleOpenInFull = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleProfileClick = () => {
    // route to profile page based on profile ID?
  };

  return (
    <Box>
      {selectedPost && (
        <Box
          sx={{
            position: "relative",
            right: 0,
            m: 2,
            width: "40%", // 40% of the map's width
            height: "750px",
            bgcolor: "background.paper",
            boxShadow: 24,
            zIndex: 1,
            borderRadius: 4,
            p: 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Image section */}
          <Box
            sx={{
              width: "100%",
              height: "300px", // Set height for the image section
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={selectedPost.url}
              alt={selectedPost.title}
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          </Box>

          {/* Profile icon and description */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
            }}
          >
            <CustomProfileIcon src="/mockProfile1.jpg" size={50} />
            <Typography variant="h6" component="h2" sx={{ml: 2}}>
              {selectedPost.title}
            </Typography>
          </Box>

          {/* Description */}
          <Box
            sx={{
              padding: 2,
              flex: 1,
              overflowY: "auto", // Ensure long descriptions scroll
              mt: 2,
            }}
          >
            <Typography variant="body1">{selectedPost.description}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              bottom: 8,
              right: 8,
            }}
          >
            <IconButton onClick={handleOpenInFull}>
              <OpenInFullIcon />
            </IconButton>
          </Box>

          <Modal open={showModal} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxHeight: "80%",
                maxWidth: "90%",
                bgcolor: "background.paper",
                boxShadow: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={selectedPost?.url}
                alt="Modal"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                <IconButton onClick={handleCloseModal}>
                  <CloseIcon sx={{fontSize: 40}} />
                </IconButton>
              </Box>
            </Box>
          </Modal>
        </Box>
      )}
    </Box>
  );
}
