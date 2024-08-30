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

const SignUpPage: React.FC = () => {
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
          Hey, hello 👋
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter the information you entered while registering.
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          type="email"
          required={true}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          required={true}
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Remember me"
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

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="1rem"
        >
          <Button color="primary">Forgot password?</Button>
        </Box>
        <Typography
          variant="body2"
          align="center"
          marginTop="1rem"
          marginBottom="1rem"
        >
          or
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
      </Box>
    </Box>
  );
};

export default SignUpPage;
