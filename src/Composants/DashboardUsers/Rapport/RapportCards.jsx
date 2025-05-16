import { FaCloudDownloadAlt, FaCommentAlt, FaEye  } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import CommentModal  from "../Commentaire/CommentModal";
import {useState } from "react";
import TextExpandable from "../TextExpandable";
import { CommentairesSection } from "../Commentaire/CommentaireSection";
import { categories } from "../../../data/Categorie";
import ModalComponent from "../../modalComponent";

export const RapportCard = ({ doc }) => {

	// pour voir le formulaire de commentaire
	const [showCommentBox, setShowCommentBox] = useState(false);

	// pour voir les commentaires 
	const [showComments, setShowComments] = useState(false);

	// pour stocker lescommentaires locaux
	const [commentaires, setCommentaires] = useState([]);


	const handleCommentSubmit = (comment) => {
  const nouveauCommentaire = {
    id: Date.now(), // ID unique temporaire
    contenu: comment,
    auteur: "Abdoul Wakhab Diouf", // tu peux changer selon ton système
    date: new Date().toLocaleString(),
  };

  setCommentaires((prev) => [nouveauCommentaire, ...prev]); // on ajoute en haut
  setShowCommentBox(false); // on ferme la boîte
};


	const currentCategory = categories.find((cat) => cat.value === doc.category);
	const categoryClass = currentCategory?.color 
    // console.log("Toutes les values possibles :", categories.map(c => c.value));

	// conversion des tags en tableau
	const TagsArray = Array.isArray(doc.tags) ? doc.tags : doc.tags.split(",");


	// gestion de la suppression 

	const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);


	const handleDeleteComment = (idCommentaire) => {
  setCommentToDelete(idCommentaire);
  setShowDeleteModal(true);
};

const confirmDeleteComment = () => {
  setCommentaires((prevCommentaires) =>
    prevCommentaires.filter((c) => c.id !== commentToDelete)
  );
  setShowDeleteModal(false);
  setCommentToDelete(null);
};



	
	return (
		<div className="bg-white rounded-xl shadow-md p-5 w-full max-w-3xl mx-auto mb-6 transition hover:shadow-lg">
			{/* Auteur */}
			<div className="flex items-center gap-3 mb-3">
				<img
					src="/images/dev.jpg"
					alt="Auteur"
					className="w-10 h-10 rounded-full object-cover"
				/>
				<div>
					<p className="font-semibold text-sm text-gray-800">John Doe</p>
					<p>
						<span>Publié le: </span>
					    <small className="text-gray-500">  {doc.createdAt}</small>

					</p>
				</div>
			</div>

			{/* Titre */}
			<h2 className="text-lg font-bold text-gray-900 mb-2">{doc.title}</h2>
			{/* Categories	 */}
			<div className="mb-4">
					<strong>Categories:</strong> <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-md mb-2 ${categoryClass}`}>
						{doc.category}
						</span>
			</div>

			{/* Image */}
			<div className="rounded-md overflow-hidden mb-4 opacity-80 cursor-pointer">
			     {doc.type === "application/pdf" ? (
                  <img
                    src="/images/pdf.jpeg"
                    alt="Aperçu PDF"
                    className="w-full max-h-[200px] object-cover"
                  />
                   ) : doc.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                   <img
                     src="/images/word.jpg"
                     alt="Aperçu Word"
                     className="w-full max-h-[300px] object-cover"
                   />
                   ) : (
                   <img
                     src={doc.img}
                     alt={doc.title}
                     className="w-full max-h-[300px] object-cover"
                   />
                 )}
			 
			</div>

			{/* Description */}
			<div className="text-sm text-gray-700 mb-4">
				<TextExpandable>{doc.description}</TextExpandable>
			</div>

			{/* Tags */}
			<div className="mb-4">
				<strong>Tags:</strong>
				{TagsArray.length > 0 ? (
              <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
                {TagsArray.map((tag, i) => (
                  <span key={i} className="bg-gray-200 px-2 py-1 rounded-full">#{tag}</span>
                ))}
              </div>
            ) : (
			  <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
				<span className="bg-gray-200 px-2 py-1 rounded-full">Aucun tag</span>
				</div>)}
			</div>
            

			{/* Barre d’actions */}
			<div className="flex mt-3 justify-around  md:justify-between items-center border-t pt-3 text-sm text-gray-600">
				<button
					onClick={() => setShowCommentBox(!showCommentBox)}
					className="flex items-center gap-2 hover:text-blue-600 transition"
				>
					<FaCommentAlt />
					<span className=" hidden md:block">Commenter</span>
				</button>

				<button className="flex items-center gap-2 hover:text-blue-600 transition" 
				onClick={() => setShowComments(!showComments)}>
					<FaEye />
					<span className=" hidden md:block">
						{showComments ? "Masquer Commentaires" : "Afficher Commentaires"}
					</span>
				</button>

				<button className="flex items-center gap-2 hover:text-blue-600 transition">
					<FaCloudDownloadAlt />
					<span className=" hidden md:block">Télécharger</span>
				</button>
			</div>


			{showCommentBox && (
				<div className="mt-4">
					<CommentModal
						isOpen={true}
						onClose={() => setShowCommentBox(false)}
						onSubmit={(comment) => handleCommentSubmit(comment)}
						documentId={doc.id}
					/>
				</div>
			)}

			{/* Section Commentaires */}
			{/* j'ai commenter pour que apres l'on puisse aller chercher le commentaire au niveau de l'api pour celui qui vas s'en charger */}
			{/* ======================================= */}
			{/* {showComments && <div className="mt-4">
				<CommentairesSection rapportId={doc.id} />
				</div>
				} */}
				{/* ======================================= */}
				{showComments && (
  <div className="mt-4">
    <div className="space-y-4">
      {commentaires.length === 0 ? (
        <p className="text-gray-500 text-sm">Aucun commentaire pour le moment.</p>
      ) : (
        commentaires.map((c) => (
          <div key={c.id} className="bg-gray-100 p-3 rounded-md shadow-sm relative">
            <p className="text-sm text-gray-800 font-semibold">{c.auteur}</p>
            <p className="text-gray-700 text-sm">{c.contenu}</p>
            <p className="text-gray-400 text-xs">{c.date}</p>
						{/* BOUTON SUPPRIMER */}
            <button
              className="absolute top-2 right-2 text-red-500 text-xs hover:underline"
              onClick={() => handleDeleteComment(c.id)}
            >
              <BsTrash className="mt-5 text-black hover:text-red-700" size="20px"/>
            </button>
          </div>
        ))
      )}
    </div>
  </div>
)}

{/* modal pour la confirmation de suppression */}

<ModalComponent
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  title="Supprimer le commentaire ?"
  message="Voulez-vous vraiment supprimer ce commentaire ? Cette action est irréversible."
  confirmText="Supprimer"
  cancelText="Annuler"
  onConfirm={confirmDeleteComment}
/>


		</div>
	);
};
