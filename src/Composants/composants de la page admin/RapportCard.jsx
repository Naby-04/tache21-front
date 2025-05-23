
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import mammoth from "mammoth";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;

const RapportCard = ({ rapport, onDelete, onDetailCliquer }) => {
  const [docxHtml, setDocxHtml] = useState('');
  const isPdf = rapport.type === "application/pdf";
  const isDocx = rapport.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  useEffect(() => {
    if (isDocx) {
      fetch(rapport.fileUrl)
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
  }, [rapport.fileUrl, isDocx]);

  return (
    <div className="flex flex-col lg:flex-row p-3 rounded shadow-xl gap-3 bg-white">
      {/* Aperçu du fichier */}
      <div className="relative shadow-md border-1 border-gray-500 w-full lg:w-60 flex justify-center items-center h-52 bg-gray-200 px-3 py-5 overflow-hidden rounded">
        {isPdf ? (
          <Document file={rapport.fileUrl}>
            <Page pageNumber={1} width={200} renderTextLayer={false} />
          </Document>
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
              src={rapport.user?.photoURL || "/images/default-user.png"}
              alt="Utilisateur"
              className="absolute w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <p className="text-sm font-medium">{rapport.user?.prenom}</p>
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
            onClick={onDelete}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RapportCard;
