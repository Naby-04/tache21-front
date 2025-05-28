import { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import TextExpandable from "../../Composants/DashboardUsers/TextExpandable";

export const RapportTelecharger = () => {
  const [rapports, setRapports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRapports = async () => {
    try {
      const token = localStorage.getItem("token"); // ou autre méthode pour stocker ton token
      const res = await axios.get("http://localhost:8000/download/all/userRapport", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRapports(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des rapports :", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRapports();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="mt-5 md:mt-0 text-2xl font-semibold text-center text-gray-800 mb-8">
        Mes rapports téléchargés
      </h1>

      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center">
          {rapports.map((doc, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-xl overflow-hidden w-[90%] flex-auto transition-transform hover:scale-[1.02]"
            >
              {/* Placeholder image si tu n'as pas d'image */}
              <img
                src="/rapport-placeholder.jpg"
                alt={doc.rapportId?.title}
                className="h-[180px] w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 px-4">
                  {doc.rapportId?.title}
                </h2>
                <TextExpandable>
                  {doc.rapportId?.description}
                </TextExpandable>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-green-600 text-sm flex items-center gap-2">
                    <FaDownload /> Téléchargé
                  </span>
                  <a
                    href={doc.rapportId?.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Voir le rapport
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
