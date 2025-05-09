import { FaEye, FaTrash } from "react-icons/fa";

const TopRapports = ({ rapports }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Top Rapports</h2>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left min-w-[600px]">
          <thead>
           <tr className="bg-gray-800 text-gray-50 rounded">
             <th className="py-2 px-2">#</th>
             <th className="py-2 px-2">Rapport</th>
             <th className="py-2 px-2">Profil</th>
             <th className="py-2 px-2">Actions</th>
           </tr>
         </thead>
         
         <tbody>
         {rapports.map((rapport, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-3 font-bold text-gray-600">
                {rapport.rank}
              </td>
              <td className="py-2 px-3 flex items-center gap-3">
                <img
                  src={rapport.imageRapport}
                  alt="rapport"
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">{rapport.titre}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {rapport.description}
                  </p>
                </div>
              </td>
              <td className="py-2 px-3">
                <img
                  src={rapport.userPhoto}
                  alt="user"
                  className="w-10 h-10 rounded-full border"
                />
              </td>
              <td className="py-2 px-3 flex gap-2">
                <button
                  onClick={() => rapport.onDetailClick()}
                  className="p-2 rounded bg-purple-100 text-purple-700 hover:bg-purple-200"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => rapport.onDeleteClick()}
                  className="p-2 rounded bg-red-100 text-red-700 hover:bg-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        </table>
      </div>
    </div>


    // <div className="bg-white rounded-lg shadow-md p-4">
    //   <h2 className="text-xl font-semibold mb-4">Top Rapports</h2>
    //   <table className="w-full text-left">

    //     <thead>
    //       <tr className="bg-gray-800 text-gray-50 rounded">
    //         <th className="py-2 px-2">#</th>
    //         <th className="py-2 px-2">Rapport</th>
    //         <th className="py-2 px-2">Posté par</th>
    //         <th className="py-2 px-2">Actions</th>
    //       </tr>
    //     </thead>

    //     <tbody>
    //       {rapports.map((rapport, index) => (
    //         <tr key={index} className="border-t">
    //           <td className="py-2 px-3 font-bold text-gray-600">
    //             {rapport.rank}
    //           </td>
    //           <td className="py-2 px-3 flex items-center gap-3">
    //             <img
    //               src={rapport.imageRapport}
    //               alt="rapport"
    //               className="w-12 h-12 object-cover rounded"
    //             />
    //             <div>
    //               <h4 className="font-semibold">{rapport.titre}</h4>
    //               <p className="text-sm text-gray-500 line-clamp-2">
    //                 {rapport.description}
    //               </p>
    //             </div>
    //           </td>
    //           <td className="py-2 px-3">
    //             <img
    //               src={rapport.userPhoto}
    //               alt="user"
    //               className="w-10 h-10 rounded-full border"
    //             />
    //           </td>
    //           <td className="py-2 px-3 flex gap-2">
    //             <button
    //               onClick={() => rapport.onDetailClick()}
    //               className="p-2 rounded bg-purple-100 text-purple-700 hover:bg-purple-200"
    //             >
    //               <FaEye />
    //             </button>
    //             <button
    //               onClick={() => rapport.onDeleteClick()}
    //               className="p-2 rounded bg-red-100 text-red-700 hover:bg-red-200"
    //             >
    //               <FaTrash />
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
        
    //   </table>
    // </div>
  );
};

export default TopRapports;
