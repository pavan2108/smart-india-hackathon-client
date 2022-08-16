import { Navigate, Outlet } from "react-router-dom";

function StudentPrivateRoute({ isLogged }) {
  return isLogged ? <Outlet /> : <Navigate to="/student/login" />;
}

export default StudentPrivateRoute;
