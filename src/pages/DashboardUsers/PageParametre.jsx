import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../Contexts/AuthContext";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";

export const PageParametresCompte = () => {
  const navigate = useNavigate();
  const { setUsers } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");
  const {url} = usePublication()


  // Lecture initiale depuis le localStorage
  const getInitialUser = () => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return {
      prenom: "Utilisateur prenom",
      email: "john@example.com",
      photo: "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg", // image par défaut
    };
  };

  const [userInfo, setUserInfo] = useState(getInitialUser);

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // const handlePhotoChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const updatedUser = {
  //       ...userInfo,
  //       photo: reader.result,
  //     };
  //     setUserInfo(updatedUser);
  //     localStorage.setItem("userInfo", JSON.stringify(updatedUser));
  //     setUsers(updatedUser); // synchro avec le contexte global
  //   };
  //   reader.readAsDataURL(file);
  // };

const handlePhotoChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "userProfiles"); // ton preset côté Cloudinary
    formData.append("folder", "userProfiles"); // facultatif mais propre

    const cloudinaryRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dddxx1rtc/image/upload",
      formData
    );

    const secureUrl = cloudinaryRes.data.secure_url;

    const updatedUser = {
      ...userInfo,
      photo: secureUrl,
    };
    setUserInfo(updatedUser);
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    setUsers(updatedUser);
  } catch (error) {
    console.error("Erreur lors de l'upload sur Cloudinary :", error);
    alert("Échec du téléversement de l'image.");
  }
};

 const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    // Prépare les données à envoyer (userInfo + nouveau mot de passe si présent)
    const dataToSend = {
      ...userInfo,
      ...(newPassword && { newPassword }),
    };

    const response = await fetch(`${url}/api/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.message || "Erreur de mise à jour");

    // Si un nouveau token est retourné, on le met à jour dans localStorage
    if (result.token) {
      localStorage.setItem("token", result.token);
    }

    // Met à jour les infos utilisateur (dans result.user) dans localStorage et contexte
    if (result.user) {
      console.log("Utilisateur mis à jour :", result.user);
      
      localStorage.setItem("userInfo", JSON.stringify(result.user));
      setUsers(result.user);
    } else {
      // Sinon on met à jour avec ce qu'on a (pour être sûr)
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUsers(userInfo);
      console.log("Pas de mise à jour utilisateur dans la réponse");
      
    }

    alert("Modifications enregistrées !");
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    alert("Erreur lors de la mise à jour du profil.");
  }
};




  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <button
        className="px-2 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg cursor-pointer mb-6"
        onClick={() => navigate("/users")}
      >
        Retour au dashboard
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Paramètres du compte
      </h1>

      <div className="mb-6 flex justify-between items-center gap-4">
        <img
          src={userInfo.photo}
          alt="profil"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <label
            htmlFor="photo"
            className="text-sm cursor-pointer bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Modifier votre profil
          </label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 text-sm text-gray-600 hidden"
            id="photo"
            name="photo"
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Nom complet
          </label>
          <input
            type="text"
            name="prenom"
            value={userInfo.prenom}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Adresse email
          </label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium text-gray-700">
          Changer le mot de passe
        </label>
        <input
          type="password"
          name="newPassword"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
        />
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Enregistrer les modifications
        </button>
        <button className="text-red-500 hover:underline text-sm">
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
};
