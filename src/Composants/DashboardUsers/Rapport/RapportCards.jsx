import { FaCloudDownloadAlt, FaCommentAlt, FaEye } from "react-icons/fa";
import CommentModal  from "../Commentaire/CommentModal";
import { useState } from "react";
import TextExpandable from "../TextExpandable";
import { CommentairesSection } from "../Commentaire/CommentaireSection";

export const RapportCard = ({ doc }) => {
	const [showCommentBox, setShowCommentBox] = useState(false);
	const [showComments, setShowComments] = useState(false);

	const handleCommentSubmit = (comment) => {
		console.log("Commentaire:", comment, "pour:", doc.id);
		setShowCommentBox(false);
	};

	return (
		<div className="bg-white rounded-xl shadow-md p-5 w-full max-w-3xl mx-auto mb-6 transition hover:shadow-lg">
			{/* Auteur */}
			<div className="flex items-center gap-3 mb-3">
				<img
					src="../../../public/images/dev.jpg"
					alt="Auteur"
					className="w-10 h-10 rounded-full object-cover"
				/>
				<div>
					<p className="font-semibold text-sm text-gray-800">John Doe</p>
					<small className="text-gray-500">il y a 2 minutes</small>
				</div>
			</div>

			{/* Titre */}
			<h2 className="text-lg font-bold text-gray-900 mb-2">{doc.title}</h2>

			{/* Image */}
			<div className="rounded-md overflow-hidden mb-4">
				<img
					src={doc.img}
					alt={doc.title}
					className="w-full max-h-[300px] object-cover"
				/>
			</div>

			{/* Description */}
			<div className="text-sm text-gray-700 mb-4">
				<TextExpandable>{doc.description}</TextExpandable>
			</div>

			{/* Barre d’actions */}
			<div className="flex justify-around  md:justify-between items-center border-t pt-3 text-sm text-gray-600">
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
			{showComments && <div className="mt-4">
				<CommentairesSection rapportId={doc.id} />
				</div>
				}
		</div>
	);
};
