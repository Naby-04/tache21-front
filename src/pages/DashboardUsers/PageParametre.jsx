import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const PageParametresCompte = () => {
  const navigate = useNavigate();
  // const { setUsers } = useContext(AuthContext);
  const { users, setUsers } = useContext(AuthContext);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { url } = usePublication();

  // Lecture initiale depuis le localStorage
  const getInitialUser = () => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return {
      prenom: "Utilisateur prenom",
      email: "john@example.com",
      photo:
        "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg", // image par défaut
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
        photoFile: file,
      };

      setUserInfo(updatedUser);

      // ❌ Ne pas mettre à jour le localStorage ici
      // const userInfoToStore = { ...updatedUser };
      // delete userInfoToStore.photoFile;
      // localStorage.setItem("userInfo", JSON.stringify(userInfoToStore));
    };

    reader.readAsDataURL(file);
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "userProfiles");
    // Ne mets pas cloud_name ici dans le formData, c'est dans l'URL seulement

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dddxx1rtc/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

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

      // Vérifie si un fichier image a été sélectionné (donc image modifiée)
      if (userInfo.photoFile) {
        console.log("Upload en cours vers Cloudinary...");
        photoUrl = await uploadImageToCloudinary(userInfo.photoFile);
        console.log("Nouvelle URL de la photo :", photoUrl);
      }

      // 🔍 Vérification des changements
      const currentData = {
        prenom: users.prenom || "",
        photo: users.photo || "",
        password: "", // mot de passe actuel, pas nécessaire pour l'update
        confirmationMotDePasse: "", // pas nécessaire pour l'update
      };

      const newData = {
        prenom: userInfo.prenom,
        photo: photoUrl,
        password: userInfo.nouveauMotDePasse || "",
        confirmationMotDePasse: userInfo.confirmationMotDePasse || "",
      };

      if (userInfo.nouveauMotDePasse || userInfo.confirmationMotDePasse) {
        if (userInfo.nouveauMotDePasse.length < 6) {
          toast.error("Le mot de passe doit contenir au moins 6 caractères.");
          return;
        }

        if (userInfo.nouveauMotDePasse !== userInfo.confirmationMotDePasse) {
          toast.error("Les mots de passe ne correspondent pas.");
          return;
        }
      }

      const hasChanged =
        currentData.prenom !== newData.prenom ||
        currentData.photo !== newData.photo ||
        currentData.password !== newData.password ||
        currentData.confirmationMotDePasse !== newData.confirmationMotDePasse;

      if (!hasChanged) {
        toast.info("Aucune modification à enregistrer");
        return;
      }

      // 📨 Préparer les données à envoyer
      const dataToSend = {
        ...userInfo,
        photo: photoUrl,
        biographie: userInfo.biographie,
      };
      if (userInfo.nouveauMotDePasse) {
        dataToSend.password = userInfo.nouveauMotDePasse;
      }
      delete dataToSend.photoFile;

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

      setUsers(result.user);
      localStorage.setItem("userInfo", JSON.stringify(result.user));

      toast.success("Modifications enregistrées avec succès !");
      navigate("/users");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error(
        error.message ||
          "Une erreur est survenue lors de la mise à jour du profil."
      );
    }
  };

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancelChanges = () => {
    const currentData = {
      prenom: users.prenom || "Utilisateur prenom",
      email: users.email || "john@example.com",
      photo:
        users.photo ||
        "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg",
    };

    // Vérification s'il y a eu des modifications
    const hasChanged =
      userInfo.prenom !== currentData.prenom ||
      userInfo.photo !== currentData.photo;

    if (!hasChanged) {
      toast.info("Vous n'avez fait aucune modification");
      return;
    }

    // Réinitialisation des infos
    setUserInfo(currentData);
    toast.info("Modifications annulées");
  };

  return (
    <div className="mt-9 md:mt-0 max-w-3xl mx-auto">
      <p className="text-2xl font-bold text-gray-800 mb-3">
        Modifier le profil
      </p>
      <div className="mb-2 flex justify-between items-center gap-4 bg-gray-800 px-4 py-2 rounded-lg">
        <img
          src={userInfo.photo || users.photo}
          alt="profil"
          onClick={handleImageClick}
          className="w-20 h-20 rounded-full object-cover cursor-pointer border-2 border-white"
        />
        <div>
          <label
            htmlFor="photo"
            className="text-sm cursor-pointer bg-white hover:bg-amber-500 hover:text-white text-gray-800 font-bold py-2 px-4 rounded"
          >
            Modifier la photo
          </label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 text-sm text-gray-600 hidden"
            id="photo"
            name="photo"
            ref={fileInputRef}
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-lg">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-800">
              Nom complet
            </label>
            <input
              type="text"
              name="prenom"
              value={userInfo.prenom}
              onChange={handleInputChange}
              maxLength={50}
              className="w-full mt-1 p-2 border border-gray-700 rounded-md focus:outline-none focus:ring"
            />
          </div>
        </div>

        <div className="mt-3 relative">
          <label className="text-sm font-medium text-gray-800">
            Changer le mot de passe
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            name="nouveauMotDePasse"
            placeholder="Nouveau mot de passe"
            value={userInfo.nouveauMotDePasse || ""}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border border-gray-700 rounded-md focus:outline-none focus:ring pr-10"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-2 top-9 text-sm text-gray-600"
          >
            {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        <div className="mt-3 relative">
          <label className="text-sm font-medium text-gray-800">
            Confirmer le nouveau mot de passe
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmationMotDePasse"
            placeholder="Confirmer le nouveau mot de passe"
            value={userInfo.confirmationMotDePasse || ""}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border border-gray-700 rounded-md focus:outline-none focus:ring pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-9 text-sm text-gray-600"
          >
            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-2 items-start md:justify-between md:items-center">
          <button
            onClick={handleSave}
            className="px-4 py-2 font-bold bg-gray-800 text-white rounded hover:bg-gray-700 transition cursor-pointer"
          >
            Enregistrer les modifications
          </button>
          <button
            className="bg-red-500 font-bold text-white p-2 rounded-sm hover:bg-red-700 cursor-pointer text-sm"
            onClick={handleCancelChanges}
          >
            Annuler les modifications
          </button>
        </div>
      </div>
    </div>
  );
};
