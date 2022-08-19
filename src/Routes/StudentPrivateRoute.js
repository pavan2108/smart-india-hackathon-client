import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function StudentPrivateRoute({ currentUser }) {
  const role = localStorage.getItem("role");
  const { contextLoading } = useAuth();
  return role === "student" && !contextLoading ? (
    <Outlet />
  ) : (
    <Navigate to="/student/login" />
  );
}

export default StudentPrivateRoute;
