import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Paper,
  MenuItem,
  Select,
  FormControl,
  Collapse,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../common/Header";

const PostPage = () => {
  const [board, setBoard] = useState("");
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // for user inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");

  const handleBoardChange = (event: SelectChangeEvent) => {
    setBoard(event.target.value as string);
  };

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  const handlePostClick = () => {
    // Publish button click action
  };

  // for drag & drop
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    console.log("acceptedFiles:", acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box sx={{ backgroundColor: "#fff", height: "100vh" }}>
      <Header />
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Save/Publish Button */}
        <Box
          className="Publish Button"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 4,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e60023",
              color: "#fff",
              padding: "8px 24px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            onClick={handlePostClick}
          >
            公開する
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            {/* drag & drop Box */}
            <div
              {...getRootProps()}
              style={{
                width: "100%",
              }}
            >
              <input {...getInputProps()} />
              <Paper
                variant="outlined"
                sx={{
                  width: "100%",
                  paddingTop: "150%",
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: isDragActive ? "3px solid #e60023" : "1px solid #ddd",
                  transition: "border 0.1 s ease",
                }}
              >
                <img
                  src="https://via.placeholder.com/300x400"
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
              </Paper>
            </div>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              label="タイトル"
              placeholder="タイトルを追加する"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="説明文"
              placeholder="詳しい説明文を追加する"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="リンク"
              placeholder="リンクを追加する"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                value={board}
                onChange={handleBoardChange}
                displayEmpty
                defaultValue=""
              >
                <MenuItem value="">
                  <em>ボードを選択する</em>
                </MenuItem>
                <MenuItem value={1}>ボードA</MenuItem>
                <MenuItem value={2}>ボードB</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="タグを検索する"
              placeholder="タグを検索する"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            {/* Additional Options */}
            <Box sx={{ display: "flex" }}>
              <Button
                onClick={toggleMoreOptions}
                endIcon={<ExpandMoreIcon />}
                sx={{ color: "#000" }}
              >
                その他のオプション
              </Button>
            </Box>
            <Collapse in={showMoreOptions}>
              {/* Additional options content goes here */}
              <Typography variant="body2" sx={{ mt: 2 }}>
                Additional options content...
              </Typography>
            </Collapse>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PostPage;
