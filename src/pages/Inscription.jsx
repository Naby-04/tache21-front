import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaGoogle, FaUser } from "react-icons/fa";

import "../index.css";
//import { Link } from "react-router-dom";

const Inscription = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-xl w-full flex h-screen">
        <div style={{
        backgroundImage: `url("https://mironcoder-hotash.netlify.app/images/pattern.webp")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        // opacity: 0.6,
        // mixBlendMode: 'lighten'
      }} className="w-2/3 flex justify-center flex-col  p-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            MEILLEUR TABLEAU DE BORD ET PANNEAU D'ADMINISTRATION UX/UI POUR LE COMMERCE ÉLECTRONIQUE DE MODE
          </h1>
          <p className="text-gray-600 mb-8">
            Elit lusto dolore libero recusandae dolor dolores explicabo ullam cum facilis aperiam alias odio quam excepturi molestiae omnis inventor. Repudiandae officia placeat amet consectetur dicta dolorem quo.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-1/3 text-xs  bg-gray-50 p-8">
          <div className="flex items-center justify-center mb-4 ">
            <h2 className="text-2xl font-bold text-gray-800">Enregistrer un nouveau compte</h2>
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="name">
              Entrez votre nom
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Votre nom"
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Entrez votre email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Votre email"
            />
          </div>

          <div className="mb-3 ">
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

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirmer le mot de passe
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type="password"
              placeholder="Confirmer votre mot de passe"
            />
          </div>

          <div className="mb-3">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2 text-gray-700 text-sm">J'accepte toutes les conditions générales</span>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-yellow-600 hover:bg-amber-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
            >
              S'inscrire
            </button>
          </div>

          <div className="my-4 border-b-2">
            <div className=" relative top-3 bg-white size-fit mx-auto px-3">OU</div>
          </div>

          <div>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              <FaGoogle className="inline mr-2" />
              Continuer avec Google
            </button>
          </div>

          <div className="text-center mt-3">
            Vous avez déjà un compte ? <Link to="/connexion" className="font-bold text-sm text-yellow-500 hover:text-amber-800" >Se Connecter</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
