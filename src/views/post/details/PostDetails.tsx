"use client";

import React, {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";

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

export default function PostDetails() {
  // for user inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [board, setBoard] = useState("");
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const imagePath = searchParams.get("imagePath");
  const mapSnapshotPath = searchParams.get("mapSnapshotPath");

  const handleBoardChange = (event: SelectChangeEvent) => {
    setBoard(event.target.value as string);
  };

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  const handlePostClick = () => {
    // Publish button click action
    router.push("/post/details");
  };

  return (
    <Box sx={{backgroundColor: "#fff", height: "100vh", width: "100%"}}>
      {/* Main Content */}
      <Container maxWidth="lg" sx={{mt: 10}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            {/* Image preview */}
            <Paper
              variant="outlined"
              sx={{
                width: "100%",
                paddingTop: "100%",
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <img
                src={decodeURIComponent(imagePath!)}
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

            <Paper
              variant="outlined"
              sx={{
                width: "100%",
                paddingTop: "50%",
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                mt: 1,
              }}
            >
              <img
                src={decodeURIComponent(mapSnapshotPath!)}
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
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                label="タイトル"
                placeholder="タイトルを追加する"
                variant="outlined"
                fullWidth
                sx={{mb: 2}}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required={true}
              />
              <TextField
                label="説明文"
                placeholder="詳しい説明文を追加する"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{mb: 2}}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={true}
              />
              <TextField
                label="リンク"
                placeholder="リンクを追加する"
                variant="outlined"
                fullWidth
                sx={{mb: 2}}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required={true}
              />
              <FormControl fullWidth sx={{mb: 2}}>
                <Select
                  value={board}
                  onChange={handleBoardChange}
                  displayEmpty
                  defaultValue=""
                  required={true}
                >
                  <MenuItem value="">
                    <em>ボードを選択する</em>
                  </MenuItem>
                  <MenuItem value={1}>ボードA</MenuItem>
                  <MenuItem value={2}>ボードB</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="タグを追加する"
                placeholder="タグを追加する"
                variant="outlined"
                fullWidth
                sx={{mb: 2}}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />

              {/* Additional Options */}
              <Button
                onClick={toggleMoreOptions}
                endIcon={<ExpandMoreIcon/>}
                sx={{color: "#000"}}
              >
                その他のオプション
              </Button>
              <Collapse in={showMoreOptions}>
                {/* Additional options content goes here */}
                <Typography variant="body2" sx={{mt: 2}}>
                  Additional options content...
                </Typography>
              </Collapse>

              {/* Save/Publish Button */}
              <Button
                variant="contained"
                type="submit"
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
