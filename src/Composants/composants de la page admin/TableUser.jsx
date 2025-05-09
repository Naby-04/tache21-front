import React from "react";
import { MdMode } from "react-icons/md";
import { FaTrash } from "react-icons/fa";


const TableUser = ({tabUsers}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Listes des Utilisateurs</h2>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="bg-gray-800 text-gray-50 rounded">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">Nom</th>
                  <th className="py-2 px-3">Role</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tabUsers.map((tab, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-3 font-bold text-gray-600">
                      {tab.id}
                    </td>
                    <td className="py-2 px-3 flex items-center">
                      <img
                        src={tab.image}
                        alt="profil"
                        className="w-12 h-12 object-cover rounded"
                      />
                      <h4 className="font-semibold">{tab.name}</h4>
                    </td>
                    <td className="py-2 px-3">
                      <h4 className="font-semibold">{tab.role}</h4>
                    </td>
                    <td className="py-2 px-3">
                      <h4 className="font-semibold">{tab.jourInscripte}</h4>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => tab.onDetailClick()}
                          className="p-2 rounded bg-amber-200 text-amber-800 hover:bg-amber-400"
                        >
                          <MdMode />
                        </button>
                        <button
                          onClick={() => tab.onDeleteClick()}
                          className="p-2 rounded bg-red-100 text-red-700 hover:bg-red-200"
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
        </div>
  )
};

export default TableUser;