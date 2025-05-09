import { FaDownload } from "react-icons/fa";
import TextExpandable from "../../Composants/DashboardUsers/TextExpandable";

export const RapportTelecharger = () => {
  const Telecharger = [
    {
      id: "doc1",
      title: "Mémoire sur le climat",
      img: "../../../public/images/dev.jpg",
    },
    {
      id: "doc2",
      title: "Analyse financière des PME",
      img: "../../../public/images/dev.jpg",
    },
    {
      id: "doc3",
      title: "Impact de la technologie sur l’éducation",
      img: "../../../public/images/dev.jpg",
    },
    {
      id: "doc3",
      title: "Impact de la technologie sur l’éducation",
      img: "../../../public/images/dev.jpg",
    },
    {
      id: "doc3",
      title: "Impact de la technologie sur l’éducation",
      img: "../../../public/images/dev.jpg",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">
        Mes rapports téléchargés
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center">
        {Telecharger.map((doc, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-xl overflow-hidden w-[90%]  flex-auto transition-transform hover:scale-[1.02]"
          >
            <img
              src={doc.img}
              alt={doc.title}
              className="h-[180px] w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{doc.title}</h2>
              <TextExpandable>
                Ceci est un résumé de votre rapport téléchargé. Vous pouvez le relire à tout moment dans votre espace personnel.
              </TextExpandable>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-green-600 text-sm flex items-center gap-2">
                  <FaDownload /> Téléchargé
                </span>
                <button className="text-blue-600 text-sm hover:underline">
                  Voir le rapport
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
