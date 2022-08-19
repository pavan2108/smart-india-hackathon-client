import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";

import React from "react";
import { Link } from "react-router-dom";

function Home() {
  React.useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <>
      <Box
        sx={{
          margin: "1%",
          border: "1px solid black",
          padding: "1%",
          borderRadius: "5px",
          height: "auto",
          backgroundColor: "#673ab7",
        }}
      >
        <Typography variant="h2" component="h2" className="text-center">
          Stay On Alert
        </Typography>
      </Box>
      <Box
        sx={{
          margin: "1%",
          border: "1px solid black",
          padding: "1%",
          borderRadius: "5px",
          height: "auto",
          backgroundColor: "#673ab7",
        }}
      >
        <Typography variant="p" component="p" className="text-center">
          Every year huge number of students take admissions into college. With
          the current covid crisis ongoing, almost all the process have become
          online. Even classes have become online. It was observed that there
          were students who did fake enrollments while filling forms of a
          college for exams, online classes or similar purposes. Also online
          mischief was done by many students thus disturbing the whole class.
          Same happens with online exams happening with google forms. Since
          making fake Gmail id is not a big deal for kids of today’s generation
          hence often fake entries were found which caused lots of issues to
          teachers evaluating the answers. Hence we need to keep a Aadhar based
          authentication for students for filling up forms, giving examination
          or attending online classes. Addressing this problem will ensure only
          students authenticated with their Aadhar are only permitted to fill
          forms, attend online classes and give exams thus ensuring the tracking
          of students. Due to this only genuine entries will be there and any
          mischief done will be caught easily
        </Typography>
      </Box>
      <Box
        sx={{
          margin: "1%",
          border: "1px solid black",
          padding: "1%",
          borderRadius: "5px",
          height: "auto",
          backgroundColor: "#673ab7",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link to="/student/login">
            <Button variant="contained" color="primary">
              Student Login
            </Button>
          </Link>
          <br />
          <Link to="/teacher/login">
            <Button variant="contained" color="primary">
              Teacher Login
            </Button>
          </Link>
          <br />
          <Link to="/admin/login">
            <Button variant="contained" color="primary">
              Admin Login
            </Button>
          </Link>
          <br />
        </Stack>
      </Box>
    </>
  );
}

export default Home;
