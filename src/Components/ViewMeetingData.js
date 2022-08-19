import { Box, Card, Typography } from "@mui/material";
import React from "react";
import ReactJson from "react-json-view";

function viewMeetingData({ data, googleMeetId, EventId }) {
  return (
    <>
      <Box sx={{ margin: "5%" }}>
        <Typography variant="h4">Meeting Id: {googleMeetId}</Typography>
        <br />
        <Card>
          <ReactJson src={data} collapsed={true} key={EventId} />
        </Card>
      </Box>
    </>
  );
}

export default viewMeetingData;
