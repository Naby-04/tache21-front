import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { toast } from "react-toastify";



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
      photo: reader.result,      // pour affichage immédiat
      photoFile: file,           // pour l'upload (NE PAS STOCKER dans localStorage)
    };

    setUserInfo(updatedUser);
    setUsers(updatedUser); // synchro avec le contexte

    // ❌ on enlève photoFile ici pour le localStorage
    const userInfoToStore = { ...updatedUser };
    delete userInfoToStore.photoFile;
    localStorage.setItem("userInfo", JSON.stringify(userInfoToStore));
  };

  reader.readAsDataURL(file);
};


const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "userProfiles"); 
  // Ne mets pas cloud_name ici dans le formData, c'est dans l'URL seulement

  const response = await fetch("https://api.cloudinary.com/v1_1/dddxx1rtc/image/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Échec de l'upload sur Cloudinary");
  }

  const data = await response.json();
  return data.secure_url;
};

const handleSave = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Aucun token trouvé. Veuillez vous reconnecter.");
    return;
  }

  try {
    let photoUrl = userInfo.photo;

    // ⏬ Vérifie si un fichier image a été sélectionné
    if (userInfo.photoFile) {
      console.log("Upload en cours vers Cloudinary...");
      photoUrl = await uploadImageToCloudinary(userInfo.photoFile);
      console.log("Nouvelle URL de la photo :", photoUrl);
    } else {
      console.log("Aucune nouvelle image sélectionnée");
    }

    // 📨 Préparer les données à envoyer
    const dataToSend = {
      ...userInfo,
      photo: photoUrl,
    };
    delete dataToSend.photoFile; // ne jamais envoyer l'objet fichier brut

    console.log("Données envoyées au backend :", dataToSend);

    const response = await fetch(`${url}/api/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      toast.error("Échec de la mise à jour");
      return;
    }

    const result = await response.json();
    console.log("Réponse du serveur :", result);
    console.log("Réponse du serveur de l'utilisateur :", result.user);

    // 🧠 Mise à jour du contexte utilisateur
    setUsers(result.user);

    // 💾 Mise à jour du localStorage sans photoFile
    localStorage.setItem("userInfo", JSON.stringify(result.user));

    toast.success("Modifications enregistrées avec succès !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    toast.error(error.message || "Une erreur est survenue lors de la mise à jour du profil.");
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
            value={users.prenom}
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
            value={users.email}
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
