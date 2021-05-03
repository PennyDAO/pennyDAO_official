import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase.js";

const AuthContext = React.createContext();
const localStorage = require("local-storage");

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [role, rolesetter] = useState(localStorage.get('role'));
  const [data, datasetter] = useState(localStorage.get('data'));

  const setRole = (newRole) => {
    rolesetter(newRole);
    localStorage.set('role', newRole)
  }

  const setData = (newData) => {
    datasetter(newData);
    localStorage.set('data', newData);
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    setRole('');
    setData('');
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    role,
    data,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    setRole,
    setData
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}