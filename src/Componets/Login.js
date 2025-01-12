import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Import your Firebase configuration

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [isOtpSent, setIsOtpSent] = React.useState(false);
  const [confirmationResult, setConfirmationResult] = React.useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible", // 'normal' for visible reCAPTCHA
          callback: (response) => {
            console.log("Recaptcha solved:", response);
          },
        },
        auth
      );
    }
  };

  const handleSendOtp = () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }
    console.log(process.env.NODE_ENV);
    // Skip Recaptcha for test numbers
    if (process.env.NODE_ENV === "development") {
      setConfirmationResult({
        confirm: (otp) => {
          if (otp === "123456") {
            alert("OTP verified successfully!"); 
            navigate("/users");
          } else {
            alert("Invalid OTP.");
          }
        }
      });
      setIsOtpSent(true);
      alert("Using test phone number. Enter the predefined OTP.");
      return;
    }      

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((result) => {
        setConfirmationResult(result);
        setIsOtpSent(true);
        alert("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        alert("Failed to send OTP. Please try again.");
      });
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    confirmationResult
      .confirm(otp)
      .then((result) => {
        alert("Phone number verified successfully!");
        console.log("User:", result.user);
        navigate("/users"); // Navigate to the desired page after login
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        alert("Invalid OTP. Please try again.");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            {!isOtpSent ? (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoFocus
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <div id="recaptcha-container"></div>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSendOtp}
                >
                  Send OTP
                </Button>
              </>
            ) : (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="Enter OTP"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
