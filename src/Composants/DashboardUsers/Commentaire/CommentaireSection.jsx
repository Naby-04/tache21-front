import { useEffect, useState } from "react";
import {RxDotsHorizontal} from "react-icons/rx"
import ModalComponent from "../../modalComponent";

export const CommentairesSection = ({ rapportId }) => {
	const [commentaires, setCommentaires] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedComment, setSelectedComment] = useState(false);

	
	useEffect(() => {
		const fakeComments = [
			{ id: 1, auteur: "Abdoul Wahab Diouf",
				 contenu: "Très bon rapport, merci !" ,
			},
			{ id: 2, auteur: "Ndeye Amie Thiam", contenu: "Super intéressant, j’ai appris beaucoup." },
		];
		setTimeout(() => {
			setCommentaires(fakeComments);
			setLoading(false);
		}, 500); // simulation chargement
	}, [rapportId]);

	if (loading) return <p className="text-sm text-gray-500 mt-2">Chargement des commentaires...</p>;

	return (
		<div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-inner">
			<h3 className="text-sm font-semibold text-gray-700 mb-3">Commentaires :</h3>
			{commentaires.length === 0 ? (
				<p className="text-sm text-gray-500">Aucun commentaire pour l’instant.</p>
			) : (
				<ul className="space-y-3">
					{commentaires.map((comment) => (
						<li key={comment.id} className="text-sm  flex gap-2 items-center">
							<div className="flex flex-col gap-1 bg-slate-200 rounded-xl p-3 pb-2">
							        <strong>{comment.auteur} !</strong> 
							<span>
								<small>{comment.contenu}</small>
								</span>
							</div>
							<div>
							<span className="text-gray-500 cursor-pointer ">
							        <RxDotsHorizontal className="text-xl rounded-full p-2 w-[40px] h-[40px]
									 hover:bg-gray-200 transition-all" 
									title="Options " onClick={() => setSelectedComment(comment)}/>
							 </span>

							</div>
							
						</li>
					))}
				</ul>
			)}

			{/* modal des options */}
			{selectedComment && (
                <ModalComponent
                isOpen={true}
                onClose={() => setSelectedComment(null)}
                title="Options du commentaire"
                message={` souhaitez-vous vraiment supprimer le commentaire ?`}
                confirmText="Supprimer"
                cancelText="Annuler"
                onConfirm={() => {
                  // ici, supprime le commentaire (ex: appel API ou simulation)
                  setCommentaires((prev) =>
               	 prev.filter((c) => c.id !== selectedComment.id)
                  );
                  setSelectedComment(null);
                }}
               />
			)}
		</div>
	);
};
