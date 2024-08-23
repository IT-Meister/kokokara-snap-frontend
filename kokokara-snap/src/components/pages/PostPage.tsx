import React from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Paper,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Collapse,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../common/Header";

const PinCreationPage = () => {
  const [board, setBoard] = React.useState("");
  const [showMoreOptions, setShowMoreOptions] = React.useState(false);

  const handleBoardChange = (event: SelectChangeEvent) => {
    setBoard(event.target.value as string);
  };

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  return (
    <Box sx={{ backgroundColor: "#fff", height: "100vh" }}>
      <Header />
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Save/Publish Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4,
            marginBottom: 5,
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
          >
            公開する
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            {/* Image Preview */}
            <Paper
              variant="outlined"
              sx={{
                width: "100%",
                paddingTop: "150%",
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
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
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "#fff",
                }}
              >
                <EditIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              label="タイトル"
              placeholder="タイトルを追加する"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="説明文"
              placeholder="詳しい説明文を追加する"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <TextField
              label="リンク"
              placeholder="リンクを追加する"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
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

export default PinCreationPage;
