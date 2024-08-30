"use client";

import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import {Google as GoogleIcon} from "@mui/icons-material";
import {useRouter} from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const handleForgetPassword = () => {
    router.push("/accounts/forget-password");
  };

  const handleClickSignUp = () => {
    router.push("/accounts/signup");
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
          ログイン
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
          ログイン
        </Button>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="1rem"
        >
          <Button color="primary" onClick={handleForgetPassword}>
            パスワードを忘れた場合は
          </Button>
        </Box>
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
          Sign in with Google
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
            アカウントをお持ちでないですか？
          </Typography>
          <Button color="primary" onClick={handleClickSignUp}>
            登録する
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
