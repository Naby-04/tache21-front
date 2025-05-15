import { FaTrash, FaDownload } from "react-icons/fa";
import { Document, Page } from 'react-pdf';
import { BiArrowBack } from 'react-icons/bi';



const DetailRapportAdmin = ({ rapportChoisi, onClick }) => {
  if (!rapportChoisi) return null;

  const isDocx = rapportChoisi.type === "docx";
  const isPdf = rapportChoisi.type === "pdf";

  return (
    <div className="flex justify-between gap-2 shadow rounded bg-white p-3 pt-5 relative">
      <div
        className="flex items-center absolute top-1 left-1 justify-center p-1 px-2 rounded-lg bg-gray-800 gap-2 text-amber-300 cursor-pointer z-5"
        onClick={onClick}
      >
        <BiArrowBack />
      </div>

      {/* Infos à gauche */}
      <div className="basis-2/3 w-full flex flex-col gap-2">
        <div className="flex gap-2 items-center border-b border-gray-800 pb-3">
          <div className="w-15 h-15 rounded-full relative bg-amber-200">
            <img
              src={rapportChoisi.userPhoto}
              alt=""
              className="absolute w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <p className="text-md font-medium">{rapportChoisi.nomUsers}</p>
            <p className="text-sm text-gray-600">{rapportChoisi.categories}</p>
          </div>
        </div>

        <div className="mt-1 py-2 px-2">
          <p className="text-xl font-bold"> - {rapportChoisi.titre}</p>
          <p className="text-md mt-3">{rapportChoisi.descriptionLong}</p>

          <div className="py-2 mt-3 px-2">
            <div className="flex gap-2 mb-2">
              <p className="text-md font-semibold underline">Catégories :</p>
              <p className="text-md font-light">{rapportChoisi.categories}</p>
            </div>
            <div className="flex gap-2 mb-2">
              <p className="text-md font-semibold underline">Tags :</p>
              <p className="text-md font-light">Python, Js, Développement Web</p>
            </div>
            <div className="flex gap-2 mb-2">
              <p className="text-md font-semibold underline">Type :</p>
              <p className="text-md font-light">{rapportChoisi.type}</p>
            </div>
          </div>

          <div className="flex mt-2 gap-3 py-2 px-2">
            {/* Afficher le lien pour voir ou télécharger le fichier */}
            {isPdf && (
              <div className="flex items-center justify-center gap-2 p-3 px-6 rounded-lg bg-gray-800 text-amber-300 cursor-pointer">
                <FaDownload />
                <a href={rapportChoisi.fichier} target="_blank" rel="noopener noreferrer" className="text-md">
                  Voir PDF
                </a>
              </div>
            )}
            {isDocx && (
              <div className="flex items-center justify-center gap-2 p-3 px-6 rounded-lg bg-gray-800 text-amber-300 cursor-pointer">
                <FaDownload />
                <a href={`https://docs.google.com/gview?url=${rapportChoisi.fichier}&embedded=true`} target="_blank" rel="noopener noreferrer" className="text-md">
                  Voir Word
                </a>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 p-3 px-6 rounded-lg bg-gray-800 text-amber-300 cursor-pointer">
              <FaDownload />
              <a href={rapportChoisi.fichier} download className="text-md">Télécharger</a>
            </div>
          </div>
        </div>
      </div>

      {/* Fichier à droite */}
      <div className="basis-1/3 w-full p-2 flex items-center justify-center">
        <div
          className="relative rounded border border-gray-800 shadow-lg overflow-hidden"
          style={{ width: "285px", height: "350px" }}
        >
          {isPdf ? (
            <Document file={rapportChoisi.fichier}>
              <Page pageNumber={1} width={250} />
            </Document>
          ) : isDocx ? (
            <iframe
              src={`https://docs.google.com/gview?url=${rapportChoisi.fichier}&embedded=true`}
              style={{ width: "100%", height: "100%" }}
              frameBorder="0"
              title="Word Viewer"
            ></iframe>
          ) : (
            <p className="text-sm p-4 text-gray-500">Aucun fichier à afficher</p>
          )}

          <img
            src={rapportChoisi.imageRapport}
            alt=""
            className="absolute z-2 w-10 h-10 rounded-3xl object-cover border bg-gray-800 bottom-2 right-2"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailRapportAdmin;
