/* global grecaptcha */
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useAuth } from "../../Contexts/AuthContext";
import auth from "../../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentLogin() {
  const [helperText, setHelperText] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [aadharNumber, setAadharNumber] = React.useState("");
  const [aadharNumberError, setAadharNumberError] = React.useState(false);
  const [aadharNumberHelperText, setAadharNumberHelperText] =
    React.useState("");

  const [otp, setOtp] = React.useState("");
  const [otpError, setOtpError] = React.useState(false);
  const [otpHelperText, setOtpHelperText] = React.useState("");

  const [AadharNumberLoading, setAadharNumberLoading] = React.useState(false);

  const { currentUser, contextLoading } = useAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    const role = localStorage.getItem("role");
    if (currentUser && !contextLoading && role === "student") {
      navigate("/student/dashboard");
    }
  }, [currentUser, contextLoading, navigate]);

  const handleAadharNumber = async (e) => {
    setAadharNumber(e.target.value);
    if (e.target.value.length < 1) {
      setAadharNumberError(false);
    } else if (
      e.target.value.length > 0 &&
      e.target.value.length === 12 &&
      !isNaN(e.target.value)
    ) {
      setAadharNumberError(false);
      setAadharNumberHelperText("");
      const response = await axios.post(
        "https://smart-india-hackathon-server.vercel.app/api/aadharnumber",
        {
          headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
          },
          aadharNumber: e.target.value,
        }
      );
      console.log(response.data.phoneNumber);
      if (response.data.code === "success") {
        setAadharNumberError(false);
        setAadharNumberHelperText("");

        return requestOtpSubmit(response.data.phoneNumber);
      } else {
        setAadharNumberError(true);
        setAadharNumberHelperText("Aadhar Number not found");
      }
    } else {
      setAadharNumberError(true);
      setAadharNumberHelperText("Please enter a valid aadhar number");
    }
  };

  const handleOtp = (e) => {
    setOtp(e.target.value);
    if (e.target.value.length < 1) {
      setOtpError(false);
    } else if (
      e.target.value.length > 0 &&
      e.target.value.length === 6 &&
      !isNaN(e.target.value)
    ) {
      setOtpError(false);
      setOtpHelperText("");
    }
  };

  const generateRecaptchaVerifier = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      },
      auth
    );
  };

  const requestOtpSubmit = async (phoneNumber) => {
    setAadharNumberLoading(true);
    generateRecaptchaVerifier();
    signInWithPhoneNumber(
      auth,
      phoneNumber.toString(),
      window.recaptchaVerifier
    )
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log("error", error);
        setHelperText("Unable to send otp");
        window.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId);
        });
      });
    setAadharNumberLoading(false);
  };

  const submitOtp = () => {
    window.confirmationResult
      .confirm(otp)
      .then((user) => {
        localStorage.setItem("aadharNumber", aadharNumber);
        localStorage.setItem("role", "student");
        navigate("/student/dashboard");
        setSuccess(true);
      })
      .catch((error) => {
        console.log("error", error);
        setError(true);
      })
      .finally(() => {
        window.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId);
        });
      });
  };

  return (
    <div className="m-5">
      <Box
        sx={{ minWidth: 275, flexGrow: 1 }}
        display="flex"
        flex-direction="column"
        justifyContent="center"
        minHeight="100%"
      >
        <Card variant="outlined" sx={{ minHeight: "100%", flexGrow: 1 }}>
          <React.Fragment>
            <CardContent>
              {error ? <Alert severity="error">{helperText}</Alert> : null}
              {success ? <Alert severity="success">{helperText}</Alert> : null}
              <br />
              <br />
              <Typography className="text-center" variant="h4">
                Student Login
              </Typography>
              <Typography
                className="text-center"
                variant="h5"
                sx={{ marginY: 5 }}
              >
                This is a form to login to the portal
              </Typography>
            </CardContent>
            <Box sx={{ margin: "5%" }} component="form">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexGrow: 1,
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    marginX: "5%",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FormControl variant="outlined">
                    <TextField
                      id="student-register-aadhar"
                      label="Aadhar Number"
                      variant="outlined"
                      required
                      aria-describedby="student-register-email-helper"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditCardIcon />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Enter your aadhar number"
                      error={aadharNumberError}
                      value={aadharNumber}
                      helperText={
                        aadharNumberError ? aadharNumberHelperText : ""
                      }
                      onChange={handleAadharNumber}
                    />
                    <FormHelperText id="student-register-aadhar-helper">
                      We'll never share your Aadhar Details.
                    </FormHelperText>
                  </FormControl>
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={aadharNumberError || AadharNumberLoading}
                    onClick={requestOtpSubmit}
                  >
                    Request Otp
                  </Button>
                </Box>
                <br />
                <br />
                <FormControl variant="outlined">
                  <TextField
                    id="student-register-aadhar"
                    label="Otp"
                    variant="outlined"
                    required
                    aria-describedby="student-login-otp-helper"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCardIcon />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Enter your otp"
                    error={otpError}
                    value={otp}
                    helperText={otpError ? otpHelperText : ""}
                    onChange={handleOtp}
                  />
                </FormControl>
                <br />

                <Button
                  variant="contained"
                  color="primary"
                  disabled={otpError}
                  type="button"
                  onClick={submitOtp}
                >
                  Verify Otp
                </Button>
              </Box>
            </Box>
          </React.Fragment>
        </Card>
      </Box>
      <div id="sign-in-button"></div>
    </div>
  );
}

export default StudentLogin;
