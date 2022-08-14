import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import FormOtp from "./Pages/Student/FormOtp";

import StudentRegistration from "./Pages/Student/StudentRegistration";
import StudentTransfer from "./Pages/Student/StudentTransfer";
import CreateFormScript from "./Pages/Teacher/CreateFormScript";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registerationform" element={<StudentRegistration />} />
        <Route path="/transfercertificate" element={<StudentTransfer />} />
        <Route path="/teacher/createform" element={<CreateFormScript />} />
        <Route path="/student/requestotp" element={<FormOtp />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
