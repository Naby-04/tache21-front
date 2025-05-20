
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../services/firebaseService";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import FormContext from "../../Contexts/FormContext";
import AuthContext from "../../Contexts/AuthContext";

const Connexion = () => {
  const [error, setError] = useState("");
  const { formData, updateFormData, resetFormData } = useContext(FormContext);
  const { fetchProfil } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithPopup(auth, provider);
      navigate("/users");
    } catch (err) {
      console.error("Erreur Google:", err);
      setError("Erreur lors de la connexion avec Google.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Validation des champs
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Adresse email invalide.");
      return;
    }

    if (password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erreur de connexion");

      localStorage.setItem("token", data.token);
      await fetchProfil();
      toast.success("Connexion réussie !");
      resetFormData();
      navigate("/users");
    } catch (error) {
      toast.error("Erreur de connexion : " + error.message);
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <div className="min-h-screen md:h-screen flex bg-gray-100">
      <div className="rounded-lg w-full flex 1/3">
        {/* Image gauche */}
        <div className="sm:flex justify-center flex-col w-[50%] p-10 hidden">
          <img src="/imge/Sign up-cuate.png" alt="illustration" />
        </div>

        {/* Formulaire de connexion */}
        <div className="md:w-[50%] text-xs px-8 w-full flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Se connecter</h2>

          <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="mb-2 w-[70%]">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Entrez votre email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Votre email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-2 w-[70%]">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                placeholder="Votre mot de passe"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <a
              href="/MotDePassOublie"
              className="inline-block text-end font-bold text-sm text-gray-700 hover:text-blue-800 mb-6 w-[70%]"
            >
              Mot de passe oublié ?
            </a>

            <div className="w-[70%]">
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 h-10 rounded-2xl focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Se connecter
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4 mb-4 w-[70%]">
            <div className="border-t border-gray-500 flex-grow"></div>
            <p className="mx-4 text-gray-700">OU</p>
            <div className="border-t border-gray-500 flex-grow"></div>
          </div>
          <div className="w-[70%]">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex items-center justify-center bg-gray-200  hover:bg-blue-600 text-black rounded-2xl font-bold py-3 px-4 h-10  focus:outline-none focus:shadow-outline w-full"
            >
              <img src="/images/google.png" alt="Google" className="w-10 h-10" />
              <span>Google</span>
            </button>
          </div>

          {error && (
            <div className="text-red-500 mt-2 text-sm text-center w-[70%]">
              {error}
            </div>
          )}

          {/* Lien d'inscription */}
          <div className="text-center mt-3">
            Vous n'avez pas de compte ?{" "}
            <Link to="/inscription" className="font-bold text-sm text-gray-700 hover:text-gray-400">
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connexion;