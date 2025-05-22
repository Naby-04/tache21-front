import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import ModalComponent from "../../modalComponent";
import CommentModal from "./CommentModal";

export const CommentairesSection = ({ rapportId }) => {
  const [commentaires, setCommentaires] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pour la suppression
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idCommentToDelete, setIdCommentToDelete] = useState(null);
  console.log("rapportId :", rapportId);

  const fetchCommentaires = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://tache21-back.onrender.com/api/comments/${rapportId}`
      );
      const data = await response.json();

      console.log("Données brutes reçues :", data);
      const commentairesFormates = data.map((comment) => ({
        id: comment._id,
        auteur: comment.user?.prenom || "Utilisateur inconnu",
        contenu: comment.comment,
      }));

      console.log("Commentaires formatés :", commentairesFormates);
      setCommentaires(commentairesFormates);
    } catch (error) {
      console.error("Erreur lors du chargement des commentaires :", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Commentaires à afficher :", commentaires);


  useEffect(() => {
    if (rapportId) {
      fetchCommentaires();
    }
  }, [rapportId]);

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `https://tache21-back.onrender.com/api/comments/${idCommentToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCommentaires((prev) =>
        prev.filter((c) => c.id !== idCommentToDelete)
      );
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

const handleAddComment = async (value) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://tache21-back.onrender.com/api/comments/${rapportId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: value }),
      }
    );

    if (!res.ok) {
      console.error("Erreur lors de l’ajout du commentaire");
      return;
    }

    await fetchCommentaires(); // Recharge les commentaires
  } catch (error) {
    console.error("Erreur ajout commentaire :", error);
  }
};


  if (loading) {
    return (
      <p className="text-sm text-gray-500 mt-2">
        Chargement des commentaires...
      </p>
    );
  }

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-inner">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Commentaires :
      </h3>

      <CommentModal
        onClose={() => {}}
        onSubmit={handleAddComment}
        reloadComments={fetchCommentaires}
      />

      {commentaires.length === 0 ? (
        <p className="text-sm text-gray-500">
          Aucun commentaire pour l’instant.
        </p>
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
              <div>
                <span className="text-gray-500 cursor-pointer border">
                  <BsTrash
                    className="text-sm rounded-full p-2 w-[30px] h-[30px] hover:bg-gray-200 transition-all border"
                    title="Supprimer"
                    onClick={() => askDeleteComment(comment.id)}
                  />
                </span>
              </div>
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
