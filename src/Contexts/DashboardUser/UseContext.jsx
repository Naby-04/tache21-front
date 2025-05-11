/* eslint-disable react-refresh/only-export-components */
import { createContext,  useContext,  useRef,  useState } from "react";

const ContextPublication = createContext()
export const ContextProvider = ({children}) => {
     const [form, setForm] = useState({
            title: "",
            description:"",
            tags: "",
            categories: "",
            file: null
        })
         const fileInput = useRef()

         const handleChange = (e) => {
            const {name , value, file } = e.target
    
            setForm((prev => ({...prev, [name]: file ? file[0] : value})))
        }
    
        const values = {
            form,
            setForm,
            fileInput,
            handleChange
        }
    
    return <ContextPublication.Provider value={values}>{children}</ContextPublication.Provider>
}

export const usePublication = () => useContext(ContextPublication)