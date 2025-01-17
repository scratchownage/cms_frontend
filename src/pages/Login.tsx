import { LockOutlined } from "@mui/icons-material";
import Grid from '@mui/material/Grid2';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import { useState } from "react";
import { AxiosError } from 'axios';
import { useAuth } from "../utils/useAuth";
import publicClient from "../utils/publicClient";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
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

  const handleLogin = async () => {
    if (!validateForm()) return;
    // Handle registration logic here
    try {

      const data = { username: email, password }
      const response = await publicClient.post('/api/auth/login', data)
      const user = response.data
      login(user)
      navigate("/")

    } catch (error: unknown) {
      if (error instanceof AxiosError) {

        console.error(error);
        if (error.response?.data?.message === 'Email already in use') {
          setErrors(prevErrors => ({
            ...prevErrors,
            email: 'This email is already in use',
          }));
        }
        setSnackbarMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);

        // Handle specific error (e.g., display a message to the user)
      } else {
        console.error('An unknown error occurred');
      }
      // Set Snackbar for error

    }

  };

  return (
    <Container sx={{ width: '450px', }}>
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
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }} >
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
            onChange={(e) => { setPassword(e.target.value) }}
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

      {/* Snackbar for global notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)} // Using onClose to handle redirection
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default Login;
