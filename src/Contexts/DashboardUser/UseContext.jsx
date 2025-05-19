/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from "react";

const ContextPublication = createContext();

export const ContextProvider = ({ children }) => {
  const [publications, setPublications] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    category: "",
    file: null,
  });

  const fileInput = useRef();
  const url = "http://localhost:8080";

  // 🔁 Récupérer les publications au montage
//   useEffect(() => {
//     fetch(`${url}/rapport/getAll`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setPublications(data);
//         } else {
//           console.error("Données reçues invalides :", data);
//           setPublications([]); // fallback sécurisé
//         }
//       })
//       .catch((err) => {
//         console.error("Erreur lors de la récupération des rapports :", err);
//         setPublications([]);
//       });
//   }, []);

  // 🧠 Ajout d'une publication
  const addPublication = (newData) => {
    setPublications((prev) => [...prev, newData]);
    localStorage.setItem("publications", JSON.stringify([...publications, newData]));
  };

  // 🎯 Filtrage des publications
  const validPublications = Array.isArray(publications) ? publications : [];

  const filteredPublications = selectedCategory
    ? validPublications.filter((doc) => doc.category === selectedCategory)
    : validPublications;

  const filteredPublicationsBySearch = filteredPublications.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📝 Gestion des champs du formulaire
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const values = {
    form,
    setForm,
    fileInput,
    handleChange,
    addPublication,
    publications,
    setPublications,
    selectedCategory,
    setSelectedCategory,
    filteredPublications,
    searchTerm,
    setSearchTerm,
    filteredPublicationsBySearch,
    url,
  };

  return <ContextPublication.Provider value={values}>{children}</ContextPublication.Provider>;
};

export const usePublication = () => useContext(ContextPublication);
