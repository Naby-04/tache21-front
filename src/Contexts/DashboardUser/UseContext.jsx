/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useRef, useState } from "react";

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
  const [docHtml, setDocHtml] = useState(null);
  const [pdfError, setPdfError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  

  const fileInput = useRef();

   const url = "https://tache21-back.onrender.com";
  // const url ="http://localhost:8000"

  // 🧠 Ajout d'une publication
  const ajouterPublication = async (
    form,
    fileInput,
    token,
    toast,
    navigate
  ) => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("tags", form.tags);
    formData.append("type", form.file.type);

    formData.append("file", form.file);

    try {
      const response = await fetch(`${url}/rapport/create`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          Connection: "keep-alive",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Erreur serveur : " + errorText);
      }

      const res = await response.json();

      // ✅ Mettre à jour la liste directement ici
      setPublications((prev) => [res.rapport, ...prev]);
      toast.success("Publication ajoutée avec succès");

      // Reset formulaire
      setForm({
        title: "",
        description: "",
        category: "",
        tags: "",
        file: null,
      });
      fileInput.current.value = "";

      navigate("/users");
    } catch (error) {
      console.error("Erreur d'ajout :", error);
      toast.error("Erreur lors de l'ajout");
    }
  };

  // 🎯 Filtrage des publications
  const validPublications = Array.isArray(publications) ? publications : [];

  const filteredPublications = selectedCategory
    ? validPublications.filter((doc) => doc.category === selectedCategory)
    : validPublications;

  const filteredPublicationsBySearch = searchTerm.trim()
    ? filteredPublications.filter((doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredPublications;

  // 📝 Gestion des champs du formulaire
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const values = {form,setForm,fileInput,handleChange,publications,setPublications,selectedCategory,
    setSelectedCategory,filteredPublications,searchTerm,setSearchTerm,filteredPublicationsBySearch,url,
    docHtml,setDocHtml,pdfError,setPdfError,isLoading,setIsLoading,ajouterPublication
  };

  return (
    <ContextPublication.Provider value={values}>
      {children}
    </ContextPublication.Provider>
  );
};

export const usePublication = () => useContext(ContextPublication);
