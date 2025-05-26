import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormContext from "../../Contexts/FormContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../../services/firebaseService";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Inscription = () => {
  // const [error, setError] = useState("");
  const [acceptCGU, setAcceptCGU] = useState(false);
  const { formData, updateFormData, resetFormData } = useContext(FormContext);
  const navigate = useNavigate();

  // Ajout des états pour afficher/masquer les mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const { url } = usePublication();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔥 Appelle ton backend pour l'enregistrer dans MongoDB
      const response = await fetch(`${url}/api/users/google-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: user.displayName,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Erreur lors de l'inscription via Google.");
        return;
      }

      // Enregistre l'utilisateur localement
      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.user));

      toast.success("Inscription via Google réussie !");
      navigate("/users");
    } catch (error) {
      console.error("Erreur Google Auth:", error);
      toast.error("Erreur lors de l'inscription avec Google.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { prenom, email, password, confirmPassword } = formData;

    // Validation des champs
    if (!prenom || !email || !password || !confirmPassword) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (!acceptCGU) {
      toast.error("Vous devez accepter les conditions générales.");
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

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(`${url}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prenom,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erreur d'inscription");

      localStorage.setItem("token", data.token);
      toast.success("Inscription réussie !");
      resetFormData();
      navigate("/connexion");
    } catch (error) {
      toast.error("Erreur : " + error.message);
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <div className="min-h-screen md:h-screen flex bg-gray-100">
      <div className="bg-gray-100 rounded-lg w-full flex 1/3">
        <div className="sm:flex justify-center flex-col w-[50%] p-10 hidden">
          <img src="/imge/Sign up-cuate.png" alt="photo" />
        </div>

        {/* Partie droite */}
        <div className="md:w-[50%] text-xs px-8 flex flex-col items-center justify-center">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Créer un compte</h2>
          </div>

          <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            {/* ...champ nom... */}
            <div className="mb-2 w-[70%]">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Entrez votre email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Votre email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>

            {/* Champ mot de passe avec icône */}
            <div className="mb-2 w-[70%]">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Champ confirmation mot de passe avec icône */}
            <div className="mb-2 w-[70%]">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirmer votre mot de passe"
                  name="confirmPassword"
                  value={formData.confirmPassword || ""}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="mb-2 w-[70%]">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 text-blue-600"
                  checked={acceptCGU}
                  onChange={(e) => setAcceptCGU(e.target.checked)}
                />
                <span className="ml-2 text-gray-700 text-sm">
                  J'accepte toutes les conditions générales
                </span>
              </label>
            </div>

            <div className="flex w-[70%] items-center justify-between">
              <button
                className="bg-gray-800 hover:bg-gray-600 text-center text-white font-bold py-3 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                S'inscrire
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4 mb-4 w-[70%]">
            <div className="border-t border-gray-500 flex-grow"></div>
            <p className="mx-4 text-gray-800">OU</p>
            <div className="border-t border-gray-500 flex-grow"></div>
          </div>

          <div className="flex w-[80%] items-center justify-center">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 bg-gray-200 h-10 hover:bg-gray-800 text-gray-800 hover:text-white focus:shadow-outline font-bold py-3 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-[90%]"
              type="button"
            >
              <img src="/images/google.png" alt="Google" className="w-10 h-10" />
              <span className="">Google</span>
            </button>
          </div>

          <div className="text-center mt-3">
            Vous avez déjà un compte ?{" "}
            <Link to="/connexion" className="font-bold text-sm text-gray-800 hover:text-gray-400">
              Se connecter
            </Link>
          </div>

          {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
        </div>
      </div>
    </div>
  );
};

export default Inscription;