import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Snackbar,
  Alert

} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import publicClient from "../utils/publicClient";
import { AxiosError } from 'axios';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(false);  // Add loading state
  const navigate = useNavigate()
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });




  const validateForm = () => {
    const newErrors = {
      username: username ? "" : "Username is required.",
      email: /\S+@\S+\.\S+/.test(email) ? "" : "Invalid email address.",
      password: password.length >= 6 ? "" : "Password must be at least 6 characters.",
      confirmPassword:
        confirmPassword === password ? "" : "Passwords do not match.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSnackbarClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "timeout" && snackbarSeverity === "success") {
      // Redirect after Snackbar auto closes
      navigate("/login");
    }
    setOpenSnackbar(false);
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    // Handle registration logic here
    try {
      const data = { username, email, password }
      const response = await publicClient.post('api/auth/signup', data)

      if (response?.data) {

        setSnackbarMessage('Account created successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);


        // Clear form after successful registration
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

      }

    } catch (error: unknown) {
      if (error instanceof AxiosError) {

        console.error(error);
        if (error.response?.data?.message === 'Email already in use') {
          setErrors(prevErrors => ({
            ...prevErrors,
            email: 'This email is already in use',
          }));
          return
        }
        setSnackbarMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);

        // Handle specific error (e.g., display a message to the user)
      } else {
        console.error('An unknown error occurred');
      }
      // Set Snackbar for error

    } finally {

      setIsLoading(false);  // Reset loading state
    }

  };


  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 15,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: 'solid 2px #1565c0',
          borderRadius: '25px'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Register</Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={Boolean(errors.username)}
                helperText={errors.username}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRegister}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
          <Grid container justifyContent="center">
            <Grid>
              <Link to="/login">Already have an account? Login</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Snackbar for global notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose} // Using onClose to handle redirection
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

export default Register;