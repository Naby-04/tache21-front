import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../services/firebaseService";
import { signInWithPopup } from "firebase/auth";
import FormContext from "../../Contexts/FormContext";
import { toast } from "react-toastify";

const Inscription = () => {
  const [error, setError] = useState("");
  const [acceptCGU, setAcceptCGU] = useState(false);
  const { formData, updateFormData, resetFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user || !user.email || !user.displayName) {
        throw new Error("Les informations de l'utilisateur Google sont incomplètes.");
      }

      const response = await fetch("http://localhost:8000/api/users/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          prenom: user.displayName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription Google");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Inscription réussie avec Google !");
        resetFormData();
        navigate("/users");
      } else {
        throw new Error("Token non reçu du serveur.");
      }
    } catch (err) {
      const message = err.message || "Une erreur est survenue.";
      setError(message);
      toast.error(message);
      console.error("Erreur Google:", err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { prenom, nom, email, password, confirmPassword } = formData;

    // Validation des champs
    if (!prenom || !nom || !email || !password || !confirmPassword) {
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
      const response = await fetch("http://localhost:8000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prenom,
          nom,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erreur d'inscription");

      localStorage.setItem("token", data.token);
      toast.success("Inscription réussie !");
      resetFormData(); // Réinitialise les champs
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
            <div className="mb-2 w-[70%]">
              <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="prenom">
                Entrez votre prénom
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="prenom"
                type="text"
                placeholder="Votre prénom"
                name="prenom"
                value={formData.prenom || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2 w-[70%]">
              <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="nom">
                Entrez votre nom
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nom"
                type="text"
                placeholder="Votre nom"
                name="nom"
                value={formData.nom || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2 w-[70%]">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Entrez votre email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Votre email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2 w-[70%]">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Mot de passe
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Votre mot de passe"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2 w-[70%]">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirmer le mot de passe
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirm-password"
                type="password"
                placeholder="Confirmer votre mot de passe"
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={handleChange}
              />
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
                className="bg-gray-700 hover:bg-gray-600 text-center text-white font-bold py-3 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full"
                type="submit"
                disabled={!acceptCGU}
              >
                S'inscrire
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4 mb-4 w-[70%]">
            <div className="border-t border-gray-500 flex-grow"></div>
            <p className="mx-4 text-gray-700">OU</p>
            <div className="border-t border-gray-500 flex-grow"></div>
          </div>

          <div className="flex w-[80%] items-center justify-center">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-3 bg-gray-200 h-10 hover:bg-blue-600 text-black focus:shadow-outline font-bold py-3 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-[90%]"
              type="button"
            >
              <img src="/images/google.png" alt="Google" className="w-10 h-10" />
              <span className="">Google</span>
            </button>
          </div>

          <div className="text-center mt-3">
            Vous avez déjà un compte ?{" "}
            <Link to="/connexion" className="font-bold text-sm text-gray-700 hover:text-gray-400">
              Se connecter
            </Link>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Inscription;