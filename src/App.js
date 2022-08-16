import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import FormOtp from "./Pages/Student/FormOtp";

import StudentRegistration from "./Pages/Student/StudentRegistration";
import StudentTransfer from "./Pages/Student/StudentTransfer";
import CreateFormScript from "./Pages/Teacher/CreateFormScript";
import CreateMeeting from "./Pages/Teacher/CreateMeeting";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* Student Routes --------------------------------*/}
        <Route path="/registerationform" element={<StudentRegistration />} />
        <Route path="/transfercertificate" element={<StudentTransfer />} />
        <Route path="/student/requestotp" element={<FormOtp />} />

        {/* Teacher Routes --------------------------------*/}
        <Route path="/teacher/createform" element={<CreateFormScript />} />
        <Route path="/teacher/createmeeting" element={<CreateMeeting />} />

        {/* Admin Routes --------------------------------*/}

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
