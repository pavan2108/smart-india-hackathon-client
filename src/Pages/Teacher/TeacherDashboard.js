import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import TeacherNavbar from "../../Components/TeacherNavbar";
import ViewMeetingData from "../../Components/ViewMeetingData";

function TeacherDashboard() {
  const teacherEmail = localStorage.getItem("email");
  const [data, setData] = React.useState([]);
  const getMeetingData = async () => {
    const data = await axios.get(
      `http://localhost:3500/api/meetingdata/${teacherEmail}`
    );
    setData(data.data.meetings);
  };

  React.useEffect(() => {
    window.title = "Teacher Dashboard";
    getMeetingData();
  }, []);

  return (
    <>
      <TeacherNavbar />
      <Box sx={{ margin: "5%" }}>
        <Typography variant="h3" className="text-center">
          Teacher Dashboard
        </Typography>
        <Typography variant="h4">Teacher Email : {teacherEmail}</Typography>
        {data.map((data) => (
          <ViewMeetingData
            googleMeetId={data.googleMeetId}
            data={data.ConfigFile}
            key={data._id}
            EventId={data.EventId}
          />
        ))}
      </Box>
    </>
  );
}

export default TeacherDashboard;
