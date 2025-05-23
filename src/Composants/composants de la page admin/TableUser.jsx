import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const TableUser = ({ tabUsers, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = tabUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(tabUsers.length / usersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Liste des Utilisateurs</h2>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="bg-gray-800 text-gray-50 rounded">
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Prénom</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Rôle</th>
              <th className="py-2 px-3">Date d'inscription</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id} className="border-t">
                <td className="py-2 px-3 font-bold text-gray-600">
                  {(currentPage - 1) * usersPerPage + index + 1}
                </td>
                <td className="py-2 px-3">{user.prenom}</td>
                <td className="py-2 px-3">{user.email}</td>
                <td className="py-2 px-3">
                  {user.isAdmin ? "Administrateur" : "Utilisateur"}
                </td>
                <td className="py-2 px-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => onDelete(user._id)}
                    className="p-2 rounded bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-7 items-center mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-300 disabled:opacity-50 text-white"
          >
            Précédent
          </button>
          <span className="text-gray-600">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-300 disabled:opacity-50 text-white"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableUser;
