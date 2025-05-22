import React, { createContext, useState,useEffect } from "react";

const initialUser = {
  prenom: "",
  email: "",
  isAdmin: false
}
const AuthContext = createContext({users: initialUser, setUsers: () => {}, logout: () => {}});

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : initialUser;
  });


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

  useEffect(() => {
  const savedUser = localStorage.getItem("userInfo");
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    setUsers(parsedUser);
  } else {
    fetchProfil(); // si rien dans le localStorage, va chercher depuis l’API
  }
}, []);

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
