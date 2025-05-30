import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import mammoth from "mammoth";
import PdfViewer from "../DashboardUsers/PdfViewer/PdfViewer";

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

    const fileType = report.type ?? "";

    const isDocx =
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "docx";

    if (isDocx && report.file) {
      fetch(report.file)
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
      window.open(report.file, "_blank", "noopener,noreferrer");
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
    const fileType = report.type ?? "";
    const isPdf = fileType.includes("pdf");
    const isDocx = fileType.includes("wordprocessingml") || fileType === "docx";

    // Si utilisateur pas connecté, on affiche direct fallback image
    if (!isLoggedIn && (isPdf || isDocx)) {
      return (
        <div className="flex items-center justify-center h-55 w-full relative">
          <div className="absolute inset-0 bg-gray-800/10 z-30 pointer-events-none" />
          <img
            src={isPdf ? siPdf : siWord}
            alt={isPdf ? "PDF fallback" : "Word fallback"}
            className="h-[160px] max-w-[250px] object-contain"
          />
        </div>
      );
    }

    // // // Si erreur de chargement, on affiche fallback aussi
    if (docLoadError) {
      return (
        <img
          src={isPdf ? siPdf : siWord}
          alt={isPdf ? "PDF fallback" : "Word fallback"}
          className="max-h-full max-w-full object-contain"
        />
      );
    }

    // Sinon, affichage normal
    return (
      <div className="relative flex items-center justify-center mb-4 overflow-hidden bg-gray-200 w-full h-full shadow rounded-md">
        {/* Couche semi-transparente */}
        <div className="absolute inset-0 bg-gray-800/10 z-30 pointer-events-none" />
        {/* Contenu du preview */}
        <div className="relative z-20">
          {isPdf ? (
            // <Document
            //   file={report.file}
            //   onLoadError={() => setDocLoadError(true)}
            //   onSourceError={() => setDocLoadError(true)}
            // >
            <Document
              file={report.file}
              // onLoadSuccess={onDocumentLoadSuccess}
              // onLoadError={(error) => console.error("Erreur chargement PDF :", error)}
              onLoadError={(error) => {
                console.error("Erreur de chargement PDF :", error);
                setDocLoadError(true);
              }}
              onSourceError={(error) => {
                console.error("Erreur source PDF :", error);
                setDocLoadError(true);
              }}
            >
              <Page
                pageNumber={1}
                width={250}
                renderTextLayer={false}
                className="mx-auto"
              />
            </Document>
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
              src={report.imageRapport || "https://via.placeholder.com/250x160"}
              alt={report.title}
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>
      </div>
    );
  };

  const fileType = report.type ?? "";

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
                {report.title}
              </h3>
              <div className="flex bg-gray-100 text-gray-700 text-xs font-medium px-1 py-1 w-fit rounded">
                {report.category || "Sans catégorie"}
              </div>
              <span
                className="text-amber-300 p-1 bg-white rounded-full text-lg absolute right-0 top-1"
                title="Certifié"
              >
                <FaCheckCircle className="text-amber-300" />
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-2 line-clamp-3">
              {report.description}
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
          <button
            onClick={handleFirstModalClose}
            className="absolute top-0 right-4 text-red-600 hover:text-gray-100 font-bold text-5xl shadow-gray-700"
            aria-label="Fermer"
          >
            &times;
          </button>
          <div
            className={`relative bg-white rounded-lg p-6 w-full max-w-4xl mx-auto shadow-lg border border-gray-200 flex flex-col md:flex-row gap-6 modal-content ${
              isSecondModal ? "filter blur-sm" : ""
            } max-h md:h-[500px]`}
          >
            <div className="border-t pt-4 w-full">
              <h2 className="text-lg font-bold mb-2">- Rapport de Mémoire</h2>
              <p className="text-gray-700 mb-3">
                {report.description ||
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Catégories :</span>{" "}
                {report.category || "Informatique"}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Tags :</span>{" "}
                {report.tags || "Python, JS, Développement Web"}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Type :</span>{" "}
                {fileType || "docx"}
              </p>

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
        <div
          className="fixed inset-0 z-150 flex items-center justify-center p-5 shadow-2xl"
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal2-title"
        >
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-lg border border-gray-200 z-50">
            <h2 id="modal2-title" className="text-xl font-semibold mb-4">
              Réservé aux abonnés
            </h2>
            <p className="mb-6">
              Merci de bien vouloir vous inscrire et vous authentifier pour en
              bénéficier.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSecondModalClose}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
              >
                Fermer
              </button>
              <button
                onClick={handleModalConfirm}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-amber-400"
              >
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReportCard;
