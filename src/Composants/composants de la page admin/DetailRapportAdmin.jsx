import React, { useEffect, useState, useMemo } from "react";
import { FaFileAlt, FaDownload } from "react-icons/fa";
import { BiArrowBack, BiX } from 'react-icons/bi';
import { Document, Page } from 'react-pdf';
import mammoth from 'mammoth';

const DetailRapportAdmin = ({ rapportChoisi, onClick }) => {
  console.log(rapportChoisi)
  const [docHtml, setDocHtml] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [afficherWord, setAfficherWord] = useState(false);
  const [afficherPdf, setAfficherPdf] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWidth, setPageWidth] = useState(800);

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = 800;
      const padding = 48;
      setPageWidth(Math.min(window.innerWidth - padding, maxWidth));
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isPdf = rapportChoisi.type === "application/pdf";
  const isDocx = rapportChoisi.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  
  useEffect(() => {
    if (rapportChoisi.file && isDocx) {
  fetch(rapportChoisi.file)
    .then(response => {
      if (!response.ok) {
        throw new Error("Fichier inaccessible");
      }
      return response.blob();
    })
    .then(blob => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const arrayBuffer = event.target.result;
        mammoth.convertToHtml({ arrayBuffer })
          .then(result => setDocHtml(result.value))
          .catch(err => console.error("Erreur conversion DOCX:", err));
      };
      reader.readAsArrayBuffer(blob);
    })
    .catch(err => console.error("Erreur chargement fichier DOCX:", err));
}

  }, [rapportChoisi, isDocx]);

  if (!rapportChoisi) return null;

  return (
    <div className="relative">
      {/* Word View */}
      {afficherWord && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 p-6 overflow-y-scroll">
          <button onClick={() => setAfficherWord(false)} className="absolute top-4 right-4 text-3xl text-gray-800">
            <BiX />
          </button>
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Contenu Word</h2>
          <div className="prose mx-auto text-justify text-xs sm:text-sm w-full max-w-3xl" dangerouslySetInnerHTML={{ __html: docHtml }} />
        </div>
      )}

      {/* PDF View */}
      {afficherPdf && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col items-center overflow-y-scroll p-6">
          <button onClick={() => setAfficherPdf(false)} className="absolute top-4 right-4 text-3xl text-gray-800">
            <BiX />
          </button>
          <h2 className="text-lg sm:text-xl font-bold mb-4 mt-6">Aperçu PDF</h2>

          <div className="w-full flex justify-center">
            <div className="bg-white p-4 rounded shadow">
              <Document
                file={rapportChoisi.file}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(numPages);
                  setCurrentPage(1);
                }}
              >
                <Page pageNumber={currentPage} width={pageWidth} renderTextLayer={false} />
              </Document>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4 gap-4 text-sm sm:text-base">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage <= 1}
              className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50">Précédente</button>
            <span className="text-gray-600">Page {currentPage} / {numPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numPages))} disabled={currentPage >= numPages}
              className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50">Suivante</button>
          </div>
        </div>
      )}

      {/* Vue principale */}
      <div className="flex flex-col w-[95%] mx-auto md:flex-row justify-between gap-4 shadow-lg rounded bg-white p-3 sm:p-4 relative text-xs sm:text-sm mt-5">
        {/* Bouton retour */}
        <div
          onClick={onClick}
          className="flex items-center absolute top-[-40px] left-[-15px] shadow justify-center p-1 px-3 rounded-lg bg-gray-800 gap-2 text-amber-300 cursor-pointer z-5 text-lg sm:text-xl"
        >
          <BiArrowBack />
        </div>

        {/* Texte et détails */}
        <div className="flex flex-col basis-full md:basis-2/3 w-full gap-2">
          <div className="flex gap-3 items-center border-b border-gray-800 pb-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full relative border-2 border-gray-800 shadow-md">
              <img src={rapportChoisi.userId?.photo} alt="Utilisateur" className="absolute w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-medium">{rapportChoisi.userId.prenom}</p>
              <p className="text-xs sm:text-sm text-gray-600">{rapportChoisi.category}</p>
            </div>
          </div>

          <div className="mt-1 py-2 px-2 flex flex-col justify-between h-full">
            <p className="text-lg sm:text-xl font-bold line-clamp-1"> - {rapportChoisi.title}</p>
            <p className="text-sm sm:text-base mt-3">{rapportChoisi.description}</p>

            <div className="py-2 mt-3 px-2">
              <div className="flex gap-2 mb-2">
                <p><span className="text-sm sm:text-base font-semibold underline">Catégories</span>: <span className="text-sm sm:text-base font-light">{rapportChoisi.category}</span></p>
              </div>
              <div className="flex gap-2 mb-2">
                <p className="line-clamp-1"><span className="text-sm sm:text-base font-semibold underline">Tags</span>: <span className="text-sm sm:text-base font-light">{rapportChoisi.tags || "Aucun Tags"}</span></p>
              </div>
              <div className="flex gap-2 mb-2">
                <p className="line-clamp-1"><span className="text-sm sm:text-base font-semibold underline">Type</span>: <span className="text-sm sm:text-base font-light">{rapportChoisi.type}</span></p>
              </div>
            </div>

            <div className="flex flex-wrap mt-2 gap-3 py-2 px-2">
              {isPdf && (
                <div
                  onClick={() => setAfficherPdf(true)}
                  className="flex items-center justify-center gap-2 p-2 sm:p-3 px-4 sm:px-6 rounded-lg bg-gray-800 text-amber-300 cursor-pointer text-xs sm:text-sm"
                >
                  <FaFileAlt />
                  <span>Voir PDF</span>
                </div>
              )}
              {isDocx && (
                <div
                  onClick={() => setAfficherWord(true)}
                  className="flex items-center justify-center gap-2 p-2 sm:p-3 px-4 sm:px-6 rounded-lg bg-gray-800 text-amber-300 cursor-pointer text-xs sm:text-sm"
                >
                  <FaFileAlt />
                  <span>Voir Word</span>
                </div>
              )}
              {/* <div className="flex items-center justify-center gap-2 p-2 sm:p-3 px-4 sm:px-6 rounded-lg bg-gray-800 text-amber-300 cursor-pointer text-xs sm:text-sm">
                <FaDownload />
                <a href={rapportChoisi.file} download className="text-inherit no-underline">Télécharger</a>
              </div> */}
            </div>
          </div>
        </div>

        {/* Preview PDF / Word */}
        <div className="md:flex p-2 items-center justify-center">
          <div className="relative w-[200] h-[300px] md:w-[285px] md:h-[350px] rounded border border-gray-800 flex items-center justify-center shadow-lg overflow-hidden">
            {isPdf ? (
              <Document file={rapportChoisi.file}>
                <Page pageNumber={1} width={250} />
              </Document>
            ) : isDocx ? (
              <div className="doc-content overflow-auto p-2 text-xs sm:text-sm" dangerouslySetInnerHTML={{ __html: docHtml }} />
            ) : (
              <p className="text-xs sm:text-sm p-4 text-gray-500">Aucun fichier à afficher</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DetailRapportAdmin;