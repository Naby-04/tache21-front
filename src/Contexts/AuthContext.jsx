import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);


  // const fetchProfil = async (e) => {
  //   e.preventDefault()
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   try {
  //     const response = await fetch(`${url}/api/users/profile`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) throw new Error("Échec récupération profil");

  //     const data = await response.json();
  //     setUsers(data);
  //   } catch (error) {
  //     console.error("Erreur récupération profil :", error);
  //   }
  // };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUsers(null);
  };

  const values={
    users,
    setUsers,
    logout
  }
 

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
