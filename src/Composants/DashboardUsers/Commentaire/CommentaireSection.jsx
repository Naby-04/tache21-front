import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import ModalComponent from "../../modalComponent";
import { jwtDecode } from "jwt-decode";

export const CommentairesSection = ({ rapportId }) => {
  const [commentaires, setCommentaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idCommentToDelete, setIdCommentToDelete] = useState(null);

  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id || decoded._id;
    } catch (e) {
      console.error("Erreur de décodage du token", e);
    }
  }

  const fetchCommentaires = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/comments/${rapportId}`);
      const data = await response.json();

      const commentairesFormates = data.map((comment) => ({
        id: comment._id,
        auteur: comment.user?.prenom || "Utilisateur inconnu",
        contenu: comment.comment,
        userId: comment.user?._id || null,
      }));

      setCommentaires(commentairesFormates);
    } catch (error) {
      console.error("Erreur lors du chargement des commentaires :", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rapportId) {
      fetchCommentaires();
    }
  }, [rapportId]);

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/comments/${idCommentToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || "Erreur lors de la suppression.");
        return;
      }

      setCommentaires((prev) => prev.filter((c) => c.id !== idCommentToDelete));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    } finally {
      setShowDeleteModal(false);
      setIdCommentToDelete(null);
    }
  };

  const askDeleteComment = (id) => {
    setIdCommentToDelete(id);
    setShowDeleteModal(true);
  };

  if (loading) {
    return <p className="text-sm text-gray-500 mt-2">Chargement des commentaires...</p>;
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
      {commentaires.length === 0 ? (
        <p className="text-sm text-gray-500">Aucun commentaire pour l’instant.</p>
      ) : (
        <ul className="space-y-3">
          {commentaires.map((comment) => (
            <li key={comment.id} className="text-sm flex gap-2 items-center">
              <div className="flex flex-col gap-1 bg-slate-200 rounded-xl p-3 pb-2">
                <strong>{comment.auteur}</strong>
                <span>
                  <small>{comment.contenu}</small>
                </span>
              </div>

              {comment.userId === userId && (
                <div>
                  <BsTrash
                    className="text-sm rounded-full p-2 w-[30px] h-[30px] hover:bg-gray-200 cursor-pointer border"
                    title="Supprimer"
                    onClick={() => askDeleteComment(comment.id)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

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
