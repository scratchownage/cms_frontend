import { LockOutlined } from "@mui/icons-material";
import Grid from '@mui/material/Grid2';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // for redirection after successful login
  const { login } = useAuth(); 
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });


  const validateForm = () => {
    const newErrors = {
      email: email ? "" : "Username or Email is required.",
      password: password ? "" : "Password is required.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleLogin = () => {
      if (!validateForm()) return;
      // Handle registration logic here
      console.log("Login user:", {email, password });
      login({
        id: "",
        username: "",
        role: ""
      })
      navigate("/")
  };

  return (
    <Container sx={{width : '450px', }}>
      <CssBaseline />
      <Box
        sx={{
          mt: 15,
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: 'solid 2px #1565c0',
          borderRadius: '25px',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.light"}} >
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Login</Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email or Username"
            name="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Grid container justifyContent={"center"}>
            <Grid>
              <Link to="/register">Don't have an account? Register</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
