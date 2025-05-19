import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PageParametresCompte = () => {
	const navigate = useNavigate();

	// Lecture initiale depuis le localStorage
	const getInitialUser = () => {
		const storedUser = localStorage.getItem("userInfo");
		if (storedUser) {
			return JSON.parse(storedUser);
		}
		// Valeurs par défaut pour un nouvel utilisateur
		return {
			name: "John Doe",
			email: "john@example.com",
			photo: "/images/dev.jpg", // image par défaut
		};
	};

	const [userInfo, setUserInfo] = useState(getInitialUser);

	const handleInputChange = (e) => {
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
	};

	const handlePhotoChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setUserInfo((prev) => ({ ...prev, photo: reader.result }));
			};
			reader.readAsDataURL(file); // conversion en base64
		}
	};

	const handleSave = () => {
  console.log("Infos enregistrées :", userInfo);
  localStorage.setItem("user", JSON.stringify(userInfo)); // Sauvegarde dans le localStorage
  alert("Modifications enregistrées !");
};


	return (
		<div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
			<button
				className="px-2 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg cursor-pointer mb-6"
				onClick={() => navigate("/users")}
			>
				Retour au dashboard
			</button>
			<h1 className="text-2xl font-bold text-gray-800 mb-6">Paramètres du compte</h1>

			<div className="mb-6 flex justify-between items-center gap-4">
				<img
					src={userInfo.photo}
					alt="profil"
					className="w-20 h-20 rounded-full object-cover border"
				/>
				<div>
					<label
						htmlFor="photo"
						className="text-sm  cursor-pointer bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
					>
						Modifier votre profil
					</label>
					<input
						type="file"
						accept="image/*"
						className=" mt-1 text-sm text-gray-600 hidden"
						id="photo"
						name="photo"
						onChange={handlePhotoChange}
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
					className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
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
