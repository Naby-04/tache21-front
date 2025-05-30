import React, { useEffect, useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import mammoth from "mammoth";
import PdfViewer from "../DashboardUsers/PdfViewer/PdfViewer";

const RapportCard = ({ rapport, onDelete, onDetailCliquer }) => {
  const [docxHtml, setDocxHtml] = useState('');
  const [showModal, setShowModal] = useState(false);
  const isPdf = rapport.type === "application/pdf";
  const isDocx = rapport.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  useEffect(() => {
    if (isDocx) {
      fetch(rapport.file)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onload = event => {
            mammoth.convertToHtml({ arrayBuffer: event.target.result })
              .then(result => {
                setDocxHtml(result.value);
              })
              .catch(err => console.error("Erreur conversion DOCX:", err));
          };
          reader.readAsArrayBuffer(blob);
        });
    }
  }, [rapport.file, isDocx]);

  const handleDeleteConfirmed = () => {
    onDelete(rapport._id);
    setShowModal(false);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row p-5 rounded shadow-xl gap-3 bg-white transition-transform duration-300 hover:scale-102 hover:shadow-lg cursor-pointer">
        {/* Aperçu du fichier */}
        <div className="relative shadow-md border border-gray-300 w-full lg:w-60 flex justify-center items-center h-52 bg-gray-50 px-3 py-5 overflow-hidden rounded">
          {isPdf ? (
            <PdfViewer
            file={rapport.file}
            width={"200"}
            />
          ) : isDocx ? (
            <div
              className="prose text-sm max-h-full p-2"
              dangerouslySetInnerHTML={{ __html: docxHtml }}
            />
          ) : (
            <img
              src={rapport.imageRapport}
              alt="Rapport"
              className="w-full h-full object-cover rounded"
            />
          )}
        </div>

        {/* Infos du rapport */}
        <div className="flex flex-col w-full justify-between py-0 px-2 gap-3">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full relative bg-amber-200 overflow-hidden">
              <img
                src={rapport.userId?.photo || "/images/default-user.png"}
                alt="Utilisateur"
                className="absolute w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <p className="text-sm font-medium">{rapport.userId?.prenom}</p>
              <p className="text-xs text-gray-600">{rapport.category}</p>
            </div>
          </div>

          <div>
            <p className="text-md font-semibold line-clamp-1">- {rapport.title}</p>
            <p className="text-sm text-gray-700 line-clamp-3">{rapport.description}</p>
          </div>

          <div className="flex w-full justify-between items-center pt-2">
            <p
              className="text-sm text-blue-600 underline cursor-pointer"
              onClick={onDetailCliquer}
            >
              Voir détails
            </p>
            <button
              className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition text-[10px]"
              onClick={() => setShowModal(true)} // ✅ Ouvre le modal
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Modal de confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-sm w-full relative animate-fadeIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              <FaTimes />
            </button>

            <p className="text-lg font-semibold mb-2 text-red-600">Confirmation de suppression</p>
            <p className="text-sm text-gray-800 mb-4">
              Supprimer le rapport <strong>{rapport.title}</strong> de{" "}
              <strong>{rapport.userId?.prenom}</strong> ?
            </p>
            <div className="flex justify-center gap-4 mt-3">
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RapportCard;
