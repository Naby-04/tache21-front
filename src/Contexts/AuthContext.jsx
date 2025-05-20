import React, { createContext, useState, useEffect } from "react";
import { usePublication } from "./DashboardUser/UseContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { url } = usePublication(); // <-- Place ici !
  const [users, setUsers] = useState(null);

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

      // Vérifie s’il y a une image personnalisée dans le localStorage
      const localUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (localUserInfo?.photo) {
        data.photo = localUserInfo.photo;
      }

      setUsers(data);
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
      fetchProfil(); // si rien dans le localStorage, récupère depuis l’API
    }
  }, []);

  return (
    <AuthContext.Provider value={{ users, setUsers, fetchProfil, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;