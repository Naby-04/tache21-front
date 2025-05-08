import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

function MotDePassOblie() {
  return (
    <div style={{
        backgroundImage: `url("https://mironcoder-hotash.netlify.app/images/pattern.webp")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        mixBlendMode: 'lighten'
      }} className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-sm">
        <div className="text-center text-xl font-bold mb-6">
          Réinitialiser le mot de passe
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

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Obtenir le lien
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-700 text-sm">
            Tu te souviens du mot de passe ?
            <a className="font-bold text-blue-500 hover:text-blue-800 ml-1" href="/connexion">
              Se Connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MotDePassOblie;