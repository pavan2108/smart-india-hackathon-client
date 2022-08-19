import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuth } from "./Contexts/AuthContext";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import StudentDashboard from "./Pages/Student/StudentDashboard";
import FormOtp from "./Pages/Student/FormOtp";
import StudentLogin from "./Pages/Student/StudentLogin";

import StudentRegistration from "./Pages/Student/StudentRegistration";
import StudentTransfer from "./Pages/Student/StudentTransfer";
import CreateFormScript from "./Pages/Teacher/CreateFormScript";
import CreateMeeting from "./Pages/Teacher/CreateMeeting";
import TeacherLogin from "./Pages/Teacher/TeacherLogin";
import StudentPrivateRoute from "./Routes/StudentPrivateRoute";
import TeacherPrivateRoute from "./Routes/TeacherPrivateRoute";
import TeacherDashboard from "./Pages/Teacher/TeacherDashboard";
import Logout from "./Components/Logout";

const App = () => {
  const { currentUser } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* Student Routes --------------------------------*/}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route element={<StudentPrivateRoute currentUser={currentUser} />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/registerationform" element={<StudentRegistration />} />
          <Route path="/transfercertificate" element={<StudentTransfer />} />
          <Route path="/student/requestotp" element={<FormOtp />} />
        </Route>
        {/* Teacher Routes --------------------------------*/}
        <Route path="/teacher/login" element={<TeacherLogin />} />

        <Route element={<TeacherPrivateRoute currentUser={currentUser} />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/createform" element={<CreateFormScript />} />
          <Route path="/teacher/createmeeting" element={<CreateMeeting />} />
        </Route>

        {/* Admin Routes --------------------------------*/}
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
