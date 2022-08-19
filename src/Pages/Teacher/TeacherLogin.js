import {
  Alert,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PasswordIcon from "@mui/icons-material/Password";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
function TeacherLogin() {
  React.useEffect(() => {
    document.title = "Teacher Login";
  }, []);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorHelperText, setEmailErrorHelperText] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorHelperText, setPasswordErrorHelperText] =
    React.useState("");

  const [isShown, setIsShown] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [submitLoading, setSubmitLoading] = React.useState(false);

  const { currentUser, signUp, contextLoading } = useAuth();

  const [helperText, setHelperText] = React.useState("");

  const navigate = useNavigate();
  React.useEffect(() => {
    const role = localStorage.getItem("role");
    if (currentUser && !contextLoading && role === "teacher") {
      navigate("/teacher/dashboard");
    }
  }, [currentUser, contextLoading, navigate]);

  const togglePassword = () => {
    setIsShown(!isShown);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    if (event.target.value.length === 0) {
      setEmailError(true);
      setEmailErrorHelperText("Email is required");
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        event.target.value
      )
    ) {
      setEmailError(true);
      setEmailErrorHelperText("Invalid email");
    } else {
      setEmailError(false);
      setEmailErrorHelperText("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signUp(email, password)
      .then(() => {
        setSubmitLoading(false);
        setError(false);
        localStorage.setItem("email", email);
        localStorage.setItem("role", "teacher");
        navigate("/teacher/dashboard");
      })
      .catch((error) => {
        setSubmitLoading(false);
        setError(true);
        setHelperText(error.message);
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
              <Typography className="text-center" variant="h4">
                Teacher Login
              </Typography>
              <Typography
                className="text-center"
                variant="h5"
                sx={{ marginY: 5 }}
              >
                This is a form to login to the portal
              </Typography>
            </CardContent>
            <Box sx={{ margin: "5%" }} component="form" onSubmit={handleSubmit}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="student-register-aadhar"
                  label="Email"
                  variant="outlined"
                  required
                  aria-describedby="student-register-email-helper"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter your email"
                  error={emailError}
                  value={email}
                  helperText={emailError ? emailErrorHelperText : ""}
                  onChange={handleEmail}
                  type="email"
                />
              </FormControl>
              <br />
              <br />
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="teacher-login-password"
                  label="Password"
                  variant="outlined"
                  required
                  aria-describedby="teacher-login-password-helper"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter your password"
                  error={passwordError}
                  value={password}
                  helperText={passwordError ? passwordErrorHelperText : ""}
                  onChange={(event) => setPassword(event.target.value)}
                  type={isShown ? "text" : "password"}
                />
              </FormControl>
              <br />
              <br />
              <FormControlLabel
                control={<Checkbox onClick={togglePassword} />}
                label="Show Password"
              />
              <br />
              <br />
              <Box textAlign="center">
                <LoadingButton
                  loading={submitLoading}
                  loadingPosition="end"
                  endIcon={<LoginIcon />}
                  variant="contained"
                  type="submit"
                  disabled={emailError || passwordError}
                >
                  Login
                </LoadingButton>
              </Box>
            </Box>
          </React.Fragment>
        </Card>
      </Box>
    </div>
  );
}

export default TeacherLogin;
