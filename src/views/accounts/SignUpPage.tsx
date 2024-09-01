"use client";

import React from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import {useRouter} from "next/navigation";
import {Google as GoogleIcon} from "@mui/icons-material";

export default function SignUpPage() {
  const router = useRouter();

  const handleClickLogIn = () => {
    router.push("/accounts/login");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Box
        width="400px"
        padding="2rem"
        borderRadius="8px"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        bgcolor="#fff"
        component="form" // The Box acts as the form element
      >
        <Typography variant="h4" component="h1" gutterBottom>
          アカウントを登録
        </Typography>
        <Typography variant="body1" gutterBottom>
          メールアドレスとパスワードを入力してください
        </Typography>
        <TextField
          fullWidth
          label="メールアドレス"
          variant="outlined"
          margin="normal"
          type="email"
          required={true}
        />
        <TextField
          fullWidth
          label="パスワード"
          variant="outlined"
          margin="normal"
          type="password"
          required={true}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            marginTop: "1rem",
            background: "linear-gradient(to right, #4f44e0, #6c63ff)",
            textTransform: "none",
          }}
        >
          登録
        </Button>
        <Typography
          variant="body2"
          align="center"
          marginTop="1rem"
          marginBottom="1rem"
        >
          または
        </Typography>
        <Button
          type="button" // Changed type to "button" to prevent form submission
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            textTransform: "none",
          }}
        >
          Sign Up with Google
        </Button>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="1rem"
        >
          <Typography
            variant="body2"
            align="center"
            marginTop="1rem"
            marginBottom="1rem"
          >
            アカウントをお持ちですか？
          </Typography>
          <Button color="primary" onClick={handleClickLogIn}>
            ログイン
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
