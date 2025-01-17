import { useForm, Controller } from "react-hook-form";
import { useState, FormEvent, JSX } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Grid,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterContainer(): JSX.Element {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const onSubmit = async (data: FormData): Promise<void> => {
    if (data.password !== data.confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarOpen(true);
      return;
    }
  
    try {
      const response = await axios.post(`${process.env.urlApi}/register`, {
        email: data.email,
        fullName: `${data.firstName} ${data.lastName}`,
        password: data.password,
      });
  
      if (response.status === 200 || response.status === 201) {
        setSnackbarMessage("Registration successful!");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.errors?.[0] || "Registration failed. Please try again.";
      setSnackbarMessage(errorMsg);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ background: "#FAFAFB" }}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: "url('/images/background-login.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Card sx={{ padding: 4, borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography fontWeight="bold" variant="h4" gutterBottom>
                  Register
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Let’s Sign up first for enter into Square Website. Uh She Up!
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  width="100%"
                  mt={2}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        rules={{ required: "First name is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            size="small"
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Last name is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            size="small"
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Invalid phone number",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            size="small"
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email format",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            size="small"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            size="small"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={toggleShowPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === watch("password") ||
                            "Passwords do not match",
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Confirm Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            size="small"
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={toggleShowPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box display="flex" flexDirection="column" gap={2}>
                        <Typography variant="h6" fontWeight="bold">
                          Tell us about yourself
                        </Typography>
                        <Box position="relative">
                          <TextField
                            placeholder="Hello my name..."
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            sx={{
                              borderRadius: 2,
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    mt={3}
                    gap={3}
                  >
                    <Link href="/auth/signin">
                      <Button variant="contained" color="inherit">
                        Login
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Register
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
