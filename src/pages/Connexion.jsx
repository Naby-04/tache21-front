import React, { useState } from "react";
import { Link } from "react-router-dom";

const Connexion = () => {
  const InputField = ({ type, name, placeholder, ...rest }) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full p-3 md:p-4 border rounded-lg bg-white"
        {...rest}
      />
    );
  };

  const [showReset, setShowReset] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Connexion avec :", { email, password });
  };

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Réinitialisation pour :", email);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#a65f00] px-4">
        <div className="w-full max-w-md bg-[#FFF8E7] p-6 sm:p-8 rounded-2xl shadow-lg">
          {showReset ? (
            <>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-[#a65f00] mb-6">
                Réinitialiser le mot de passe
              </h2>

              <form onSubmit={handleReset} className="space-y-4">
                <InputField
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-[#a65f00] text-white py-3 md:py-4 rounded-lg hover:bg-[#8b4c00] transition"
                >
                  Envoyer le lien de réinitialisation
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowReset(false)}
                  className="hover:underline text-[#a65f00] font-serif"
                >
                  Retour à la connexion
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-[#a65f00] mb-6">
                Connexion
              </h2>

              <form onSubmit={handleLogin} className="space-y-4">
                <InputField
                  type="email"
                  name="email"
                  placeholder="E‑mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <InputField
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Link to="/users">
                  <button
                    type="submit"
                    className="w-full bg-[#a65f00] text-white py-3 md:py-4 rounded-lg hover:bg-[#8b4c00] transition"
                  >
                    Se connecter
                  </button>
                </Link>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowReset(true)}
                  className="hover:underline text-[#a65f00] font-serif"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="mb-2 text-sm md:text-base text-[#a65f00]">Ou</p>
                <button className="w-full bg-white text-[#a65f00] py-3 md:py-4 border rounded-lg hover:bg-[#f5e7d3] transition font-Inter">
                  Continuer avec Google
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Connexion;
