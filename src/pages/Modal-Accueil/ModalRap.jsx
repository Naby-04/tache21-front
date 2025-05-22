// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import ModalInscriptionInvite from './ModalInscriptionInvite';

// function ModalRap() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedRapport, setSelectedRapport] = useState(null);

//     const handleVoirPdfClick = (event, rapport) => {
//         event.preventDefault();
//         setSelectedRapport(rapport);
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setSelectedRapport(null);
//     };

//     const topRapports = [
//         { id: 1, title: "Mémoire sur l'IA et l'éducation", link: '/path/to/full-report-1.pdf' },
//         { id: 2, title: 'Rapport de stage - Marketing digital', link: '/path/to/full-report-2.pdf' },
//         { id: 3, title: "Mémoire sur l'IA et l'éducation", link: '/path/to/full-report-3.pdf' },
//     ];

//     return (
//         <div>
//             <section className="py-8">
//                 <h2 className="text-2xl font-semibold mb-4">Top rapports</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {topRapports.map((rapport) => (
//                         <div key={rapport.id} className="bg-white rounded-md shadow-md p-4">
//                             <div className="flex justify-center items-center h-20 mb-2">
//                                 {rapport.title.includes('PDF') ? (
//                                     <div className="border border-red-500 text-red-500 rounded-md w-12 h-12 flex justify-center items-center font-bold text-lg">
//                                         PDF
//                                     </div>
//                                 ) : (
//                                     <div className="border border-blue-500 text-blue-500 rounded-md w-12 h-12 flex justify-center items-center font-bold text-lg">
//                                         W
//                                     </div>
//                                 )}
//                             </div>
//                             <h3 className="text-sm font-semibold mb-1">{rapport.title}</h3>
//                             <p className="text-xs text-gray-600 mb-2">
//                                 Étude sur l'impact de l'intelligence artificielle dans le secteur éducatif.
//                             </p>
//                             <p className="text-xs text-gray-600 mb-2">
//                                 Expérience dans une agence de communication digitale.
//                             </p>
//                             <p>
//                                 <Link
//                                     to=""
//                                     className="text-blue-500 hover:underline text-xs font-semibold"
//                                     onClick={(e) => handleVoirPdfClick(e, rapport)}
//                                 >
//                                     Voir le pdf
//                                 </Link>
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {isModalOpen && (
//                 <ModalInscriptionInvite
//                     rapport={selectedRapport}
//                     onClose={handleCloseModal}
//                 />
//             )}
//         </div>
//     );
// }

// export default ModalRap;
