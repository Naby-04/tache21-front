// import { useState } from "react";
// import { FaEye, FaTrash } from "react-icons/fa";

// const TopRapports = ({ rapports, onDetailClick, onDeleteClick }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentRapports = rapports.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(rapports.length / itemsPerPage);

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4">
//       <h2 className="text-xl font-semibold mb-4">Top Rapports</h2>

//       <div className="overflow-x-auto w-full">
//         <table className="w-full text-left min-w-[600px]">
//           <thead>
//             <tr className="bg-gray-800 text-gray-50 rounded">
//               <th className="py-2 px-2">#</th>
//               <th className="py-2 px-2">Rapport</th>
//               <th className="py-2 px-2">Profil</th>
//               <th className="py-2 px-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentRapports.map((rapport, index) => (
//               <tr key={rapport._id || index} className="border-t">
//                 <td className="py-2 px-3 font-bold text-gray-600">
//                   {(currentPage - 1) * itemsPerPage + index + 1}
//                 </td>
//                 <td className="py-2 px-3 flex items-center gap-3">
//                   <img
//                     src="https://via.placeholder.com/48"
//                     alt="rapport"
//                     className="w-12 h-12 object-cover rounded"
//                   />
//                   <div>
//                     <h4 className="font-semibold">{rapport.title}</h4>
//                     <p className="text-sm text-gray-500 line-clamp-2">
//                       {rapport.description}
//                     </p>
//                   </div>
//                 </td>
//                 <td className="py-2 px-3">
//                   <img
//                     src="https://via.placeholder.com/40"
//                     alt="user"
//                     className="w-10 h-10 rounded-full border"
//                   />
//                 </td>
//                 <td className="py-2 px-3 flex gap-2">
//                   <button
//                     onClick={() => onDetailClick && onDetailClick(rapport)}
//                     className="p-2 rounded bg-purple-100 text-purple-700 hover:bg-purple-200"
//                   >
//                     <FaEye />
//                   </button>
//                   <button
//                     onClick={() => onDeleteClick && onDeleteClick(rapport._id)}
//                     className="p-2 rounded bg-red-100 text-red-700 hover:bg-red-200"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4 gap-2">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50 text-white"
//         >
//           Précédent
//         </button>
//         <span className="px-3 py-1">
//           Page {currentPage} sur {totalPages}
//         </span>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50 text-white"
//         >
//           Suivant
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TopRapports;


// import { useState, useEffect } from "react";
// import { FaEye, FaTrash } from "react-icons/fa";
// import { Document, Page, pdfjs } from "react-pdf";
// import mammoth from "mammoth";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;

// const TopRapports = ({ rapports, onDetailClick, onDeleteClick }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [docxPreviews, setDocxPreviews] = useState({});
//   const itemsPerPage = 10;

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentRapports = rapports.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(rapports.length / itemsPerPage);

//   useEffect(() => {
//     currentRapports.forEach((rapport) => {
//       const isDocx = rapport.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

//       if (isDocx && !docxPreviews[rapport._id]) {
//         fetch(rapport.fileUrl)
//           .then(res => res.blob())
//           .then(blob => {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//               mammoth.convertToHtml({ arrayBuffer: e.target.result })
//                 .then(result => {
//                   setDocxPreviews(prev => ({
//                     ...prev,
//                     [rapport._id]: result.value,
//                   }));
//                 });
//             };
//             reader.readAsArrayBuffer(blob);
//           });
//       }
//     });
//   }, [currentRapports, docxPreviews]);

//   const renderPreview = (rapport) => {
//     const isPdf = rapport.type === "application/pdf";
//     const isDocx = rapport.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

//     if (isPdf) {
//       return (
//         <div className="w-18 h-15 overflow-hidden bg-gray-200">
//           <Document file={rapport.fileUrl}>
//             <Page pageNumber={1} width={100} renderTextLayer={false} />
//           </Document>
//         </div>
//       );
//     } else if (isDocx) {
//       return (
//         <div
//           className="w-12 h-12 overflow-hidden text-xs bg-white border rounded p-1"
//           dangerouslySetInnerHTML={{
//             __html: docxPreviews[rapport._id]?.substring(0, 200) || "<p>Chargement...</p>",
//           }}
//         />
//       );
//     } else {
//       return (
//         <img
//           src={rapport.imageRapport || "https://via.placeholder.com/48"}
//           alt="rapport"
//           className="w-12 h-12 object-cover rounded"
//         />
//       );
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4">
//       <h2 className="text-xl font-semibold mb-4">Top Rapports</h2>

//       <div className="overflow-x-auto w-full">
//         <table className="w-full text-left min-w-[600px]">
//           <thead>
//             <tr className="bg-gray-800 text-gray-50 rounded">
//               <th className="py-2 px-2">#</th>
//               <th className="py-2 px-2">Rapport</th>
//               <th className="py-2 px-2">Profil</th>
//               <th className="py-2 px-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentRapports.map((rapport, index) => (
//               <tr key={rapport._id || index} className="border-t">
//                 <td className="py-2 px-3 font-bold text-gray-600">
//                   {(currentPage - 1) * itemsPerPage + index + 1}
//                 </td>
//                 <td className="py-2 px-3 flex items-center gap-3">
//                   {renderPreview(rapport)}
//                   <div>
//                     <h4 className="font-semibold">{rapport.title}</h4>
//                     <p className="text-sm text-gray-500 line-clamp-2">
//                       {rapport.description}
//                     </p>
//                   </div>
//                 </td>
//                 <td className="py-2 px-3">
//                   <img
//                     src={rapport.user?.photoURL || "https://via.placeholder.com/40"}
//                     alt="user"
//                     className="w-10 h-10 rounded-full border"
//                   />
//                 </td>
//                 <td className="py-2 px-3 flex gap-2">
//                   <button
//                     onClick={() => onDetailClick && onDetailClick(rapport)}
//                     className="p-2 rounded bg-purple-100 text-purple-700 hover:bg-purple-200"
//                   >
//                     <FaEye />
//                   </button>
//                   <button
//                     onClick={() => onDeleteClick && onDeleteClick(rapport._id)}
//                     className="p-2 rounded bg-red-100 text-red-700 hover:bg-red-200"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4 gap-2">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50 text-white"
//         >
//           Précédent
//         </button>
//         <span className="px-3 py-1">
//           Page {currentPage} sur {totalPages}
//         </span>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50 text-white"
//         >
//           Suivant
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TopRapports;


import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import mammoth from "mammoth";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;

const TopRapports = ({ rapports, onDetailClick, onDeleteClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [docxPreviews, setDocxPreviews] = useState({});
  const itemsPerPage = 10;

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRapports = rapports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rapports.length / itemsPerPage);

  useEffect(() => {
    currentRapports.forEach((rapport) => {
      const isDocx = rapport.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      if (isDocx && !docxPreviews[rapport._id]) {
        fetch(rapport.fileUrl)
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
      <div className="w-16 h-20 bg-gray-200 rounded overflow-hidden flex items-center justify-center border shadow">
        {isPdf ? (
          <Document file={rapport.fileUrl}>
            <Page pageNumber={1} width={128} renderTextLayer={false} />
          </Document>
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
      <h2 className="text-xl font-semibold mb-4">Top Rapports</h2>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="bg-gray-800 text-gray-50">
              <th className="py-2 px-2">#</th>
              <th className="py-2 px-2">Rapport</th>
              <th className="py-2 px-2">Profil</th>
              <th className="py-2 px-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentRapports.map((rapport, index) => (
              <tr key={rapport._id || index} className="border-t">
                <td className="py-2 px-3 font-bold text-gray-600">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                {/* <td className="py-2 px-3 flex items-center gap-3">
                  {renderPreview(rapport)}
                  <div className="w-100">
                    <h4 className="font-semibold">{rapport.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {rapport.description}
                    </p>
                  </div>
                </td> */}
                <td className="py-2 px-3">
                  <div className="flex items-center gap-3">
                    {renderPreview(rapport)}

                    {/* Titre + description : maintenant prend tout l'espace restant */}
                    <div className="flex-1">
                      <h4 className="font-semibold">{rapport.title}</h4>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {rapport.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-3">
                  <img
                    src={rapport.user?.photoURL || "https://via.placeholder.com/40"}
                    alt="user"
                    className="w-10 h-10 rounded-full border"
                  />
                </td>
                <td className="py-2 px-3">
                  <div className="flex items-center justify-center">
                    {/* <button
                      onClick={() => onDetailClick && onDetailClick(rapport)}
                      className="p-2 rounded bg-purple-100 text-purple-700 hover:bg-purple-200 flex items-center justify-center"
                    >
                      <FaEye />
                    </button> */}
                    <button
                      onClick={() => onDeleteClick && onDeleteClick(rapport._id)}
                      className="p-2 rounded bg-red-100 text-red-700 hover:bg-red-200 flex items-center justify-center"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
    </div>
  );
};

export default TopRapports;
