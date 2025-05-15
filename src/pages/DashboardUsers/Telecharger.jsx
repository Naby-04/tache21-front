import { FaDownload } from "react-icons/fa";
import TextExpandable from "../../Composants/DashboardUsers/TextExpandable";
import fakeReports from "../../data/FakeReport";

export const RapportTelecharger = () => {

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">
        Mes rapports téléchargés
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center">
        {fakeReports.map((doc, i) => (
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
              <h2 className="text-lg font-bold text-gray-800 px-4">{doc.title}</h2>
              <TextExpandable>
                {doc.description}
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
