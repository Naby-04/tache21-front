import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ReportCard({ report, isLoggedIn }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("blur-background");
    } else {
      document.body.classList.remove("blur-background");
    }

    return () => {
      document.body.classList.remove("blur-background");
    };
  }, [isModalOpen]);

  const handleViewPdfClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      window.open(report.fileUrl, "_blank", "noopener,noreferrer");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate("/inscription");
  };

  return (
    <>
      <section id="rapports" className="z-10">
        <div className="bg-white p-4 mx-auto rounded-2xl shadow-2xl border border-yellow-100 relative">
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

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-lg border border-gray-200 z-50">
            <h2 id="modal-title" className="text-xl font-semibold mb-4">
             Reservé aux abonnés
            </h2>
            <p className="mb-6">
              Merci de bien vouloir vous inscrire et vous authentifier pour en bénéficier
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
              >
                Fermer
              </button>
              <button
                onClick={handleModalConfirm}
                className="px-4 py-2 bg-gray-800 rounded text-white hover:bg-amber-400 cursor-pointer"
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
