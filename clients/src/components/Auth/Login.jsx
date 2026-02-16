import React from "react";
import { useState } from "react";
import api from "../../api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
import { Box, Button, TextField, Typography } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const role = user?.role;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.status !== 200) {
        toast.error(res.data.message);
      }

      const { token, user } = res.data;
      login(user, token);

      user.role === "admin"
        ? navigate("/admin/dashboard")
        : navigate("/user/dashboard"); //Role Based
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
    >
      <Typography variant="h2" align="center" mb={3}>
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ mt: 2, mt: 2 }}
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />

        <TextField
          sx={{ mt: 2, mb: 2 }}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          sx={{ pt: 2, pb: 2 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;
