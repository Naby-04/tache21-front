import React from "react";
import { Link } from "react-router-dom";


const Connexion = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="rounded-lg w-full flex 1/3">
        <div className="sm:flex justify-center flex-col w-[50%] p-10 hidden ">
          <img
            src="./public/Capture_d_écran_2025-05-09_153108-removebg-preview.png"
            alt="photo"
          />
        </div>

        {/* Right Side */}
        <div className="md:w-[50%] text-xs px-8 w-full flex flex-col items-center justify-center ">
          <div className=" mb-4 ">
            <h2 className="text-2xl font-bold text-gray-800">Se connecter</h2>
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

          <a
            className="inline-block text-end font-bold text-sm text-gray-700 hover:text-blue-800 mb-6 w-full"
            href="/motDePassOublie"
          >
            Mot de passe oublié ?
          </a>

          <Link to="/users" className="w-full">
            <button
              className="bg-gray-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
            >
              Se connecter
            </button>
          </Link>

          <div className="flex items-center justify-between mt-4 mb-4 w-[80%] ">
            <div className="border-t border-gray-500 flex-grow"></div>
            <p className="mx-4 text-gray-700">OU</p>
            <div className="border-t border-gray-500 flex-grow "></div>
          </div>

          <div className="w-full">
            <button
              className="flex items-center justify-center 
                 bg-gray-700 h-7 hover:bg-gray-400 text-white font-bold 
                   rounded w-full"
            >
              <div className="flex items-center justify-center px-4 rounded mt-4 gap3 mb-4">
                <p className="m-0">se connecter avec &nbsp;&nbsp;</p>
                <img
                  src="./public/logo-google.png" // Remplacez par le chemin de votre image
                  alt="Google"
                  className="w-12 h-15 rounded-full size-fit"
                />
              </div>
            </button>
          </div>

          <div className="text-center mt-3">
            Vous n'avez pas de compte ?{" "}
            <Link
              to="/inscription"
              className="font-bold text-sm text-gray-700 hover:text-gray-400"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
