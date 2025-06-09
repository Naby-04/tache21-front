import React, { useState, useEffect } from "react";
import { FaCertificate } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import { FaCheckCircle } from "react-icons/fa";
import mammoth from "mammoth";
import PdfViewer from "../DashboardUsers/PdfViewer/PdfViewer";
import ErrorBoundary from "./ErrorBoundary";


function ReportCard({ report, isLoggedIn }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModal, setIsSecondModal] = useState(false);
  const [docxPreview, setDocxPreview] = useState(null);
  // const [docLoadError, setDocLoadError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isModalOpen || isSecondModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen, isSecondModal]);

  // Reset error et preview quand le fichier change
  useEffect(() => {
    // setDocLoadError(false);
    setDocxPreview(null);

    const fileType = report.rapport.type ?? "";

    const isDocx =
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "docx";

    if (isDocx && report.rapport.file) {
      fetch(report.rapport.file)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            mammoth
              .convertToHtml({ arrayBuffer: e.target.result })
              .then((result) => {
                setDocxPreview(result.value);
              })
              .catch(() =>
                setDocxPreview("<p>Impossible de charger l'aperçu.</p>")
              );
          };
          reader.readAsArrayBuffer(blob);
        })
        .catch(() => setDocxPreview("<p>Impossible de charger l'aperçu.</p>"));
    }
  }, [report]);

  const handleViewPdfClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      window.open(report.rapport.file, "_blank", "noopener,noreferrer");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleVoirWord = () => {
    setIsSecondModal(true);
  };

  const handleModalConfirm = () => {
    setIsSecondModal(false);
    setIsModalOpen(false);
    navigate("/inscription");
  };

  const handleSecondModalClose = () => setIsSecondModal(false);
  const handleFirstModalClose = () => setIsModalOpen(false);

  const renderPreview = () => {
    const fileType = report.rapport.type ?? "";
    const isPdf = fileType.includes("pdf");
    const isDocx = fileType.includes("wordprocessingml") || fileType === "docx";

    // Sinon, affichage normal
    return (
      <div className="relative flex items-center justify-center mb-4 overflow-hidden bg-gray-200 w-full h-full shadow rounded-md">
        {/* Couche semi-transparente */}
        <div className="absolute inset-0 bg-gray-800/10 z-30 pointer-events-none" />
        {/* Contenu du preview */}
        <div className="relative z-20">
          {isPdf && report.rapport.file ? (
            <ErrorBoundary>
            <PdfViewer file={report.rapport.file} width={200} />
            </ErrorBoundary>
          ) : isDocx ? (
            <div
              className="text-sm text-gray-700 max-h-full overflow-hidden"
              style={{ maxWidth: 250 }}
              dangerouslySetInnerHTML={{
                __html: docxPreview || "<p>Chargement aperçu...</p>",
              }}
            />
          ) : (
            <img
              src={report.rapport.imageRapport || "https://via.placeholder.com/250x160"}
              alt={report.rapport.title}
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>
      </div>
    );
  };

  const fileType = report.rapport.type ?? "";

  return (
    <>
      <section className="z-10">
        <div className="bg-white mx-auto rounded shadow-xl border border-gray-300 relative modal flex flex-col justify-between h-[400px] max-w-[350px] pb-3">
          <div className="h-55 mb-2 border-b-2 border-gray-800">
            {renderPreview()}
          </div>

          <div className="flex-1 flex flex-col justify-center px-2">
            {/* Titre + Badge certifié */}
            <div className="flex flex-col mb-3 relative w-full">
              <h3 className="text-lg font-semibold line-clamp-1">
                {report.rapport.title}
              </h3>
              <div className="flex bg-gray-100 text-gray-700 text-xs font-medium px-1 py-1 w-fit rounded">
                {report.rapport.category || "Sans catégorie"}
              </div>
              <span
                className="text-amber-300 p-1 bg-white rounded-full text-lg absolute right-0 top-1"
                title="Certifié"
              >
              <FaCertificate className="text-lg text-amber-300" />
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-2 line-clamp-3">
              {report.rapport.description}
            </p>

            <button
              onClick={handleViewPdfClick}
              className="inline-block w-fit px-3 py-1 mt-auto text-sm font-medium text-amber-300 bg-gray-800 rounded hover:text-white cursor-pointer transition"
            >
              Voir plus
            </button>
          </div>
        </div>
      </section>

      {/* Floue quand le premier modal s'ouvre */}
      {(isModalOpen || isSecondModal) && (
        <div
          className="fixed inset-0 z-100 bg-gray-800/20 backdrop-blur-xs"
          aria-hidden="true"
        />
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-110 flex items-center justify-center transition-all duration-300 p-5 md:p-0"
          aria-modal="true"
          role="dialog"
        >
          <div
            className={`relative bg-white rounded-lg p-6 w-full max-w-4xl mx-auto shadow-lg border border-gray-200 flex flex-col md:flex-row gap-6 modal-content ${
              isSecondModal ? "filter blur-sm" : ""
            } max-h md:h-[500px]`}
          >
            <button
            onClick={handleFirstModalClose}
            className="absolute top-[-5px] right-2 cursor-pointer text-red-600 hover:text-amber-300 font-bold text-4xl shadow-gray-700 z-115"
            aria-label="Fermer"
          >
            &times;
          </button>
            <div className="border-t pt-4 w-full flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold mb-2 line-clamp-1">- {report.rapport.title}</h2>
                <p className="text-gray-700 mb-3">
                  {report.rapport.description ||
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-semibold underline">Catégories :</span>{" "}
                  {report.rapport.category || "Informatique"}
                </p>
                <p className="mb-2 line-clamp-1">
                  <span className="font-semibold underline">Tags :</span>{" "}
                  {report.rapport.tags || "Python, JS, Développement Web"}
                </p>
                <p className="mb-4 line-clamp-1">
                  <span className="font-semibold underline">Type :</span>{" "}
                  {fileType || "docx"}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleVoirWord}
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-amber-400 font-semibold"
                >
                  Voir le{" "}
                  {fileType.includes("pdf")
                    ? "PDF"
                    : fileType.includes("wordprocessingml")
                    ? "Word"
                    : "document"}
                </button>
              </div>
            </div>

            <div className="hidden md:flex w-full max-w-[388px] border rounded-lg overflow-hidden relative shadow-sm bg-white items-center justify-center">
              {renderPreview()}
            </div>
          </div>
        </div>
      )}

      {isSecondModal && (
        <div className=" flex items-center justify-center fixed inset-0 z-110 bg-gray-800/20 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full text-center">
          <div className="relative max-w-md w-full">
            <button
              onClick={handleSecondModalClose}
              className="absolute -top-5 -right-5 bg-amber-300 rounded-full shadow p-1 
              text-gray-800 hover:text-white text-2xl"
              aria-label="Fermer"
            >
              <AiOutlineClose />
            </button>
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Inscrivez-vous
            </h2>
            <p className="text-gray-700 mb-6">
              Merci de vous inscrire pour accéder à ces documents.
            </p>
            <div className="flex justify-center items-center  gap-4">
           
            <button
                onClick={handleModalConfirm}
                className="bg-gray-800 hover:text-white text-amber-300 px-4 py-2 rounded w"
              >
                S'inscrire
              </button>
              </div>
              </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReportCard;
