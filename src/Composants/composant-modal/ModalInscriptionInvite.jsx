// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ModalInscriptionInvite = ({ rapport, onClose }) => {
//     const navigate = useNavigate();

//     if (!rapport) return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
//                 <h2 className="text-lg font-bold mb-4 text-gray-800">
//                     Inscription requise
//                 </h2>
//                 <p className="mb-6 text-sm text-gray-600">
//                     Vous devez être inscrit pour consulter le rapport :<br />
//                     <span className="italic font-medium">{rapport.title}</span>
//                 </p>
//                 <div className="flex justify-end gap-4">
//                     <button
//                         onClick={() => navigate('/inscription')}
//                         className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
//                     >
//                         S’inscrire
//                     </button>
//                     <button
//                         onClick={onClose}
//                         className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
//                     >
//                         Fermer
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ModalInscriptionInvite;
