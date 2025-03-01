import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { TextField, Button, Paper, Typography, Stack } from "@mui/material";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        width: "100%",
        maxWidth: 400,
        margin: "auto",
        mt: 5,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default LoginForm;
