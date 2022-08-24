import React from "react";
import {
  Alert,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Box } from "@mui/system";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Navbar from "../../Components/Navbar";

function StudentTransfer() {
  const [universityList, setUniversityList] = React.useState([]);
  const [helperText, setHelperText] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  React.useEffect(() => {
    document.title = "Student Transfer";
    axios
      .get(
        "https://smart-india-hackathon-server.vercel.app/api/fetchalluniversity"
      )
      .then((res) => {
        setUniversityList(res.data.data);
      })
      .catch((err) => {
        setError(true);
        setHelperText(
          "We are facing some technical issues. Please try again later."
        );
      });
  }, []);

  const [aadharNumber, setAadharNumber] = React.useState(
    localStorage.getItem("aadharNumber")
  );
  const [aadharNumberError, setAadharNumberError] = React.useState(false);
  const [aadharNumberHelperText, setAadharNumberHelperText] =
    React.useState("");

  const [presentUniversity, setPresentUniversity] = React.useState("");
  const [presentUid, setPresentUid] = React.useState("");
  const [presentUniversityError, setPresentUniversityError] =
    React.useState(false);

  const [submitLoading, setSubmitLoading] = React.useState(false);

  const [error, setError] = React.useState(false);

  const [university, setUniversity] = React.useState("");

  const handlePresentUniversity = async (aadharNumber) => {
    console.log(aadharNumber);
    const studentEntry = await axios.post(
      "https://smart-india-hackathon-server.vercel.app/api/studentexists",
      {
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        aadharNumber: aadharNumber,
      }
    );
    if (studentEntry.data.code === "success") {
      setError(true);
      setPresentUniversityError(true);
      setHelperText(
        "No record exist with this aadhar. Please enter a valid aadhar"
      );
    } else {
      setPresentUniversity(studentEntry.data.data.universityName);
      setPresentUid(studentEntry.data.data.uid);
    }
  };

  const handleAadharNumber = (e) => {
    setAadharNumber(e.target.value);
    if (e.target.value.length === 12) {
      return handlePresentUniversity(e.target.value);
    }
    if (e.target.value.length < 1) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    if (presentUid === university) {
      setWarning(true);
      setHelperText("Seems you are already student in same institution");
      return;
    }
    const studentTransfer = await axios.post(
      "https://smart-india-hackathon-server.vercel.app/api/transferstudent",
      {
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        aadharNumber: aadharNumber,
        uid: university,
      }
    );
    if (studentTransfer.data.code === "success") {
      setSuccess(true);
      setHelperText("Student transferred successfully");
    }
    setSubmitLoading(false);
  };

  return (
    <>
      <Navbar />
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
                {success ? (
                  <Alert severity="success">{helperText}</Alert>
                ) : null}
                {warning ? (
                  <Alert severity="warning">{helperText}</Alert>
                ) : null}
                <br />
                <br />
                <Typography className="text-center" variant="h4">
                  Student Transfer
                </Typography>
                <Typography
                  className="text-center"
                  variant="h5"
                  sx={{ marginY: 5 }}
                >
                  This is a form to apply for transfer into the institution
                </Typography>
              </CardContent>
              <Box
                sx={{ margin: "5%" }}
                component="form"
                onSubmit={handleSubmit}
              >
                <FormControl fullWidth variant="outlined">
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
                    helperText={aadharNumberError ? aadharNumberHelperText : ""}
                    onChange={handleAadharNumber}
                    disabled={true}
                  />
                  <FormHelperText id="student-register-aadhar-helper">
                    We'll never share your Aadhar Details.
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="student-register-present-univeristy"
                    label="Present Institution"
                    variant="outlined"
                    aria-describedby="student-register-present-univeristy-helper"
                    disabled
                    placeholder="Enter your present institution name"
                    error={presentUniversityError}
                    value={presentUniversity}
                    onChange={handleAadharNumber}
                  />
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="student-register-university-label">
                    University
                  </InputLabel>
                  <Select
                    labelId="student-register-university-label"
                    id="student-register-university"
                    label="Age"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    required
                  >
                    {universityList.map((university, index) => {
                      return (
                        <MenuItem key={index} value={university.uid}>
                          {university.uid} - {university.universityName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText id="student-register-phone-helper">
                    Please select a university
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
                    disabled={aadharNumberError || error}
                  >
                    Request Transfer
                  </LoadingButton>
                </Box>
              </Box>
            </React.Fragment>
          </Card>
        </Box>
      </div>
    </>
  );
}

export default StudentTransfer;
