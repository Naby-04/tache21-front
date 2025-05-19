/* eslint-disable react-refresh/only-export-components */
import { createContext,  useContext,  useRef,  useState } from "react";

const ContextPublication = createContext()
export const ContextProvider = ({children}) => {
    const [publications, setPublications] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPublications = selectedCategory
    ? publications.filter((doc) => doc.category === selectedCategory)
    : publications;

    const filteredPublicationsBySearch = filteredPublications.filter((doc) => doc.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
    const addPublication = (newData) => {
    setPublications((prev) => [...prev, newData]);
    localStorage.setItem("publications", JSON.stringify([...publications, newData]));
    };

    

    // formulaire de publication rapport
    const [form, setForm] = useState({title: "",description:"",
        tags: "", category: "",file: null})

    // reference de l'input de fichier
         const fileInput = useRef()
         const handleChange = (e) => {
            const { name, value, files } = e.target;
            setForm((prev) => ({
              ...prev,
              [name]: files && files.length > 0 ? files[0] : value,
            }));
        }
    
        const url = "http://localhost:8080";

        const values = {form,setForm,fileInput,handleChange,addPublication,publications
            ,setPublications,selectedCategory,setSelectedCategory,filteredPublications,
            searchTerm,setSearchTerm,filteredPublicationsBySearch,url
            
        }
    
    return <ContextPublication.Provider value={values}>{children}</ContextPublication.Provider>
}

export const usePublication = () => useContext(ContextPublication)