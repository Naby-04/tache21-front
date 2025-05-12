import React from "react";
import { Link } from "react-router-dom";

const ReinitialiserMdp = () => {
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
          />
        </div>

        <Link to="/connexion" className="w-full">
          <button
            className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            type="button"
          >
            Confirmer
          </button>
        </Link>

        {/* <div className="mt-6 text-center">
          <p className="text-gray-700 text-sm">
            Tu te souviens du mot de passe ?
            <a
              className="font-bold text-gray-700 hover:text-blue-800 ml-1"
              href="/connexion"
            >
              Se Connecter
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ReinitialiserMdp;
