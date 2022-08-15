import { Alert, Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

function CreateMeeting() {
  const [helperText, setHelperText] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  const [error, setError] = React.useState(false);
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
              {warning ? <Alert severity="warning">{helperText}</Alert> : null}
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
          </React.Fragment>
        </Card>
      </Box>
    </div>
  );
}

export default CreateMeeting;
