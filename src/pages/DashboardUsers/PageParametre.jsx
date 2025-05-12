import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PageParametresCompte = () => {
	const [userInfo, setUserInfo] = useState({
		name: "John Doe",
		email: "john@example.com",
		photo: "../../../public/images/dev.jpg",
	});

	const handleInputChange = (e) => {
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
	};

	const handleSave = () => {
		console.log("Infos enregistrées :", userInfo);
	};

	const navigate = useNavigate();
	return (
		<div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
			<button className="px-2 py-2 bg-gray-800 text-white rounded-lg cursor-pointer mb-6"
			 onClick={() => navigate("/users")}>Retour au dashboard</button>
			<h1 className="text-2xl font-bold text-gray-800 mb-6">Paramètres du compte</h1>

			<div className="mb-6 flex items-center gap-4">
				<img
					src={userInfo.photo}
					alt="profil"
					className="w-20 h-20 rounded-full object-cover border"
				/>
				<div>
					<label className="text-sm font-medium">Changer la photo</label>
					<input
						type="file"
						accept="image/*"
						className="block mt-1 text-sm text-gray-600"
					/>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<div>
					<label className="text-sm font-medium text-gray-700">Nom complet</label>
					<input
						type="text"
						name="name"
						value={userInfo.name}
						onChange={handleInputChange}
						className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
					/>
				</div>
				<div>
					<label className="text-sm font-medium text-gray-700">Adresse email</label>
					<input
						type="email"
						name="email"
						value={userInfo.email}
						onChange={handleInputChange}
						className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
					/>
				</div>
			</div>

			{/* Mot de passe */}
			<div className="mt-6">
				<label className="text-sm font-medium text-gray-700">Changer le mot de passe</label>
				<input
					type="password"
					name="newPassword"
				 placeholder="Nouveau mot de passe"
					className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
				/>
			</div>

			{/* Boutons */}
			<div className="mt-6 flex justify-between items-center">
				<button
					onClick={handleSave}
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
				>
					Enregistrer les modifications
				</button>
				<button className="text-red-500 hover:underline text-sm">
					Supprimer mon compte
				</button>
			</div>
		</div>
	);
};
