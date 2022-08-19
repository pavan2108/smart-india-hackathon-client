import React, { useContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import auth from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [contextLoading, setContextLoading] = useState(false);

  const signUp = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    localStorage.removeItem("aadharNumber");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    auth.signOut();
  };

  const value = {
    currentUser,
    contextLoading,
    signUp,
    logout,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setContextLoading(true);
      setCurrentUser(user);
      setContextLoading(false);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
