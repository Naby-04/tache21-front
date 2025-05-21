// import React, { useEffect, useState, useMemo } from "react";
// import { FaFileAlt, FaDownload } from "react-icons/fa";
// import { BiArrowBack, BiX } from "react-icons/bi";
// import { Document, Page, pdfjs } from "react-pdf";
// import mammoth from "mammoth";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;

// const DetailRapportAdmin = ({ rapportChoisi, onClick }) => {
//   const [docHtml, setDocHtml] = useState("");
//   const [numPages, setNumPages] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [afficherWord, setAfficherWord] = useState(false);
//   const [afficherPdf, setAfficherPdf] = useState(false);

//   const isPdf = rapportChoisi?.type?.includes("pdf");
//   const isDocx = rapportChoisi?.type?.includes("docx");

//   const pdfUrl = rapportChoisi?.fileUrl;

//   // ✅ Ici : mémoisation du fichier PDF
//   const pdfFile = useMemo(() => {
//     if (!isPdf || !pdfUrl) return null;
//     return { url: pdfUrl, withCredentials: true };
//   }, [isPdf, pdfUrl]);

//   console.log("pdfFile:", pdfFile);

//   useEffect(() => {
//     if (rapportChoisi && isDocx) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         mammoth
//           .convertToHtml({ arrayBuffer: event.target.result })
//           .then((result) => setDocHtml(result.value))
//           .catch(console.error);
//       };
//       fetch(rapportChoisi.fichier, { credentials: "include" })
//         .then((res) => res.blob())
//         .then((blob) => reader.readAsArrayBuffer(blob));
//     }
//   }, [rapportChoisi]);

//   if (!rapportChoisi) return null;

//   console.log(rapportChoisi.titre)
//   console.log(rapportChoisi.description)

//   return (
//     <div className="relative p-4">
//       <button onClick={onClick} className="absolute top-2 left-2 flex items-center gap-2 bg-gray-800 text-white p-2 rounded">
//         <BiArrowBack /> Retour
//       </button>

//       {afficherWord && (
//         <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto">
//           <button onClick={() => setAfficherWord(false)} className="absolute top-4 right-4 text-3xl">
//             <BiX />
//           </button>
//           <h2 className="text-xl font-bold mb-4">Aperçu Word</h2>
//           <div dangerouslySetInnerHTML={{ __html: docHtml }} className="prose max-w-none" />
//         </div>
//       )}

//       {/* {afficherPdf && (
//         <div className="fixed inset-0 bg-white z-50 p-6 flex flex-col items-center overflow-y-auto">
//           <button onClick={() => setAfficherPdf(false)} className="absolute top-4 right-4 text-3xl">
//             <BiX />
//           </button>
//           <h2 className="text-xl font-bold mb-4">Aperçu PDF</h2>
//           <Document
//             file={{ url: rapportChoisi.fileUrl, withCredentials: true }}
//             onLoadSuccess={({ numPages }) => {
//               setNumPages(numPages);
//               setCurrentPage(1);
//             }}
//           >
//             <Page pageNumber={currentPage} width={800} />
//           </Document>

//           <div className="mt-4 flex gap-4">
//             <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage <= 1} className="px-4 py-2 bg-gray-800 text-white rounded">Précédente</button>
//             <span>Page {currentPage} / {numPages}</span>
//             <button onClick={() => setCurrentPage(p => Math.min(p + 1, numPages))} disabled={currentPage >= numPages} className="px-4 py-2 bg-gray-800 text-white rounded">Suivante</button>
//           </div>
//         </div>
//       )} */}
//       {afficherPdf && (
//   <div className="fixed inset-0 bg-white z-50 p-6 flex flex-col items-center overflow-y-auto">
//     <button onClick={() => setAfficherPdf(false)} className="absolute top-4 right-4 text-3xl">
//       <BiX />
//     </button>
//     <h2 className="text-xl font-bold mb-4">Aperçu PDF</h2>

//     {pdfFile ? (
//       <Document
//         file={pdfFile}
//         onLoadSuccess={({ numPages }) => {
//           setNumPages(numPages);
//           setCurrentPage(1);
//         }}
//         onLoadError={(error) => {
//           console.error("Erreur de chargement PDF :", error.message);
//         }}
//       >
//         <Page pageNumber={currentPage} width={800} />
//       </Document>
//     ) : (
//       <p className="text-red-500">Le PDF est introuvable ou inaccessible.</p>
//     )}

//     <div className="mt-4 flex gap-4">
//       <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage <= 1} className="px-4 py-2 bg-gray-800 text-white rounded">Précédente</button>
//       <span>Page {currentPage} / {numPages}</span>
//       <button onClick={() => setCurrentPage(p => Math.min(p + 1, numPages))} disabled={currentPage >= numPages} className="px-4 py-2 bg-gray-800 text-white rounded">Suivante</button>
//     </div>
//   </div>
// )}



//       <div className="bg-white shadow-md rounded p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="col-span-2 space-y-4">
//           <div className="flex items-center gap-3 border-b pb-4">
//             {rapportChoisi.userPhoto ? (
//               <img src={rapportChoisi.userPhoto} className="w-14 h-14 rounded-full object-cover" />
//             ) : (
//               <div className="w-14 h-14 bg-gray-300 rounded-full" />
//             )}
//             <div>
//               <p className="text-md font-bold">{rapportChoisi.nomUsers}</p>
//               <p className="text-sm text-gray-600">{rapportChoisi.categories}</p>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-xl font-bold mb-2">{rapportChoisi.titre}</h3>
//             <p>{rapportChoisi.description || "Aucune description disponible."}</p>

//             <div className="mt-4 text-sm space-y-1">
//               <p><strong>Catégorie:</strong> {rapportChoisi.categories}</p>
//               <p><strong>Type:</strong> {rapportChoisi.type}</p>
//               <p><strong>Tags:</strong> Python, JS, Dev Web</p>
//             </div>

//             <div className="flex gap-3 mt-4">
//               {isPdf && <button onClick={() => setAfficherPdf(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-amber-300 rounded"><FaFileAlt /> Voir PDF</button>}
//               {isDocx && <button onClick={() => setAfficherWord(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-amber-300 rounded"><FaFileAlt /> Voir Word</button>}
//               <a href={rapportChoisi.fileUrl} download className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-amber-300 rounded"><FaDownload /> Télécharger</a>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col items-center">
//           <div className="relative border w-[285px] h-[350px] shadow rounded overflow-hidden">
//             {isPdf ? (
//               <Document file={{ url: rapportChoisi.fichier, withCredentials: true }}>
//                 <Page pageNumber={1} width={250} />
//               </Document>
//             ) : isDocx ? (
//               <div className="p-2 overflow-y-auto text-sm" dangerouslySetInnerHTML={{ __html: docHtml }} />
//             ) : (
//               <p className="p-4 text-gray-500">Aucun aperçu disponible</p>
//             )}
//             {rapportChoisi.imageRapport && (
//               <img src={rapportChoisi.imageRapport} className="absolute bottom-2 right-2 w-10 h-10 rounded-full object-cover border bg-white" />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailRapportAdmin;



// import React, { useEffect, useState, useMemo } from "react";
// import { FaFileAlt, FaDownload } from "react-icons/fa";
// import { BiArrowBack, BiX } from "react-icons/bi";
// import { Document, Page, pdfjs } from "react-pdf";
// import mammoth from "mammoth";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;

// const DetailRapportAdmin = ({ rapportChoisi, onClick }) => {
//   const [docHtml, setDocHtml] = useState("");
//   const [numPages, setNumPages] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [afficherWord, setAfficherWord] = useState(false);
//   const [afficherPdf, setAfficherPdf] = useState(false);

//   const isPdf = rapportChoisi?.type?.includes("pdf");
//   const isDocx = rapportChoisi?.type?.includes("docx");

//   const pdfUrl = rapportChoisi?.fileUrl;

//   const pdfFile = useMemo(() => {
//     if (!isPdf || !pdfUrl) return null;
//     return { url: pdfUrl, withCredentials: true };
//   }, [isPdf, pdfUrl]);

//  useEffect(() => {
//   if (rapportChoisi && isDocx && rapportChoisi.fileUrl) {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       mammoth
//         .convertToHtml({ arrayBuffer: event.target.result })
//         .then((result) => setDocHtml(result.value))
//         .catch(console.error);
//     };

//     fetch(rapportChoisi.fileUrl, { credentials: "include" })
//       .then((res) => res.blob())
//       .then((blob) => {
//         // Vérification du type MIME
//         if (blob.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
//           reader.readAsArrayBuffer(blob);
//         } else {
//           console.error("Le fichier n'est pas un .docx valide :", blob.type);
//         }
//       })
//       .catch((err) => {
//         console.error("Erreur lors du chargement du fichier Word :", err);
//       });
//   }
// }, [rapportChoisi, isDocx]);


//   if (!rapportChoisi) return null;

//   return (
//     <div className="relative p-4">
//       <button onClick={onClick} className="absolute top-2 left-2 flex items-center gap-2 bg-gray-800 text-white p-2 rounded">
//         <BiArrowBack /> Retour
//       </button>

//       {/* Aperçu Word */}
//       {afficherWord && (
//         <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto">
//           <button onClick={() => setAfficherWord(false)} className="absolute top-4 right-4 text-3xl">
//             <BiX />
//           </button>
//           <h2 className="text-xl font-bold mb-4">Aperçu Word</h2>
//           <div dangerouslySetInnerHTML={{ __html: docHtml }} className="prose max-w-none" />
//         </div>
//       )}

//       {/* Aperçu PDF */}
//       {afficherPdf && (
//         <div className="fixed inset-0 bg-white z-50 p-6 flex flex-col items-center overflow-y-auto">
//           <button onClick={() => setAfficherPdf(false)} className="absolute top-4 right-4 text-3xl">
//             <BiX />
//           </button>
//           <h2 className="text-xl font-bold mb-4">Aperçu PDF</h2>

//           {pdfFile ? (
//             <Document
//               file={pdfFile}
//               onLoadSuccess={({ numPages }) => {
//                 setNumPages(numPages);
//                 setCurrentPage(1);
//               }}
//               onLoadError={(error) => {
//                 console.error("Erreur de chargement PDF :", error.message);
//               }}
//             >
//               <Page pageNumber={currentPage} width={800} />
//             </Document>
//           ) : (
//             <p className="text-red-500">Le PDF est introuvable ou inaccessible.</p>
//           )}

//           <div className="mt-4 flex gap-4">
//             <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage <= 1} className="px-4 py-2 bg-gray-800 text-white rounded">Précédente</button>
//             <span>Page {currentPage} / {numPages}</span>
//             <button onClick={() => setCurrentPage(p => Math.min(p + 1, numPages))} disabled={currentPage >= numPages} className="px-4 py-2 bg-gray-800 text-white rounded">Suivante</button>
//           </div>
//         </div>
//       )}

//       {/* Informations générales */}
//       <div className="bg-white shadow-md rounded p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="col-span-2 space-y-4">
//           <div className="flex items-center gap-3 border-b pb-4">
//             {rapportChoisi.userPhoto ? (
//               <img src={rapportChoisi.userPhoto} className="w-14 h-14 rounded-full object-cover" />
//             ) : (
//               <div className="w-14 h-14 bg-gray-300 rounded-full" />
//             )}
//             <div>
//               <p className="text-md font-bold">{rapportChoisi.nomUsers}</p>
//               <p className="text-sm text-gray-600">{rapportChoisi.categories}</p>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-xl font-bold mb-2">{rapportChoisi.titre}</h3>
//             <p>{rapportChoisi.description || "Aucune description disponible."}</p>

//             <div className="mt-4 text-sm space-y-1">
//               <p><strong>Catégorie:</strong> {rapportChoisi.categories}</p>
//               <p><strong>Type:</strong> {rapportChoisi.type}</p>
//               <p><strong>Tags:</strong> Python, JS, Dev Web</p>
//             </div>

//             <div className="flex gap-3 mt-4">
//               {isPdf && <button onClick={() => setAfficherPdf(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-amber-300 rounded"><FaFileAlt /> Voir PDF</button>}
//               {isDocx && <button onClick={() => setAfficherWord(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-amber-300 rounded"><FaFileAlt /> Voir Word</button>}
//               <a href={rapportChoisi.fileUrl} download className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-amber-300 rounded"><FaDownload /> Télécharger</a>
//             </div>
//           </div>
//         </div>

//         {/* Aperçu mini */}
//         <div className="flex flex-col items-center">
//           <div className="relative border w-[285px] h-[350px] shadow rounded overflow-hidden">
//             {isPdf ? (
//               <Document file={pdfFile}>
//                 <Page pageNumber={1} width={250} />
//               </Document>
//             ) : isDocx ? (
//               <div className="p-2 overflow-y-auto text-sm" dangerouslySetInnerHTML={{ __html: docHtml }} />
//             ) : (
//               <p className="p-4 text-gray-500">Aucun aperçu disponible</p>
//             )}
//             {rapportChoisi.imageRapport && (
//               <img src={rapportChoisi.imageRapport} className="absolute bottom-2 right-2 w-10 h-10 rounded-full object-cover border bg-white" />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailRapportAdmin;


import React, { useEffect, useState, useMemo } from "react";
import { FaFileAlt, FaDownload } from "react-icons/fa";
import { BiArrowBack, BiX } from 'react-icons/bi';
import { Document, Page } from 'react-pdf';
import mammoth from 'mammoth';

import { pdfjs } from 'react-pdf';
// 📌 Pour charger le worker depuis le CDN (évite les erreurs de chemin/mime)
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;

const DetailRapportAdmin = ({ rapportChoisi, onClick }) => {
  const [docHtml, setDocHtml] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [afficherWord, setAfficherWord] = useState(false);
  const [afficherPdf, setAfficherPdf] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadSuccess = ({ numPages: loadedPages }) => {
  if (numPages !== loadedPages) {
    setNumPages(loadedPages);
  }
};

  useEffect(() => {
    if (rapportChoisi && isDocx && rapportChoisi.fileUrl) {
      console.log("Chargement fichier Word :", rapportChoisi.fileUrl);

      const reader = new FileReader();

      reader.onload = function (event) {
        mammoth.convertToHtml({ arrayBuffer: event.target.result })
          .then(function (result) {
            setDocHtml(result.value);
          })
          .catch(function (err) {
            console.log(err);
          });
      };

      if (rapportChoisi.fichier) {
        fetch(rapportChoisi.fichier)
          .then(response => response.blob())
          .then(blob => reader.readAsArrayBuffer(blob));
      }
    }
  }, [rapportChoisi, isDocx]);

  if (!rapportChoisi) return null;

  return (
    <div className="relative">
      {/* Affichage Word */}
      {afficherWord && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 p-6 overflow-y-scroll">
          <button
            onClick={() => setAfficherWord(false)}
            className="absolute top-4 right-4 text-3xl text-gray-800"
          >
            <BiX />
          </button>
          <h2 className="text-xl font-bold mb-4">Contenu Word</h2>
          <div dangerouslySetInnerHTML={{ __html: docHtml }} className="prose max-w-none" />
        </div>
      )}

      {/* Affichage PDF */}
    {afficherPdf && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col items-center overflow-y-scroll p-6">
            <button
            onClick={() => setAfficherPdf(false)}
            className="absolute top-4 right-4 text-3xl text-gray-800"
            >
            <BiX />
            </button>

            <h2 className="text-xl font-bold mb-4 mt-6">Aperçu PDF</h2>

            <Document
            file={rapportChoisi.fichier}
            onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
                setCurrentPage(1); // Réinitialiser à la première page
            }}
            >
            <Page
                pageNumber={currentPage}
                width={800}
                renderTextLayer={false}
            />
            </Document>

            <div className="flex items-center justify-center mt-4 gap-4">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage <= 1}
                className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
            >
                Précédente
            </button>

            <span className="text-md text-gray-600">
                Page {currentPage} / {numPages}
            </span>

            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numPages))}
                disabled={currentPage >= numPages}
                className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
            >
                Suivante
            </button>
            </div>
        </div>
        )}



      {/* Vue principale */}
      <div className="flex justify-between gap-2 shadow rounded bg-white p-3 pt-5 relative">
        <div
          className="flex items-center absolute top-1 left-1 justify-center p-1 px-2 rounded-lg bg-gray-800 gap-2 text-amber-300 cursor-pointer z-5"
          onClick={onClick}
        >
          <BiArrowBack />
        </div>

        <div className="basis-2/3 w-full flex flex-col gap-2">
          <div className="flex gap-2 items-center border-b border-gray-800 pb-3">
            <div className="w-15 h-15 rounded-full relative bg-amber-200">
              <img
                src={rapportChoisi.userPhoto}
                alt="Photo de l'utilisateur"
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
              {isPdf && (
                <div
                  onClick={() => setAfficherPdf(true)}
                  className="flex items-center justify-center gap-2 p-3 px-6 rounded-lg bg-gray-800 text-amber-300 cursor-pointer"
                >
                  <FaFileAlt />
                  <span className="text-md">Voir PDF</span>
                </div>
              )}
              {isDocx && (
                <div
                  onClick={() => setAfficherWord(true)}
                  className="flex items-center justify-center gap-2 p-3 px-6 rounded-lg bg-gray-800 text-amber-300 cursor-pointer"
                >
                  <FaFileAlt />
                  <span className="text-md">Voir Word</span>
                </div>
              )}
              <div className="flex items-center justify-center gap-2 p-3 px-6 rounded-lg bg-gray-800 text-amber-300 cursor-pointer">
                <FaDownload />
                <a href={rapportChoisi.fichier} download className="text-md">Télécharger</a>
              </div>
            </div>
          </div>
        </div>

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
              <div className="doc-content" dangerouslySetInnerHTML={{ __html: docHtml }} />
            ) : (
              <p className="text-sm p-4 text-gray-500">Aucun fichier à afficher</p>
            )}

            <img
              src={rapportChoisi.imageRapport}
              alt="Image rapport"
              className="absolute z-2 w-10 h-10 rounded-3xl object-cover border bg-gray-800 bottom-2 right-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRapportAdmin;