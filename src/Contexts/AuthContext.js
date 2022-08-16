import React, { useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import auth from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [role, setRole] = useState();
  const [email, setEmail] = useState();
  const [aadharNumber, setAadharNumber] = useState();
  const [contextLoading, setContextLoading] = useState(false);

  const setRoleToAuth = (role) => {
    setRole(role);
  };

  const setEmailToAuth = (email) => {
    setEmail(email);
  };

  const setAadharNumberToAuth = (aadharNumber) => {
    setAadharNumber(aadharNumber);
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setRoleToAuth(null);
    setEmailToAuth(null);
    setAadharNumberToAuth(null);
    auth.signOut();
  };

  const value = {
    currentUser,
    role,
    email,
    aadharNumber,
    contextLoading,
    setRoleToAuth,
    signUp,
    setEmailToAuth,
    setAadharNumberToAuth,
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
