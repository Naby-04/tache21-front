import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

const Inscription = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptCGU, setAcceptCGU] = useState(false);

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithPopup(auth, provider);
      navigate("/users");
    } catch (error) {
      setError("Erreur lors de l'inscription avec Google.");
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!acceptCGU) {
      setError("Vous devez accepter les conditions générales.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Envoi des données au backend
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Erreur lors de l'inscription.");
        return;
      }

      // Redirection ou autre action après succès
      navigate("/users");
    } catch (err) {
      setError("Erreur réseau ou serveur.");
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
              <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="name">
                Entrez votre nom
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
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

          <div className="flex w-[70%] items-center justify-center">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-3 border border-amber-300 bg-gray-200 h-10 hover:bg-amber-600 text-black font-bold py-3 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full"
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