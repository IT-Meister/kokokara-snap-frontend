"use client";

import React, {useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import {Google as GoogleIcon} from "@mui/icons-material";
import {useRouter} from "next/navigation";
import {useUser, useSetUser} from "@/libs/store/store";

export default function SignUpPage() {
  const router = useRouter();
  const user = useUser();
  const setUser = useSetUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForgetPassword = () => {
    router.push("/accounts/forget-password");
  };

  const handleClickSignUp = () => {
    router.push("/accounts/signup");
  };

  const handleClickLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page

    try {
      const response = await fetch("http://127.0.0.1:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      // Handle the login response (e.g., save token, redirect user)
      setUser(data["data"]);
      console.log("Login successful:", user);
      // Example: save token to localStorage
      // localStorage.setItem("token", data.token);

      // Redirect to the dashboard or home page
      router.push("/");
    } catch (error) {
      setError("ログインに失敗しました。もう一度お試しください。");
      console.error("Error during login:", error);
    }
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
        component="form"
        onSubmit={handleClickLogin} // Form submission handled here
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
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Capture email input
        />
        <TextField
          fullWidth
          label="パスワード"
          variant="outlined"
          margin="normal"
          type="password"
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Capture password input
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          type="submit" // Let the form handle submission
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
}
