"use client";

import React, {useState, Suspense} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";

import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Paper,
  Collapse,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import {useUser} from "@/libs/store/store";

export default function PostDetails() {
  // for user inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cameraBrand, setCameraBrand] = useState("");
  const [cameraName, setCameraName] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);
  const [snapTime, setSnapTime] = useState("");
  const [iso, setIso] = useState("");
  const [fValue, setFValue] = useState("");
  const [shutterSpeed, setShutterSpeed] = useState("");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const user = useUser();

  const searchParams = useSearchParams();
  const angle = searchParams.get("angle");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude"); // Prevent the form from submitting the default way
  const imagePath = searchParams.get("imagePath");

  // Suspense-wrapped component for searchParams
  function SearchParamsComponent() {
    const searchParams = useSearchParams();
    const imagePath = searchParams.get("imagePath");

    return (
      <>
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
          <Image
            src={decodeURIComponent(imagePath!)}
            alt="Preview"
            fill
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
      </>
    );
  }

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  // Suspense-wrapped component for searchParams
  const handlePostClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Construct the post data with required and optional fields
    const postData = {
      // required
      user_id: user["id"] ?? 0,
      url: decodeURIComponent(imagePath!),
      title,
      prefecutre: "",
      city_name: "",
      brand: cameraBrand,
      camera_name: cameraName,
      latitude: latitude,
      longitude: longitude,

      // optional
      description: description || null, // optional
      snap_time: snapTime || null, // optional
      angle: angle || null, // optional
      iso: iso || null, // optional
      f_value: fValue || null, // optional
      shutter_speed: shutterSpeed || null, // optional
    };

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8080/api/v1/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Successfully posted, redirect or notify user
        alert("投稿が成功しました！");
        router.push("/post/details"); // Redirect after success
      } else {
        // Handle error response
        alert("投稿に失敗しました。もう一度お試しください。");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("サーバーへの接続に問題があります。");
    }
    setLoading(false);
  };

  return (
    <Box sx={{backgroundColor: "#fff", height: "100vh", width: "100%"}}>
      {/* Overlay the loading spinner */}
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(255, 255, 255, 0.7)" // Semi-transparent overlay
          zIndex={10}
          flexDirection="column"
        >
          <CircularProgress />
          <Typography mt={2}>投稿しています...</Typography>
        </Box>
      )}
      {/* Main Content */}
      <Container maxWidth="lg" sx={{mt: 10}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            {/* Wrap the part that uses useSearchParams with Suspense */}
            <Suspense fallback={<div>Loading...</div>}>
              <SearchParamsComponent />
            </Suspense>
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
              {/* Required Fields */}
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

              {/* Optional Fields */}
              <TextField
                label="詳細"
                placeholder="詳細を追加する"
                variant="outlined"
                fullWidth
                sx={{mb: 2}}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={false}
              />

              {/* Optional Fields */}
              <TextField
                label="カメラブランド"
                placeholder="カメラブランドを追加する"
                variant="outlined"
                fullWidth
                sx={{mb: 2}}
                value={cameraBrand}
                onChange={(e) => setCameraBrand(e.target.value)}
                required={true}
              />
              <TextField
                label="カメラ名"
                placeholder="カメラ名を追加する"
                variant="outlined"
                fullWidth
                sx={{mb: 2}}
                value={cameraName}
                onChange={(e) => setCameraName(e.target.value)}
                required={true}
              />
              <TextField
                label="スナップ時間"
                placeholder="スナップ時間を追加する (例: 2023-09-13T14:00)"
                type="datetime-local"
                fullWidth
                sx={{mb: 2}}
                value={snapTime}
                onChange={(e) => setSnapTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="ISO"
                placeholder="ISOを追加する"
                variant="outlined"
                fullWidth
                sx={{mb: 2}}
                value={iso}
                onChange={(e) => setIso(e.target.value)}
              />
              <TextField
                label="F値"
                placeholder="F値を追加する"
                variant="outlined"
                fullWidth
                sx={{mb: 2}}
                value={fValue}
                onChange={(e) => setFValue(e.target.value)}
              />
              <TextField
                label="シャッタースピード"
                placeholder="シャッタースピードを追加する"
                variant="outlined"
                fullWidth
                sx={{mb: 2}}
                value={shutterSpeed}
                onChange={(e) => setShutterSpeed(e.target.value)}
              />

              {/* Additional Options */}
              <Button
                onClick={toggleMoreOptions}
                endIcon={<ExpandMoreIcon />}
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
                投稿する
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
