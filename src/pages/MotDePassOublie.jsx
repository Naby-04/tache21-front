import React, { useState } from "react";
import { Link } from "react-router-dom";

function MotDePassOublie() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Erreur lors de l'envoi de l'email.");
        return;
      }

      setSuccess("Un email de réinitialisation a été envoyé.");
    } catch (err) {
      setError("Erreur réseau ou serveur.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-xl w-[30%] h-[400px]">
        <div className="text-center text-xl font-bold mb-6">
          Réinitialiser le mot de passe
        </div>
        <p>
          Après avoir envoyé ce formulaire, vous recevrez un <span className="font-bold">Email</span> contenant un code pour réinitialiser votre mot de passe.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-7">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Entrez votre email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-7"
            type="submit"
          >
            Obtenir le lien
          </button>
        </form>

        {error && (
          <div className="text-red-500 mt-2 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-600 mt-2 text-sm text-center">{success}</div>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-700 text-sm">
            Tu te souviens du mot de passe ?
            <Link
              className="font-bold text-gray-700 hover:text-blue-800 ml-1"
              to="/connexion"
            >
              Se Connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MotDePassOublie;