import React from "react";
import { FaEnvelope, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Connexion = () => {
  return (
    <div
      className="h-screen flex items-center px-20"
      style={{
        backgroundImage: `url("https://mironcoder-hotash.netlify.app/images/pattern.webp")`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        // opacity: 2,
      }}
    >
      <div className="bg-white shadow-md hc rounded px-8 pt-6 pb-8 flex flex-col w-full max-w-sm mx-auto">
        <div className="text-center text-2xl font-bold mb-6">
          Connectez-vous
        </div>

        <div className="mb-4">
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
            placeholder="Votre email"
          />
        </div>

        <div className="">
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

        {/* <div className="flex items-center justify-between"> */}
        <a
          className="inline-block text-end  font-bold text-sm text-blue-500 hover:text-blue-800 mb-6"
          href="/mot-de-passe-oublie"
        >
          Mot de passe oublié ?
        </a>
        <Link to="/users">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Se connecter
          </button>
        </Link>
        {/* </div> */}

        <div className="my-4 border-b-2">
          <div className="text-center relative top-3 bg-white size-fit mx-auto px-3">
            OU
          </div>
        </div>

        <div>
          <button className="mt-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            <FaGoogle className="inline mr-2" />
            Continuer avec Google
          </button>
        </div>

        <div className="text-center mt-6">
          Vous n'avez pas de compte ?{" "}
          <Link
            to="/inscription"
            className="font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
