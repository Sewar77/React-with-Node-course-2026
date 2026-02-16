import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
function LandingHome() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
    >
      <Typography variant="h1">Welcome</Typography>
      <Typography variant="body1">This is our store</Typography>

      <Box display={"flex"} gap={2}>
        <Button
          color="warning"
          variant="contained"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          color="warning"
          variant="contained"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
//navigate
export default LandingHome;
