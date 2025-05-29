import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReinitialiserMdp = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://tache21-back.onrender.com/api/users/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Mot de passe réinitialisé avec succès");
        navigate("/connexion"); // redirige vers la page de connexion
      } else {
        toast.error(data.message || "Erreur lors de la réinitialisation");
      }
    } catch (error) {
      toast.error("Erreur serveur ou réseau");
      console.error(error);
    }
    setLoading(false);
  };
  return (
    <div
      style={{
        backgroundImage: `url("https://mironcoder-hotash.netlify.app/images/pattern.webp")`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        mixBlendMode: "lighten",
      }}
      className="flex items-center justify-center h-screen bg-gray-100"
    >
      <div className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-sm">
        <div className="text-center text-xl font-bold mb-6">
          Réinitialiser le mot de passe
        </div>

        <div className="mb-2 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Mot de passe
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Votre mot de passe"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-2 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm-password"
          >
            Confirmer le mot de passe
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm-password"
            type="password"
            placeholder="Confirmer votre mot de passe"
           name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

         <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-gray-700 text-white font-bold py-2 px-4 rounded w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="button"
        >
          {loading ? "Chargement..." : "Confirmer"}
        </button>

      </div>
    </div>
  );
};

export default ReinitialiserMdp;
