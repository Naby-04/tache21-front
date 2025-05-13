/* eslint-disable react-refresh/only-export-components */
import { createContext,  useContext,  useRef,  useState } from "react";

const ContextPublication = createContext()
export const ContextProvider = ({children}) => {
    const [publications, setPublications] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredPublications = selectedCategory
    ? publications.filter((doc) => doc.category === selectedCategory)
    : publications;
  
    const addPublication = (newData) => {
    setPublications((prev) => [...prev, newData]);
    };

     const [form, setForm] = useState({title: "",description:"",tags: "", categories: "",file: null})

         const fileInput = useRef()
         const handleChange = (e) => {
            const { name, value, files } = e.target;
            setForm((prev) => ({
              ...prev,
              [name]: files && files.length > 0 ? files[0] : value,
            }));
        }
    
        const values = {form,setForm,fileInput,handleChange,addPublication,publications
            ,setPublications,selectedCategory,setSelectedCategory,filteredPublications
        }
    
    return <ContextPublication.Provider value={values}>{children}</ContextPublication.Provider>
}

export const usePublication = () => useContext(ContextPublication)