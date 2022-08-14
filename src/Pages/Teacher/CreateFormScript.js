import * as React from "react";
import Multiselect from "multiselect-react-dropdown";
import { Box } from "@mui/system";
import {
  Alert,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import AbcIcon from "@mui/icons-material/Abc";
import { LoadingButton } from "@mui/lab";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import axios from "axios";
import FormScript from "../../Components/FormScript";

export default function CreateFormScript() {
  const [classes, setClasses] = React.useState([]);
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [warning, setWarning] = React.useState(false);

  const [studentTokens, setStudentTokens] = React.useState("");

  const [formCode, setFormCode] = React.useState("");
  const [formCodeError, setFormCodeError] = React.useState(false);
  const [formCodeHelperText, setFormCodeHelperText] = React.useState("");

  const [submitLoading, setSubmitLoading] = React.useState(false);

  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] =
    React.useState(false);

  const getClassData = async () => {
    const response = await axios.get(
      "https://smart-india-hackathon-server.vercel.app/api/classdata"
    );
    setClasses(response.data);
  };

  React.useEffect(() => {
    document.title = "Script Creater";
    getClassData();
  }, []);

  const handleSelect = (selectedList, selectedItem) => {
    setSelectedValues(selectedList);
  };

  const handleRemove = (selectedList, removedItem) => {
    setSelectedValues(selectedList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    if (selectedValues.length === 0) {
      setError(true);
      setHelperText("Please select atleast one class");
      setSubmitLoading(false);
      return;
    }
    if (formCode.length !== 0) {
      const regex = "^[A-Za-z0-9_-]*$";
      if (!formCode.match(regex)) {
        setFormCodeError(true);
        setFormCodeHelperText("Invalid form code should be alphanumeric");
        setSubmitLoading(false);
        return;
      }
    }
    if (formCode.length > 6) {
      setFormCodeError(true);
      setFormCodeHelperText("Form code should be less than 6 characters");
      setSubmitLoading(false);
      return;
    }
    const request = await axios.post(
      "https://smart-india-hackathon-server.vercel.app/api/classotpgeneration",
      {
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        classCode: formCode,
        classNumbers: selectedValues.map((item) => item.id),
      }
    );
    setStudentTokens(request.data.data);
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
        <Card variant="outlined" sx={{ minHeight: "60vh", flexGrow: 1 }}>
          <React.Fragment>
            <CardContent>
              {error ? <Alert severity="error">{helperText}</Alert> : null}
              {success ? <Alert severity="success">{helperText}</Alert> : null}
              {warning ? <Alert severity="warning">{helperText}</Alert> : null}
              <br />
              <br />
              <Typography className="text-center" variant="h4">
                Form Script Creation
              </Typography>
              <Typography
                className="text-center"
                variant="h5"
                sx={{ marginY: 5 }}
              >
                This is a form to create form script
              </Typography>
            </CardContent>
            <Box sx={{ margin: "6%" }} component="form" onSubmit={handleSubmit}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="teacher-create-form-script-code"
                  label="Form Code"
                  variant="outlined"
                  aria-describedby="teacher-create-form-script-code-helper"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AbcIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Create a Form Code"
                  error={formCodeError}
                  value={formCode}
                  helperText={formCodeError ? formCodeHelperText : ""}
                  onChange={(e) => setFormCode(e.target.value)}
                />
                <FormHelperText id="teacher-create-form-script-code-helper">
                  Create a Form Code and share with students if nothing entered
                  it's value will be zero
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormLabel component="legend">Select Classes : </FormLabel>
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
                  loading={submitLoading}
                  loadingPosition="end"
                  endIcon={<AppRegistrationIcon />}
                  variant="outlined"
                  type="submit"
                >
                  Request Script
                </LoadingButton>
              </Box>
            </Box>
          </React.Fragment>
        </Card>
      </Box>
      <br />
      <br />
      {formSubmittedSuccessfully ? (
        <Card sx={{ minHeight: "30vh", flexGrow: 1 }}>
          <React.Fragment>
            <Box
              sx={{ flexGrow: 1, marginX: "5%", maxWidth: "80%" }}
              display="flex"
              flex-direction="column"
              justifyContent="center"
              minHeight="100%"
            >
              <FormScript text={studentTokens} />
            </Box>
          </React.Fragment>
        </Card>
      ) : null}
    </div>
  );
}
