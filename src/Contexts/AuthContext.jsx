import React, { createContext, useState } from "react";

const initialUser = {
  prenom: "",
  email: "",
  photo: "",
  isAdmin: false,
  nouveauMotDePasse: "",
  confirmationMotDePasse: "",
};
const AuthContext = createContext({
  users: null,
  setUsers: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const userInfo = localStorage.getItem("userInfo");
    // console.log("Initial user info from localStorage:", userInfo);

    return userInfo ? JSON.parse(userInfo) : initialUser;
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUsers(null);
  };

  const values = {
    users,
    setUsers,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
