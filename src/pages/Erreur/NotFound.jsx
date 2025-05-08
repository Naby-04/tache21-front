import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-9xl font-extrabold text-black mb-4">404</h1>
      <h2 className="text-4xl font-bold text-black mb-4">
        Oops! Page non trouvée
      </h2>
      <p className="text-black text-2xl mb-6">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-beige text-black rounded-lg hover:bg-yellow-200 transition">
        Retour à l'accueil
      </a>
    </div>
  );
};

export default NotFound;
