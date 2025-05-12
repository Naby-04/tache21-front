import { useEffect, useState } from "react";

export const CommentairesSection = ({ rapportId }) => {
	const [commentaires, setCommentaires] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fakeComments = [
			{ id: 1, auteur: "Ali", contenu: "Très bon rapport, merci !" },
			{ id: 2, auteur: "Fatou", contenu: "Super intéressant, j’ai appris beaucoup." },
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
						<li key={comment.id} className="text-sm text-gray-800 border-b pb-2">
							<strong>{comment.auteur} :</strong> {comment.contenu}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
