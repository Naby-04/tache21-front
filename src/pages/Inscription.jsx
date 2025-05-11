import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaGoogle, FaUser } from "react-icons/fa";

import "../index.css";
//import { Link } from "react-router-dom";

const Inscription = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-gray-50 rounded-lg shadow-xl w-full flex 1/3">
        <div className="sm:flex justify-center flex-col w-[50%] p-10 hidden ">
          <img
            src="./public/Capture_d_écran_2025-05-09_153108-removebg-preview.png"
            alt="photo"
          />
        </div>

        {/* Right Side */}
        <div className="md:w-[50%] text-xs px-8 w-full flex flex-col items-center justify-center ">
          <div className=" mb-4 ">
            <h2 className="text-2xl font-bold text-gray-800">
              Créer un compte
            </h2>
          </div>

          <div className="mb-2 w-full">
            <label
              className="block text-gray-700 text-base font-bold mb-2"
              htmlFor="name"
            >
              Entrez votre nom
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Votre nom"
            />
          </div>

          <div className="mb-2 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Entrez votre email
            </label>
            <input
              className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Votre email"
            />
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

          <div className="mb-2 w-full">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5  text-blue-600"
              />
              <span className="ml-2 text-gray-700 text-sm">
                J'accepte toutes les conditions générales
              </span>
            </label>
          </div>

          <div className="flex w-full items-center justify-between">
            <button
              className="bg-gray-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
            >
              S'inscrire
            </button>
          </div>

          <div className="flex items-center justify-between mt-4 mb-4 w-[80%] ">
            <div className="border-t border-gray-500 flex-grow"></div>
            <p className="mx-4 text-gray-700">OU</p>
            <div className="border-t border-gray-500 flex-grow "></div>
          </div>

          <div className="w-full">
            <button
              className="flex items-center justify-center gap-3 
             bg-gray-700 h-7  hover:bg-gray-400 text-white font-bold 
              px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              <div className="flex items-center justify-center px-4 rounded focus:outline-none focus:shadow-outline mt-4  gap3 mb-4">
                <img
                  src="./public/logo-google.png" // Remplacez par le chemin de votre image
                  alt="Google"
                  className="w-12 h-12 rounded-full size-fit"
                />
              </div>
            </button>
          </div>

          <div className="text-center mt-3">
            Vous avez déjà un compte ?{" "}
            <Link
              to="/connexion"
              className="font-bold text-sm text-gray-700 hover:text-gray-400"
            >
              Se Connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
