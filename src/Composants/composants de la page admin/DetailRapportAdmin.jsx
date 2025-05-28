import React, { useEffect, useState, useMemo } from "react";
import { FaFileAlt, FaDownload } from "react-icons/fa";
import { BiArrowBack, BiX } from 'react-icons/bi';
import { Document, Page, pdfjs } from 'react-pdf';
import mammoth from 'mammoth';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;

const DetailRapportAdmin = ({ rapportChoisi, onClick }) => {
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
    if (rapportChoisi && rapportChoisi.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const reader = new FileReader();
      reader.onload = function (event) {
        mammoth.convertToHtml({ arrayBuffer: event.target.result })
          .then(result => setDocHtml(result.value))
          .catch(err => console.log(err));
      };

      if (rapportChoisi.fileUrl) {
        fetch(rapportChoisi.fileUrl)
          .then(response => response.blob())
          .then(blob => reader.readAsArrayBuffer(blob));
      }
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
                file={rapportChoisi.fileUrl}
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
      <div className="flex flex-col md:flex-row justify-between gap-4 shadow rounded bg-white p-3 sm:p-4 relative text-xs sm:text-sm">
        {/* Bouton retour */}
        <div
          onClick={onClick}
          className="flex items-center absolute top-1 left-1 justify-center p-1 px-2 rounded-lg bg-gray-800 gap-2 text-amber-300 cursor-pointer z-5 text-lg sm:text-xl"
        >
          <BiArrowBack />
        </div>

        {/* Texte et détails */}
        <div className="flex flex-col basis-full md:basis-2/3 w-full gap-2">
          <div className="flex gap-3 items-center border-b border-gray-800 pb-3">
            <div className="w-10 h-10 rounded-full relative bg-amber-200">
              <img src={rapportChoisi.userPhoto} alt="Utilisateur" className="absolute w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-medium">{rapportChoisi.userId.prenom}</p>
              <p className="text-xs sm:text-sm text-gray-600">{rapportChoisi.category}</p>
            </div>
          </div>

          <div className="mt-1 py-2 px-2">
            <p className="text-lg sm:text-xl font-bold"> - {rapportChoisi.title}</p>
            <p className="text-sm sm:text-base mt-3">{rapportChoisi.description}</p>

            <div className="py-2 mt-3 px-2">
              <div className="flex gap-2 mb-2">
                <p className="text-sm sm:text-base font-semibold underline">Catégories :</p>
                <p className="text-sm sm:text-base font-light">{rapportChoisi.category}</p>
              </div>
              <div className="flex gap-2 mb-2">
                <p className="text-sm sm:text-base font-semibold underline">Tags :</p>
                <p className="text-sm sm:text-base font-light">Python, Js, Développement Web</p>
              </div>
              <div className="flex gap-2 mb-2">
                <p className="text-sm sm:text-base font-semibold underline">Type :</p>
                <p className="text-sm sm:text-base font-light">{rapportChoisi.type}</p>
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
              <div className="flex items-center justify-center gap-2 p-2 sm:p-3 px-4 sm:px-6 rounded-lg bg-gray-800 text-amber-300 cursor-pointer text-xs sm:text-sm">
                <FaDownload />
                <a href={rapportChoisi.fileUrl} download className="text-inherit no-underline">Télécharger</a>
              </div>
            </div>
          </div>
        </div>

        {/* Preview PDF / Word */}
        <div className="md:flex p-2 items-center justify-center">
          <div className="relative w-[200] h-[300px] md:w-[285px] md:h-[350px] rounded border border-gray-800 flex items-center justify-center shadow-lg overflow-hidden">
            {isPdf ? (
              <Document file={rapportChoisi.fileUrl}>
                <Page pageNumber={1} width={250} />
              </Document>
            ) : isDocx ? (
              <div className="doc-content overflow-auto p-2 text-xs sm:text-sm" dangerouslySetInnerHTML={{ __html: docHtml }} />
            ) : (
              <p className="text-xs sm:text-sm p-4 text-gray-500">Aucun fichier à afficher</p>
            )}
            <img
              src={rapportChoisi.imageRapport}
              alt="Image rapport"
              className="absolute z-20 w-10 h-10 rounded-3xl object-cover border bg-gray-800 bottom-2 right-2"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DetailRapportAdmin;