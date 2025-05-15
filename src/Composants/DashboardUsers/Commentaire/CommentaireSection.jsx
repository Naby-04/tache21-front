import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import ModalComponent from "../../modalComponent";

export const CommentairesSection = ({ rapportId }) => {
  const [commentaires, setCommentaires] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pour la suppression
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idCommentToDelete, setIdCommentToDelete] = useState(null);

  // Ouvrir la confirmation de suppression
  const askDeleteComment = (id) => {
    setIdCommentToDelete(id);
    setShowDeleteModal(true);
  };

  // Confirmer la suppression
  const handleConfirmDelete = () => {
    setCommentaires((prev) => prev.filter((c) => c.id !== idCommentToDelete));
    setShowDeleteModal(false);
    setIdCommentToDelete(null);
  };

  useEffect(() => {
    const fakeComments = [
      {
        id: 1,
        auteur: "Abdoul Wahab Diouf",
        contenu: "Très bon rapport, merci !",
      },
      {
        id: 2,
        auteur: "Ndeye Amie Thiam",
        contenu: "Super intéressant, j’ai appris beaucoup.",
      },
      {
        id: 3,
        auteur: "Naffisatou Ndiaye",
        contenu: "Très bon rapport, merci !",
      },
    ];
    setTimeout(() => {
      setCommentaires(fakeComments);
      setLoading(false);
    }, 500);
  }, [rapportId]);

  if (loading)
    return <p className="text-sm text-gray-500 mt-2">Chargement des commentaires...</p>;

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-inner">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Commentaires :</h3>
      {commentaires.length === 0 ? (
        <p className="text-sm text-gray-500">Aucun commentaire pour l’instant.</p>
      ) : (
        <ul className="space-y-3">
          {commentaires.map((comment) => (
            <li key={comment.id} className="text-sm flex gap-2 items-center">
              <div className="flex flex-col gap-1 bg-slate-200 rounded-xl p-3 pb-2">
                <strong>{comment.auteur} !</strong>
                <span>
                  <small>{comment.contenu}</small>
                </span>
              </div>
              <div>
                <span className="text-gray-500 cursor-pointer">
                  <BsTrash
                    className="text-sm rounded-full p-2 w-[30px] h-[30px] hover:bg-gray-200 transition-all"
                    title="Supprimer"
                    onClick={() => askDeleteComment(comment.id)}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal de confirmation */}
      {showDeleteModal && (
        <ModalComponent
          isOpen={true}
          onClose={() => {
            setShowDeleteModal(false);
            setIdCommentToDelete(null);
          }}
          title="Supprimer ce commentaire ?"
          message="Cette action est irréversible. Voulez-vous continuer ?"
          confirmText="Supprimer"
          cancelText="Annuler"
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};
