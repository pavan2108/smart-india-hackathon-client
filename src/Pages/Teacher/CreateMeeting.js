import {
  Alert,
  Box,
  Card,
  CardContent,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LoadingButton } from "@mui/lab";
import Multiselect from "multiselect-react-dropdown";
import TeacherNavbar from "../../Components/TeacherNavbar";

function CreateMeeting() {
  const [classes, setClasses] = React.useState([]);
  const [helperText, setHelperText] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [summary, setSummary] = React.useState("");

  const [description, setDescription] = React.useState("");

  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());

  const [location, setLocation] = React.useState("");
  const [selectedValues, setSelectedValues] = React.useState([]);
  const getClassData = async () => {
    const response = await axios.get(
      "https://smart-india-hackathon-server.vercel.app/api/classdata"
    );
    setClasses(response.data);
  };

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    document.title = "Meeting Creater";
    getClassData();
  }, []);

  const handleSelect = (selectedList, selectedItem) => {
    setSelectedValues(selectedList);
  };

  const handleRemove = (selectedList, removedItem) => {
    setSelectedValues(selectedList);
  };

  const resetForm = () => {
    setSummary("");
    setDescription("");
    setStartTime(new Date());
    setEndTime(new Date());
    setLocation("");
    setSelectedValues([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const classNumbers = selectedValues.map((item) => item.id);
    const response = await axios.post(
      "https://smart-india-hackathon-server.vercel.app/api/createmeeting",
      {
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        summary,
        description,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        location,
        classNumbers,
        teacherEmail: localStorage.getItem("email"),
      }
    );
    setHelperText(response.data.message);
    setSuccess(true);
    resetForm();
    setLoading(false);
  };

  return (
    <>
      <TeacherNavbar />
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
                  Teacher Create Meeting
                </Typography>
                <Typography
                  className="text-center"
                  variant="h5"
                  sx={{ marginY: 5 }}
                >
                  This is a form to create google meet
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
                    label="Meeting Name"
                    variant="outlined"
                    required
                    aria-describedby="student-register-email-helper"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                    placeholder="Enter your Meeting Name"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="student-register-aadhar"
                    label="Meeting Description"
                    variant="outlined"
                    required
                    aria-describedby="student-register-email-helper"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                    placeholder="Enter your Meeting Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
                <br />
                <br />
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Start Time"
                      value={startTime}
                      onChange={(Time) => {
                        setStartTime(Time);
                      }}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="End Time"
                      value={endTime}
                      onChange={(Value) => {
                        setEndTime(Value);
                      }}
                    />
                  </LocalizationProvider>
                </Box>
                <br />

                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="student-register-aadhar"
                    label="Meeting Location"
                    variant="outlined"
                    required
                    aria-describedby="student-register-email-helper"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                    placeholder="Enter your Meeting Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </FormControl>
                <br />
                <br />
                <Multiselect
                  options={classes}
                  selectedValues={selectedValues}
                  onSelect={handleSelect}
                  onRemove={handleRemove}
                  displayValue="name"
                />
                <br />
                <Box textAlign="center">
                  <LoadingButton
                    variant="outlined"
                    type="submit"
                    disabled={error || loading}
                  >
                    Create Google Meet
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

export default CreateMeeting;
