import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaMap } from "react-icons/fa";

const DetailUtilisateur = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
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
              {/* ---------------------- */}
              <div className="flex justify-between">
                <h2 className="text-xl font-bold text-start">
                  Info Utilisateur
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 bg-gray-800 rounded text-white cursor-pointer"
                >
                  <IoMdClose />
                </button>
              </div>
              {/* ---------------------- */}
              <div className="flex mt-5 items-center">
                <div className="rounded-4xl bg-black p-8 w-10"></div>
                <div className="px-3 flex flex-col gap-1">
                  <div className="bg-white w-30 font-bold">John Doe</div>
                  <div className="bg-white w-60">@JohnDoecoder</div>
                </div>
              </div>
              {/* ---------------------- */}
              <div className="mt-5">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold">Contacts</h2>
                  <div className="border w-full mt-1"></div>
                </div>
                {/* ---------------------- */}
                <div className="mt-5">
                  <div className="flex gap-5 mb-2 items-center">
                    <FaPhoneAlt />
                    <p>+91 987-654-3210</p>
                  </div>
                  <div className="flex gap-5 mb-2 items-center">
                    <IoMail />
                    <p>JohnDoe@example.com</p>
                  </div>
                  <div className="flex gap-5 items-center">
                    <FaMap />
                    <p>1Hd- 50, 010 Avenue, NY 90001 United States</p>
                  </div>
                </div>
                {/* ---------------------- */}
                <div className="flex items-center gap-2 mt-5">
                  <h2 className="font-bold">Biographie</h2>
                  <div className="border w-full mt-1"></div>
                </div>
                {/* ---------------------- */}
                <p className="mt-5">
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                  It was popularised in the 1960s with the release of Letraset
                  sheets
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailUtilisateur;
