export const categoryColors = {
    "Informatique & Technologie": "bg-blue-100 text-blue-700",
    "Santé & Médecine": "bg-red-100 text-red-700",
    "Sciences Économiques": "bg-green-100 text-green-700",
    "Droit & Juridique": "bg-yellow-100 text-yellow-700",
    "Sciences Sociales": "bg-pink-100 text-pink-700",
    "Éducation & Pédagogie": "bg-purple-100 text-purple-700",
    "Géographie & Environnement": "bg-emerald-100 text-emerald-700",
    "Sciences Politiques": "bg-indigo-100 text-indigo-700",
    "Littérature & Linguistique": "bg-orange-100 text-orange-700",
    "Management & Marketing": "bg-teal-100 text-teal-700",
    "Agriculture & Agroalimentaire": "bg-lime-100 text-lime-700",
    "Architecture & Urbanisme": "bg-amber-100 text-amber-700",
    "Sciences Pures": "bg-cyan-100 text-cyan-700",
    "Histoire & Patrimoine": "bg-stone-100 text-stone-700",
    "Art & Culture": "bg-fuchsia-100 text-fuchsia-700",
    "Sport & Sciences du sport": "bg-sky-100 text-sky-700",
    "Transport & Logistique": "bg-zinc-100 text-zinc-700",
    "Tourisme & Hôtellerie": "bg-rose-100 text-rose-700",
    "autre": "bg-gray-200 text-gray-600",
  };

//   Fonction pour obtenir la couleur de la catégorie en fonction de son nom
  export const getCategoryColor = (category) => {
    return categoryColors[category];
  };
  