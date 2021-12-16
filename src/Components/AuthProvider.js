import React, { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword
// } from "firebase/auth";
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = (props) => {
  const [user, setUser] = useState();
  const [accError, setAccError] = useState();
  const navigate = useNavigate();
  // const auth = getAuth();

  async function signup(email, password) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // setUser(user.user);
        // console.log(user);
        navigate("/");
      })
      .catch((error) => {
        setAccError(error.message);
      });
  }

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // console.log(user.user);
        // setUser(user.user);
        navigate("/");
      })
      .catch((error) => {
        // console.log(error.message);
        setAccError(error.message);
      });
  }

  async function logout() {
    await signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        setAccError(error.message);
      });
  }

  async function authstate(user) {}

  const value = {
    user,
    setUser,
    signup,
    login,
    logout,
    accError
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
