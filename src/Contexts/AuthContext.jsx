import React, { createContext, useState, useEffect } from "react";
import { usePublication } from "./DashboardUser/UseContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const { url } = usePublication();

  const fetchProfil = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await fetch(`${url}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Échec récupération profil");

    const data = await response.json();

    // 🔥 On récupère la photo depuis le localStorage si elle existe
    const localUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (localUserInfo?.photo) {
      data.photo = localUserInfo.photo;
    }

    setUsers(data);
    localStorage.setItem("userInfo", JSON.stringify(data)); // 👈 AJOUT OBLIGATOIRE

  } catch (error) {
    console.error("Erreur récupération profil :", error);
  }
};



  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUsers(null);
  };

  useEffect(() => {
  const savedUser = localStorage.getItem("userInfo");
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    setUsers(parsedUser);
  } else {
    fetchProfil(); // si rien dans le localStorage, va chercher depuis l’API
  }
}, []);


  return (
    <AuthContext.Provider value={{ users, setUsers, fetchProfil, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
