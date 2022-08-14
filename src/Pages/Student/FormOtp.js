import {
  Alert,
  Box,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { LoadingButton } from "@mui/lab";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CodeIcon from "@mui/icons-material/Code";

import { CopyBlock, dracula } from "react-code-blocks";

import axios from "axios";

function FormOtp() {
  const [helperText, setHelperText] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [aadharNumber, setAadharNumber] = React.useState("");
  const [aadharNumberError, setAadharNumberError] = React.useState(false);
  const [aadharNumberHelperText, setAadharNumberHelperText] =
    React.useState("");

  const [classCode, setClassCode] = React.useState("");
  const [classCodeError, setClassCodeError] = React.useState(false);
  const [classCodeHelperText, setClassCodeHelperText] = React.useState("");

  const [submitLoading, setSubmitLoading] = React.useState(false);

  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] =
    React.useState(false);

  const [classToken, setClassToken] = React.useState("");

  React.useEffect(() => {
    document.title = "Form Otp Generator";
  }, []);

  const handleAadharNumber = (e) => {
    setAadharNumber(e.target.value);
    if (e.target.value.length === 12) {
      setAadharNumberError(false);
      setAadharNumberHelperText("");
    } else if (e.target.value.length < 1) {
      setAadharNumberError(false);
    } else if (
      e.target.value.length > 0 &&
      e.target.value.length === 12 &&
      !isNaN(e.target.value)
    ) {
      setAadharNumberError(false);
      setAadharNumberHelperText("");
    } else {
      setAadharNumberError(true);
      setAadharNumberHelperText("Please enter a valid aadhar number");
    }
  };

  const handleClassCode = (e) => {
    setClassCode(e.target.value);
    if (e.target.value.length === 6) {
      setClassCodeError(false);
      setClassCodeHelperText("");
    }
    if (e.target.value.length < 1) {
      setClassCodeError(false);
    } else if (e.target.value.length > 6) {
      setClassCodeError(false);
      setClassCodeHelperText(
        "Please enter a valid class code. class code can't be more than 6 characters"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const response = await axios.post(
      "https://smart-india-hackathon-server.vercel.app/api/generateauthstudent"
    );
    setClassToken(response.data.data);
    setFormSubmittedSuccessfully(true);
    setSubmitLoading(false);
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
                Student Otp Code Request
              </Typography>
              <Typography
                className="text-center"
                variant="h5"
                sx={{ marginY: 5 }}
              >
                This is a form to request for token to fill the form
              </Typography>
            </CardContent>
            <Box sx={{ margin: "5%" }} component="form" onSubmit={handleSubmit}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="student-token-request-aadhar"
                  label="Aadhar Number"
                  variant="outlined"
                  required
                  aria-describedby="student-token-request-aadhar-helper"
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
                  helperText={aadharNumberError ? aadharNumberHelperText : ""}
                  onChange={handleAadharNumber}
                />
                <FormHelperText id="student-token-request-aadhar-helper">
                  We'll never share your Aadhar Details.
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl variant="outlined" fullWidth>
                <TextField
                  id="student-class-token-code"
                  label="Class Token Code"
                  variant="outlined"
                  required
                  aria-describedby="student-class-token-code-helper"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CodeIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter the class code"
                  error={classCodeError}
                  value={classCode}
                  helperText={classCodeError ? classCodeHelperText : ""}
                  onChange={handleClassCode}
                />
                <FormHelperText id="student-class-token-code-helper">
                  Please enter 6 digits class code sent by your teacher
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <Box textAlign="center">
                <LoadingButton
                  loading={submitLoading}
                  loadingPosition="end"
                  endIcon={<AppRegistrationIcon />}
                  variant="outlined"
                  type="submit"
                  disabled={aadharNumberError || error || classCodeError}
                >
                  Request Token
                </LoadingButton>
              </Box>
            </Box>
          </React.Fragment>
        </Card>
      </Box>
      {formSubmittedSuccessfully ? (
        <>
          <CopyBlock
            text={classToken}
            language={"javascript"}
            theme={dracula}
            wrapLines
          />
        </>
      ) : null}
    </div>
  );
}

export default FormOtp;
