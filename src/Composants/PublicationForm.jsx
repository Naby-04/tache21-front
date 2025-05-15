import React from 'react'
import { toast } from 'react-hot-toast'
import {usePublication } from '../Contexts/DashboardUser/UseContext'
import { categories } from '../data/Categorie'
import { useNavigate } from 'react-router-dom'

const PublicationForm = () => {
    const { form, setForm, fileInput, handleChange, addPublication } = usePublication();

const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
      
        const dataToSave = {
          id: Date.now(),
          title: form.title,
          description: form.description,
          img: URL.createObjectURL(form.file),
          type: form.file?.type || "",
          category: form.categories,
          tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
          createdAt: new Date().toISOString(),
        };
      
        console.log("type de document:", dataToSave.type);
        
        addPublication(dataToSave); // ajoute dans le contexte
      
        console.log("Publication ajoutée:", dataToSave);
        
        fileInput.current.value = "";
        toast.success("Publication ajoutée avec succès");
        setForm({ title: "", description: "", categories: "", tags: "", file: null });
        navigate("/users");
      };

  return (
    <div className='mx-auto my-4 p-4 sm:p-6 md:p-8 bg-[#fff] rounded
      w-full max-w-md sm:max-w-lg md:max-w-2xl
      lg:max-w-3xl shadow-xl'>
        <h2 className="text-center text-xl font-bold mb-6">Ajouter un Rapport</h2>

        <form className='space-y-4' onSubmit={handleSubmit}>
            <input type="text" placeholder='Titre' className="border rounded w-full p-2
             outline-none border-gray-800 placeholder:text-[12px]
             placeholder:text-gray-800 text-gray-800" value={form.title} name='title'
              onChange={handleChange} required/>

            <textarea name="description" id="" rows="4" className='border rounded w-full p-2 outline-none border-gray-800
             placeholder:text-gray-800 text-gray-800 placeholder:text-[12px]' 
             placeholder='Description' value={form.description} onChange={handleChange}></textarea>

           <select name="categories" className='border rounded w-full p-2 outline-none border-gray-800
             placeholder:text-gray-800 text-gray-800 placeholder:text-[12px]'
              value={form.categories} onChange={handleChange}>
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
               onChange={handleChange} multiple ref={fileInput}/>

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