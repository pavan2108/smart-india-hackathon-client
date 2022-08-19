import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function TeacherPrivateRoute({ currentUser }) {
  const role = localStorage.getItem("role");
  const { contextLoading } = useAuth();
  return !contextLoading && role === "teacher" ? (
    <Outlet />
  ) : (
    <Navigate to="/teacher/login" />
  );
}

export default TeacherPrivateRoute;
