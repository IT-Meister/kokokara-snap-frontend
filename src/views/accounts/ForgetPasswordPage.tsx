import React from "react";
import {Box, Button, TextField, Typography} from "@mui/material";

const ForgotPasswordPage: React.FC = () => {
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
      >
        <Typography variant="h4" component="h1" gutterBottom>
          認証コードを送る
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter your email address below and we'll send you a link to reset your
          password.
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          type="email"
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
          Send Reset Link
        </Button>

        <Button color="primary" href="/login">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
