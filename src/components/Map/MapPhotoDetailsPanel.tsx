import React, {useState} from "react";

import {Box, Typography, CardMedia, IconButton, Modal} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

interface PhotoDetailViewProps {
  selectedPhoto: {
    title: string;
    imageUrl: string;
    description: string;
  } | null;
  setSelectedPhoto: React.Dispatch<
    React.SetStateAction<{
      title: string;
      imageUrl: string;
      description: string;
    } | null>
  >;
}

export default function PhotoDetailView(props: PhotoDetailViewProps) {
  const {selectedPhoto, setSelectedPhoto} = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleClose = () => {
    setSelectedPhoto(null);
  };

  const handleOpenInFull = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Box>
      {selectedPhoto && (
        <Box
          sx={{
            position: "relative",
            right: 0,
            m: 2,
            width: "40%", // 1/4 of the map's width
            height: "750px",
            bgcolor: "background.paper",
            boxShadow: 24,
            zIndex: 1, // Ensure it appears above the map
            borderRadius: 4, // Change the roundness of the corners
            p: 2,
            display: "flex",
            flexDirection: "column",
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
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={selectedPhoto?.imageUrl}
              alt={selectedPhoto?.title}
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          </Box>
          <Box
            sx={{
              width: "60%",
              padding: 2,
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" component="h2" sx={{mb: 2}}>
              {selectedPhoto?.title}
            </Typography>
            <Typography variant="body1" sx={{mt: 2}}>
              {selectedPhoto?.description}
            </Typography>
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
                width: "80%",
                height: "80%",
                maxWidth: "80vw",
                maxHeight: "80vh",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 2,
                borderRadius: 4,
                display: "flex",
                flexDirection: "row", // Aligns CardMedia and content side by side
              }}
            >
              <img src={selectedPhoto?.imageUrl} alt={selectedPhoto?.title} />

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
