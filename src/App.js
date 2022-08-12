import { BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar";

import StudentRegistration from "./Pages/StudentRegistration";
const App = () => {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<StudentRegistration />} />
        </Routes>
    </Router>
  );
}

export default App;
