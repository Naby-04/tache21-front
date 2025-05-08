<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
import { FaEnvelope, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Connexion() {
  return (
    <div className='h-screen' style={{
        backgroundImage: `url("https://mironcoder-hotash.netlify.app/images/pattern.webp")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
       // opacity: 2,
        mixBlendMode: 'lighten',
      }}>
    <div  className="bg-white shadow-md hc rounded  m-auto px-8 pt-6 pb-8 flex flex-col my-20 w-full max-w-sm mx-auto">
      <div className="text-center text-2xl font-bold mb-6">
        Connectez-vous
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          <FaEnvelope className="inline mr-2" />
          Entrez votre email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Votre email"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Mot de passe
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Votre mot de passe"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Se connecter
        </button>
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/mot-de-pass-oublie">
          Mot de passe oublié ?
        </a>
      </div>

      <div className="my-4 border-b-2">
        <div className="text-center">OU</div>
      </div>

      <div>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          <FaGoogle className="inline mr-2" />
          Continuer avec Google
        </button>
      </div>

      <div className="text-center mt-6">
        Vous n'avez pas de compte ? <Link to="/inscription" className="font-bold text-sm text-blue-500 hover:text-blue-800">S'inscrire</Link>
      </div>
    </div>
    </div>
  );
}
=======
=======
>>>>>>> 634699cdcf81cb4aba86543ace9544314ede6211
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
<<<<<<< HEAD
>>>>>>> a34a08ed20484858b3f0c0f5b047d35322bbe13e
=======
>>>>>>> 634699cdcf81cb4aba86543ace9544314ede6211

export default Connexion;
