import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";

const TableUser = ({ tabUsers, onDelete }) => {
  // Gestion modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserReportsCount, setSelectedUserReportsCount] =
    useState(null);
  const { url } = usePublication();

  // useEffect(() => {
  //   if (!selectedUser) return;

  //   // On peut ajouter une vérification si les données sont déjà chargées
  //   if (selectedUserReportsCount !== null) return;

  //   const fetchRapportsByUser = async () => {
  //     try {
  //       const response = await fetch(
  //         `${url}/rapports/user/${selectedUser._id}`
  //       );
  //       if (!response.ok) return;
  //       const data = await response.json();
  //       setSelectedUserReportsCount(data.length);
  //     } catch (error) {
  //       console.error("Erreur:", error);
  //       setSelectedUserReportsCount(0);
  //     }
  //   };

  //   fetchRapportsByUser();
  // }, [selectedUser, url, selectedUserReportsCount]);

  // console.log(tabUsers)
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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
        <table className="w-full min-w-[500px] text-left text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-800 text-gray-50 rounded">
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Nom complet</th>
              <th className="py-2 px-3 hidden sm:table-cell">Email</th>
              <th className="py-2 px-3">Rôle</th>
              <th className="py-2 px-3 hidden md:table-cell">
                Date d'inscription
              </th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            ) : (
            currentUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className="border-t transition-color duration-200 hover:bg-gray-100"
                      >
                        <td className="py-2 px-3 font-bold text-gray-600">
                          {(currentPage - 1) * usersPerPage + index + 1}
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <img
                              src={user.photo || "/images/default-user.png"}
                              alt={user.prenom}
                              className="w-6 h-6 bg-amber-300 rounded-full object-cover flex-shrink-0 cursor-pointer"
                              onClick={() => setSelectedUser(user)}
                            />
                            <span className="truncate" title={user.prenom}>
                              {user.prenom}
                            </span>
                          </div>
                        </td>
                        <td
                          className="py-2 px-3 hidden sm:table-cell max-w-[150px] truncate"
                          title={user.email}
                        >
                          {user.email}
                        </td>
                        <td className="py-2 px-3">
                          {user.isAdmin ? "Administrateur" : "Utilisateur"}
                        </td>
                        <td
                          className="py-2 px-3 hidden md:table-cell"
                          title={new Date(user.createdAt).toLocaleString()}
                        >
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => {
                                setUserToDelete(user);
                                setShowModal(true);
                              }}
                              className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition text-[10px] cursor-pointer"
                              aria-label={`Supprimer ${user.prenom}`}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
            ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-4 items-center mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded hover:bg-gray-300 disabled:opacity-50 text-white"
          >
            {/* Grand écran : texte, petit écran : icône */}
            <span className="hidden sm:inline">Précédent</span>
            <FaChevronLeft className="sm:hidden" />
          </button>

          <span className="text-gray-600 text-sm sm:text-base">
            Page {currentPage} sur {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded hover:bg-gray-300 disabled:opacity-50 text-white"
          >
            {/* Grand écran : texte, petit écran : icône */}
            <span className="hidden sm:inline">Suivant</span>
            <FaChevronRight className="sm:hidden" />
          </button>
        </div>
      </div>

      {/* Modal de confirmation */}
      {showModal && userToDelete && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-sm w-full">
            <p className="text-lg font-semibold mb-2 text-red-600">
              Confirmation de suppression
            </p>
            <p className="text-sm text-gray-800 mb-4">
              Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
              <strong>{userToDelete.prenom}</strong> avec le mail{" "}
              <strong>{userToDelete.email}</strong> ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  onDelete(userToDelete._id);
                  setShowModal(false);
                  setUserToDelete(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setUserToDelete(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'informations utilisateur */}
      {selectedUser && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full relative">
            <button
              onClick={() => {
                setSelectedUser(null);
                setSelectedUserReportsCount(null);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Détails de l'utilisateur</h3>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedUser.photo || "/images/default-user.png"}
                alt={selectedUser.prenom}
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <p>
                  <strong>Nom Complet :</strong> {selectedUser.prenom}
                </p>
                <p>
                  <strong>Email :</strong> {selectedUser.email}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
              <p>
                <strong>Rôle :</strong>{" "}
                {selectedUser.isAdmin ? "Administrateur" : "Utilisateur"}
              </p>
              <p>
                <strong>Date d'inscription :</strong>{" "}
                {new Date(selectedUser.createdAt).toLocaleDateString()}
              </p>
              {/* <p>
                <strong>Nombre de rapports :</strong>{" "}
                {selectedUserReportsCount === 0
                  ? "Aucun rapport"
                  : selectedUserReportsCount || "Chargement..."}
              </p> */}
              {/* Ajoute d'autres champs si nécessaire */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableUser;
