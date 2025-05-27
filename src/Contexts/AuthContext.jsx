import React, { createContext, useState } from "react";

const initialUser = {
  prenom: "",
  email: "",
  isAdmin: false,
  photo: "https://res.cloudinary.com/dddxx1rtc/image/upload/v1747827864/3cae079ca0b9e55ec6bfc1b358c9b1e2_l1xuma.jpg",
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
  //     const response = await fetch(${url}/api/users/profile, {
  //       headers: {
  //         Authorization: Bearer ${token},
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

export default AuthContext;
