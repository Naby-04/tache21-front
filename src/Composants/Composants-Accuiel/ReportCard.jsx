import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApercuPage from "../../assets/imagePdf.png";

function ReportCard({ report, isLoggedIn }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModal, setIsSecondModal] = useState(false);
  const navigate = useNavigate();

  // Empêche scroll page quand modals ouverts
  useEffect(() => {
    if (isModalOpen || isSecondModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen, isSecondModal]);

  const handleViewPdfClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      window.open(report.fileUrl, "_blank", "noopener,noreferrer");
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

  return (
    <>
      <section id="rapports" className="z-10">
        <div className="bg-white p-4 mx-auto rounded-2xl shadow-2xl border border-yellow-100 relative modal">
          {report.image && (
            <img
              src={report.image}
              alt={report.title}
              className="w-full h-40 object-cover mb-4"
            />
          )}
          <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
          <p className="text-gray-600 mb-4">{report.description}</p>

          <button
            onClick={handleViewPdfClick}
            className="text-amber-300 font-medium underline bg-transparent border-none cursor-pointer"
          >
            Voir le {report.fileType}
          </button>
        </div>
      </section>

      {/* Overlay floue quand le premier modal s'ouvre */}
      {(isModalOpen || isSecondModal) && (
        <div
          className="fixed inset-0 z-30 bg-white bg-opacity-40 backdrop-blur-md"
          aria-hidden="true"
        />
      )}

      {/* Premier modal */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 z-40 flex items-center justify-center transition-all duration-300`}
          aria-modal="true"
          role="dialog"
        >
          <div
            className={`relative bg-white rounded-lg p-6 w-full max-w-4xl mx-auto shadow-lg border border-gray-200 flex flex-col md:flex-row gap-6 modal-content ${
              isSecondModal ? "filter blur-sm" : ""
            }`}
          >
            <button
              onClick={handleFirstModalClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
              aria-label="Fermer"
            >
              &times;
            </button>

            <div className="border-t pt-4 w-full">
              <h2 className="text-lg font-bold mb-2">- Rapport de Mémoire</h2>
              <p className="text-gray-700 mb-3">
                {report.description ||
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam..."}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Catégories :</span>{" "}
                {report.categorie || "Informatique"}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Tags :</span>{" "}
                {report.tags || "Python, JS, Développement Web"}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Type :</span>{" "}
                {report.fileType || "docx"}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={handleVoirWord}
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-amber-400 font-semibold"
                >
                  Voir Word
                </button>
                <button
                  onClick={handleModalConfirm}
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-amber-400 font-semibold"
                >
                  Télécharger
                </button>
              </div>
            </div>

            <div className="w-full max-w-[388px] border rounded-lg overflow-hidden relative shadow-sm bg-white">
              <img
                src={ApercuPage}
                alt="Aperçu du rapport"
                className="w-full h-[340px] object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Deuxième modal */}
      {isSecondModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
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
