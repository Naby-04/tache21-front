import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import PdfViewer from "../../Composants/DashboardUsers/PdfViewer/PdfViewer";
import ClipLoader from "react-spinners/ClipLoader";
import * as mammoth from "mammoth";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { toast } from "react-toastify";
import EmptyList from "../../Composants/EmptyList";
import { IoOpenOutline } from "react-icons/io5";
import { Document, Page } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Composant pour lire les fichiers DOCX
const LireDocx = ({ isOpen, onClose, htmlContent, onOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur p-2 bg-opacity-50">
      <div className="bg-white max-h-[80vh] overflow-y-auto w-full max-w-[80vw] p-6 rounded-md shadow-lg relative">
        <button 
          onClick={onClose} 
          className="fixed right-25 top-[65px] md:right-65 text-red-500 text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        <button 
          className="fixed top-[65px] left-25 md:left-65 text-gray-800 text-2xl font-bold cursor-pointer"
          onClick={onOpen}
        >
          <IoOpenOutline/>
        </button>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
};

// Composant pour lire les fichiers PDF
const LirePdf = ({ isOpen, onClose, file, onOpen }) => {
  const [numPages, setNumPages] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [pageWidth, setPageWidth] = useState(800);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur z-50 flex items-center justify-center w-full bg-opacity-60">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-[90vw] md:max-w-[80vw] w-full max-h-[90vh] overflow-y-auto relative flex justify-center">
        <div>
          <button
            onClick={onClose}
            className="fixed top-[50px] z-100 right-25 md:right-50 text-gray-700 hover:text-red-600 text-2xl font-bold"
          >
            ✕
          </button>

          <button
            className="fixed top-[50px] z-100 left-25 md:left-50 text-gray-900 hover:text-blue-600 text-2xl font-bold"
            onClick={onOpen}
          >
            <IoOpenOutline />
          </button>

          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p className="text-center">Chargement du PDF...</p>}
            error={<p className="text-red-500 text-center">Erreur de chargement du PDF</p>}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={pageWidth}
                className="mb-4"
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export const RapportTelecharger = () => {
  const [rapports, setRapports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [pdfError, setPdfError] = useState(null);
  const { docHtml, setDocHtml } = usePublication();
  const [docxModalOpen, setDocxModalOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [currentPdfFile, setCurrentPdfFile] = useState(null);

  useEffect(() => {
    const fetchRapports = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://tache21-back.onrender.com/download/all/userRapport", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRapports(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des rapports :", error);
        setLoading(false);
      }
    };

    fetchRapports();
  }, []);

  const handleDocumentClick = async (e, file, type) => {
    e.preventDefault();
    e.stopPropagation();
  
    if (type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      await convertDocxToHtml(file);
      setDocxModalOpen(true);
    } else if (type === "application/pdf") {
      setCurrentPdfFile(file);
      setPdfModalOpen(true);
    } else {
      const encodedUrl = encodeURIComponent(file);
      const viewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}`;
      window.open(viewerUrl, "_blank", "noopener,noreferrer");
    }
  };

  const convertDocxToHtml = async (file) => {
    try {
      setIsLoading(true);
      const response = await fetch(file);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setDocHtml(result.value || "<p>Aucun contenu à afficher</p>");
    } catch (err) {
      console.error("Erreur de conversion docx:", err);
      setDocHtml("<p>Erreur d'affichage</p>");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDownload = async (downloadId) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce rapport ?");
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://tache21-back.onrender.com/download/${downloadId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Rapport supprimé avec succès");
        setRapports((prev) => prev.filter((r) => r._id !== downloadId));
      } else {
        toast.error(data.message || "Erreur lors de la suppression");
        console.error("Erreur de suppression :", data.message);
      }
    } catch (error) {
      toast.error("Erreur serveur lors de la suppression");
      console.error("Erreur serveur :", error);
    }
  };

  const openInNewTab = ({file}) => {
    if (docxModalOpen && docHtml) {
      const newWindow = window.open(`https://docs.google.com/viewer?url=${file}`, "_blank");
      newWindow.document.write(docHtml);
    } else if (pdfModalOpen && currentPdfFile) {
      window.open(currentPdfFile, '_blank');
    }
  };

  return (
    <div className="w-full min-h-[85vh] bg-gray-100 p-6">
      <h1 className="mt-5 md:mt-0 text-2xl font-semibold text-center text-gray-800 mb-8">
        Mes rapports téléchargés
      </h1>

      {/* Modales */}
      <LireDocx
        isOpen={docxModalOpen}
        onClose={() => setDocxModalOpen(false)}
        htmlContent={docHtml}
        onOpen={() => openInNewTab({file: currentPdfFile})}
      />

      <LirePdf
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        file={currentPdfFile}
        onOpen={() => openInNewTab({file: currentPdfFile})}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <ClipLoader color="#36d7b7" size={20} />
          <p className="mt-4 text-center text-gray-600">Chargement...</p>
        </div>
      ) : rapports.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          <EmptyList />
          Vous n'avez pas encore téléchargé de rapport.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center">
          {rapports.map((rapport, i) => {
            const { rapportId } = rapport;
            const ispdf = rapportId?.type === "application/pdf";
            const isdoc = rapportId?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

            return (
              <div
                key={i}
                className="bg-white shadow-lg rounded-xl overflow-hidden w-[100%] h-[300px] transition-transform hover:scale-[1.02]"
              >
                <div
                  className="relative rounded-md overflow-hidden mb-4 cursor-pointer group"
                  onClick={(e) => handleDocumentClick(e, rapportId?.file, rapportId?.type)}
                >
                  <div className="absolute inset-0 bg-opacity-0 bg-black/10 transition-all duration-300 flex items-center justify-center z-10">
                    <span className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold">
                      {ispdf ? "Lire le PDF" : isdoc ? "Ouvrir le document" : "Voir le fichier"}
                    </span>
                  </div>

                  {ispdf ? (
                    <div className="w-full max-h-[250px] relative flex items-center justify-center">
                      {pdfError && <p className="text-red-500">{pdfError}</p>}
                      <PdfViewer file={rapportId.file} width={null} height={"200"}/>
                    </div>
                  ) : isdoc ? (
                    <div className="w-full max-h-[200px] bg-gray-100 p-4">
                      {isLoading ? (
                        <p>Chargement du document...</p>
                      ) : (
                        <div
                          className="docx-preview max-h-64"
                          dangerouslySetInnerHTML={{ __html: docHtml }}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="w-[50%]">
                      <img
                        src="/images/word.jpg"
                        alt={rapportId?.title}
                        className="w-full h-[200px] object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="p-2">
                  <h2 className="text-md font-bold line-clamp-1 text-gray-800 px-4">
                    {rapportId?.title}
                  </h2>
                  <div className="mt-6 flex gap-2 items-center justify-between">
                    <span className="text-green-600 text-sm flex items-center gap-2">
                      Téléchargé
                    </span>
                   
                   <p className="line-clamp-1">Publié par : {rapportId?.userId?.prenom || "Utilisateur inconnu"}</p>
                   {/* <p className="text-sm text-gray-500 mt-1">
                Téléchargé le : {new Date(rapportId?.createdAt).toLocaleDateString()}
                </p> */}
               <button
             
             onClick={() => deleteDownload(rapport._id)}
             className="flex items-center gap-2 bg-red-500 hover:red-500 text-white px-3 py-1 rounded shadow cursor-pointer"
             >
            <FaTrash className="text-white"/>
           </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};