import { signIn } from "next-auth/react";
import { useState, FormEvent, JSX } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";

export default function LoginContainer(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Clear previous error
    setSnackbarMessage("");

    // Validate email and password
    if (!email || !password) {
      setSnackbarMessage("Both fields are required.");
      setSnackbarOpen(true);
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setSnackbarMessage("Invalid email or password");
      setSnackbarOpen(true);
    } else {
      window.location.href = "/dashboard";
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        background: "#FAFAFB",
      }}
    >
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
                <Typography fontWeight={'bold'} variant="h4" gutterBottom>
                  Sign In
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Just sign in if you have an account. Enjoy our Website
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  width="100%"
                  mt={2}
                >
                  <TextField
                    label="Your Email / Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="small"
                    error={!!snackbarMessage}
                  />
                  <TextField
                    label="Enter Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="small"
                    error={!!snackbarMessage}

                  />
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <FormControlLabel
                      control={<Checkbox color="primary" />}
                      label="Remember Me"
                    />
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Link href="#" variant="body2">
                        Forgot Password
                      </Link>
                    </Box>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                  >
                    Login
                  </Button>
                </Box>
                <Typography variant="body2" mt={2}>
                  <Link href="/auth/register" variant="body2">
                    Already have an Square account? Log in
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
