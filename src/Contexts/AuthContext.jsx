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
      setUsers(data);
    } catch (error) {
      console.error("Erreur récupération profil :", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsers(null);
  };

  useEffect(() => {
    fetchProfil();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ users, setUsers, fetchProfil, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;