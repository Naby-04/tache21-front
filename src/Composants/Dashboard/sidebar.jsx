import React from "react";

const sidebar = () => {
  return (
    <>
      <div className="h-screen bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          MonApp
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <a href="#" className="hover:text-yellow-400">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Profil
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Paramètres
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Déconnexion
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default sidebar;
