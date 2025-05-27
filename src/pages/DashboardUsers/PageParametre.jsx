import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";


export const PageParametresCompte = () => {
  const navigate = useNavigate();
  // const { setUsers } = useContext(AuthContext);
  const { users, setUsers } = useContext(AuthContext);

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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const updatedUser = {
        ...userInfo,
        photo: reader.result,
      };
      setUserInfo(updatedUser);
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setUsers(updatedUser); // synchro avec le contexte global
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Aucun token trouvé. Veuillez vous reconnecter.");
    return;
  }

  try {
    const response = await fetch(`${url}/api/users/update`, {
      method: "PUT", // ou POST selon ton backend
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error("Échec de la mise à jour du profil");
    }

    const updatedUser = await response.json();

    // Mise à jour du contexte et du localStorage
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    setUsers(updatedUser);
    alert("Modifications enregistrées avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    alert("Une erreur est survenue pendant l'enregistrement.");
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
          src={users.photo}
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
