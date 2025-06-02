import { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload , FaTrash} from "react-icons/fa";
import TextExpandable from "../../Composants/DashboardUsers/TextExpandable";
import PdfViewer from "../../Composants/DashboardUsers/PdfViewer/PdfViewer";
import ClipLoader from "react-spinners/ClipLoader";
import * as mammoth from "mammoth";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { toast } from "react-toastify";

export const RapportTelecharger = ({ doc }) => {
  const [rapports, setRapports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const { docHtml, setDocHtml } = usePublication();

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
  // const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce rapport ?");
  // if (!confirmDelete) return;
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
      toast.success(" Supprimé :", data.message);
      setRapports((prev) => prev.filter((r) => r._id !== downloadId)); // Met à jour l'affichage
    } else {
      console.error("❌ Erreur :", data.message);
    }
  } catch (error) {
    console.error("Erreur serveur :", error);
  }
};

  
  

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="mt-5 md:mt-0 text-2xl font-semibold text-center text-gray-800 mb-8">
        Mes rapports téléchargés
      </h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center mt-10">
        <ClipLoader color="#36d7b7" size={50} />
        <p className="mt-4 text-center text-gray-600">Chargement...</p>
      </div>
      ) : rapports.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
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
                  <div className="absolute inset-0 bg-opacity-0 bg-black/10  transition-all duration-300 flex items-center justify-center  z-10">
                    <span className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold">
                      {ispdf ? "Lire le PDF" : isdoc ? "Ouvrir le document" : "Voir le fichier"}
                    </span>
                  </div>

                  {ispdf ? (
                    <div className="w-full max-h-[250px] relative">
                      {pdfError && <p className="text-red-500">{pdfError}</p>}
                      <PdfViewer file={rapportId.file} width={null} height={"200"}/>
                    </div>
                  ) : isdoc ? (
                    <div className="w-full min-h-[200px] bg-gray-100 p-4">
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
                      <FaDownload /> Téléchargé
                    </span>
                   
                   <p className="line-clamp-1">Publié par : {rapportId?.userId?.prenom || "Utilisateur inconnu"}</p>
                   {/* <p className="text-sm text-gray-500 mt-1">
                Téléchargé le : {new Date(rapportId?.createdAt).toLocaleDateString()}
                </p> */}
               <button
             onClick={() => deleteDownload(rapport._id)}
             className="flex items-center gap-2 bg-gray-800 hover:bg-grey-700 text-white px-3 py-1 rounded shadow"
             >
            <FaTrash className="text-red-500"/>
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
