import { useEffect, useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import mammoth from "mammoth";
import ErrorBoundary from "../Composants-Accuiel/ErrorBoundary";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;

const TopRapports = ({ rapports, onDeleteClick }) => {
  console.log(rapports);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [docxPreviews, setDocxPreviews] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedRapport, setSelectedRapport] = useState(null);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRapports = rapports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rapports.length / itemsPerPage);

  useEffect(() => {
    currentRapports.forEach((rapport) => {
      const isDocx = rapport.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      if (isDocx && !docxPreviews[rapport._id]) {
        fetch(rapport.file)
          .then(res => res.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onload = (e) => {
              mammoth.convertToHtml({ arrayBuffer: e.target.result })
                .then(result => {
                  setDocxPreviews(prev => ({
                    ...prev,
                    [rapport._id]: result.value,
                  }));
                });
            };
            reader.readAsArrayBuffer(blob);
          });
      }
    });
  }, [currentRapports, docxPreviews]);

  const renderPreview = (rapport) => {
    const isPdf = rapport.type === "application/pdf";
    const isDocx = rapport.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    return (
      <div className="w-10 h-12 bg-gray-200 rounded overflow-hidden flex items-center justify-center border border-gray-300 shadow">
        {isPdf ? (
          <ErrorBoundary>
          <Document file={rapport.file}>
            <Page pageNumber={1} width={128} renderTextLayer={false} />
          </Document>
          </ErrorBoundary>
        ) : isDocx ? (
          <div
            className="w-full h-full text-xs p-1 leading-tight"
            dangerouslySetInnerHTML={{
              __html: docxPreviews[rapport._id]?.substring(0, 300) || "<p>Chargement...</p>",
            }}
          />
        ) : (
          <img
            src={rapport.imageRapport || "https://via.placeholder.com/128"}
            alt="Rapport"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Top Rapports <span className="text-xs opacity-75 mr-5">les plus téléchargés</span></h2>

      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[700px] text-left text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-800 text-gray-50">
              <th className="py-2 px-2">#</th>
              <th className="py-2 px-2">Rapport</th>
              {/* <th className="py-2 px-2 hidden md:table-cell">Profil</th> */}
              <th className="py-2 px-2">Actions</th>
            </tr>
          </thead>

          {/* <tbody>
            {currentRapports.map((rapport, index) => (
              <tr key={rapport._id || index} className="border-t transition-color duration-200 hover:bg-gray-100">
                <td className="py-2 px-3 font-bold text-gray-600">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-2 px-3">
                  <div className="flex items-center gap-3">
                    {renderPreview(rapport)}

                    <div className="flex-1 min-w-0">
                      <h4
                        className="font-semibold truncate"
                        title={rapport.title}
                      >
                        {rapport.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                        {rapport.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-3">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => {
                        setSelectedRapport(rapport);
                        setShowModal(true);
                      }}
                      className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition text-[10px] cursor-pointer"
                      aria-label="Supprimer le rapport"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody> */}

          <tbody>
  {currentRapports.length > 0 ? (
    currentRapports.map((rapport, index) => (
      <tr key={rapport._id || index} className="border-t transition-color duration-200 hover:bg-gray-100">
        <td className="py-2 px-3 font-bold text-gray-600">
          {(currentPage - 1) * itemsPerPage + index + 1}
        </td>
        <td className="py-2 px-3">
          <div className="flex items-center gap-3">
            {renderPreview(rapport)}
            <div className="flex-1 min-w-0">
              <h4
                className="font-semibold truncate"
                title={rapport.title}
              >
                {rapport.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                {rapport.description}
              </p>
            </div>
          </div>
        </td>
        <td className="py-2 px-3">
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                setSelectedRapport(rapport);
                setShowModal(true);
              }}
              className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition text-[10px] cursor-pointer"
              aria-label="Supprimer le rapport"
            >
              <FaTrash />
            </button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3" className="text-center text-gray-500 py-6">
        Aucun rapport trouvé pour ce nom.
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50 text-white"
        >
          Précédent
        </button>
        <span className="px-3 py-1">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50 text-white"
        >
          Suivant
        </button>
      </div>
      {showModal && selectedRapport && (
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
              Supprimer le rapport <strong>{selectedRapport.title}</strong> de{" "}
              <strong>{selectedRapport.user?.prenom}</strong> ?
            </p>

            <div className="flex justify-center gap-4 mt-3">
              <button
                onClick={() => {
                  onDeleteClick && onDeleteClick(selectedRapport._id);
                  setShowModal(false);
                }}
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

    </div>
  );
};

export default TopRapports;
