import React from 'react'
import { toast } from 'react-hot-toast'
import {usePublication } from '../Contexts/DashboardUser/UseContext'
import { categories } from '../data/Categorie'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

const PublicationForm = () => {
    const { form, setForm, fileInput, handleChange, addPublication,url } = usePublication();

    const token = localStorage.getItem("token");
    console.log("token", token);
    
const navigate = useNavigate()
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("category", form.category);
  formData.append("tags", form.tags);
  formData.append("type", form.file.type)
  formData.append("fileUrl", form.file); // ✅ bon nom (correspond à upload.single("file"))

  try {
    const response = await fetch(`${url}/rapport/create`, {
      method: "POST",
      body: formData, // ✅ on envoie le bon format
       headers: {
    Authorization: `Bearer ${token}`, // si tu l’as dans le localStorage par exemple
  },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Erreur serveur : " + errorText);
    }

    const respo = await response.json();

    console.log("Réponse du backend :", respo);

    toast.success("Publication ajoutée avec succès");
    addPublication(respo.rapport); // ✅ récupère l'objet retourné
    setForm({ title: "", description: "", category: "", tags: "", file: null });
    fileInput.current.value = "";
    navigate("/users");

  } catch (error) {
    console.error("Erreur lors de l'ajout de la publication:", error);
    toast.error("Une erreur s'est produite lors de l'ajout.");
  }
};

console.log("fichier :", form.file);
  return (
    <div className='mx-auto my-4 p-4 sm:p-6 md:p-8 bg-[#fff] rounded
      w-full max-w-md sm:max-w-lg md:max-w-2xl
      lg:max-w-3xl shadow-xl'>
        <h2 className="text-center text-xl font-bold mb-6">Ajouter un Rapport</h2>

        <form className='space-y-4' onSubmit={handleSubmit} encType='multipart/form-data'>
            <input type="text" placeholder='Titre' className="border rounded w-full p-2
             outline-none border-gray-800 placeholder:text-[12px]
             placeholder:text-gray-800 text-gray-800" value={form.title} name='title'
              onChange={handleChange} required/>

            <textarea name="description" id="" rows="4" className='border rounded w-full p-2 outline-none border-gray-800
             placeholder:text-gray-800 text-gray-800 placeholder:text-[12px]' 
             placeholder='Description' value={form.description} onChange={handleChange}></textarea>

           <select name="category" className='border rounded w-full p-2 outline-none border-gray-800
             placeholder:text-gray-800 text-gray-800 placeholder:text-[12px]'
              value={form.category} onChange={handleChange}>
                <option value="" className='text-blue-950 text-[12px]'>Veuillez choisir une categorie</option>
                {categories.map((categorie,i) => (
                    <option key={i} value={categorie.value}
                     className='text-blue-950'>{categorie.label}
                     </option>
                ))}
                
           </select>

            <input type="text" name='tags' placeholder='Entrez un/des tags separes par des virgules'
             className='border rounded w-full p-2 outline-none border-gray-800
             placeholder:text-gray-800 text-gray-800 placeholder:text-[12px]'
              onChange={handleChange} value={form.tags} />

            <input type="file" name="file" accept='.pdf,.doc,.docx,.xls,.xlsx'
             required className='border rounded w-full p-2 outline-none border-gray-800
             placeholder:text-gray-800 text-gray-800 '
               onChange={handleChange}  ref={fileInput}/>

            <button className="border bg-gray-600 rounded w-full p-2 outline-none border-gray-800
             placeholder:text-white hover:opacity-80 text-white cursor-pointer" 
             onClick={handleSubmit}
             >
                Ajouter
                </button>
        </form>
    </div>
  )
}

export default PublicationForm