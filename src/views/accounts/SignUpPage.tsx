"use client";

import React, {useState} from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import {useRouter} from "next/navigation";
import {Google as GoogleIcon} from "@mui/icons-material";

import {DataConstants} from "@/constants/data";

export default function SignUpPage() {
  const router = useRouter();

  const [userName, setUsername] = useState("");
  const [displayName, setDisplayname] = useState("");
  const [email, setEmail] = useState("");
  const [prefecture, setPrefecture] = useState<number | "">(13); // Use number for prefecture value
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const prefectures = DataConstants.prefectures; // This should have the list of prefectures with value as integers

  const handleClickLogIn = () => {
    router.push("/accounts/login");
  };

  const handlePrefectureChange = (event: SelectChangeEvent) => {
    setPrefecture(Number(event.target.value)); // Store prefecture value as number
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(event.target.value);

    // Check if password and confirmation match
    if (event.target.value !== password) {
      setPasswordError("パスワードが一致しません");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Check if passwords match before submitting
    if (password !== passwordConfirmation) {
      setPasswordError("パスワードが一致しません");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8080/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          displayName,
          email,
          password,
          prefecture,
        }), // Send the user data as JSON
      });

      if (!response.ok) {
        console.log(userName, displayName, email, password, prefecture);
        throw new Error("Signup failed");
      }

      const data = await response.json();
      console.log("Signup successful:", data);

      // After successful signup, redirect to login page or dashboard
      router.push("/accounts/login");
    } catch (error) {
      console.error("Error during signup:", error);
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
        onSubmit={handleSubmit} // Handle form submission
      >
        <Typography variant="h4" component="h1" gutterBottom>
          アカウントを登録
        </Typography>
        <Typography variant="body1" gutterBottom>
          ユーザー情報を入力してください
        </Typography>

        {/* User Name */}
        <TextField
          fullWidth
          label="ユーザー名"
          variant="outlined"
          margin="normal"
          required={true}
          value={userName}
          onChange={(e) => setUsername(e.target.value)} // Capture username
        />

        {/* Display Name */}
        <TextField
          fullWidth
          label="ディスプレイ名"
          variant="outlined"
          margin="normal"
          required={true}
          value={displayName}
          onChange={(e) => setDisplayname(e.target.value)} // Capture username
        />

        {/* Email */}
        <TextField
          fullWidth
          label="メールアドレス"
          variant="outlined"
          margin="normal"
          type="email"
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Capture email
        />

        {/* Password */}
        <TextField
          fullWidth
          label="パスワード"
          variant="outlined"
          margin="normal"
          type="password"
          required={true}
          value={password}
          onChange={handlePasswordChange}
        />

        {/* Password Confirmation */}
        <TextField
          fullWidth
          label="パスワード (確認)"
          variant="outlined"
          margin="normal"
          type="password"
          required={true}
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          error={!!passwordError}
          helperText={passwordError}
        />

        {/* Prefecture Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>都道府県</InputLabel>
          <Select
            value={prefecture === "" ? "" : String(prefecture)} // Ensure value is string for Select component
            onChange={handlePrefectureChange}
            label="都道府県"
            required={true}
          >
            {prefectures.map((pref) => (
              <MenuItem key={pref.value} value={pref.value}>
                {pref.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit" // Trigger form submission
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
          type="button" // Prevent form submission
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
