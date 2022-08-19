import React from "react";
import { useAuth } from "../Contexts/AuthContext";

function Logout() {
  const { logout } = useAuth();
  React.useEffect(() => {
    logout();
    window.location.href = "/";
  }, []);
  return <div>Logout</div>;
}

export default Logout;
