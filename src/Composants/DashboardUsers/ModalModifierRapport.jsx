import { useState, useEffect } from "react";

const ModalModifierRapport = ({ rapport, onClose, onUpdateSuccess, url }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (rapport) {
      setTitle(rapport.title || "");
      setDescription(rapport.description || "");
    }
  }, [rapport]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { title, description };

    try {
      const response = await fetch(`${url}/rapport/updateUserRapport/${rapport._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erreur lors de la mise à jour");
      }

      console.log("Mise à jour réussie :", result.rapport);

      if (onUpdateSuccess) {
        onUpdateSuccess(result.rapport);
      }

      onClose(); // Fermer la modale

    } catch (error) {
      console.error("Erreur de modification :", error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] md:w-[500px]">
        <h2 className="text-xl font-bold mb-4">Modifier le rapport</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Titre</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Annuler
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalModifierRapport;
