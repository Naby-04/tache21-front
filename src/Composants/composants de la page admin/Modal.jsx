import React, { useState } from "react";
import "../../index.css";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      {/* Bouton pour ouvrir le modal */}
      <button
        style={{
          background: "var(--primary-color)",
        }}
        onClick={() => setIsOpen(true)}
        className="text-white px-4 py-2 rounded"
      >
        Ouvrir le modal
      </button>

      {/* Le modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg mx-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Êtes vous sûr de vouloir supprimer cet utilisateur !
            </h2>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                non
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-[var(--primary-color)] px-4 py-2 text-white rounded"
              >
                oui
              </button>
              {/* au click sur le boutton un toast montrant que l'utilisateur a bien ete supprimer est attendu */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
