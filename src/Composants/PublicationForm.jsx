import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

const PublicationForm = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault()

        setForm({
            title: "",
            tags: "",
            description: "",
            categories: "",
            file: null
        })

        fileInput.current.value = ""
        console.log(form)
        toast.success("Publication ajoutée avec succès")
    }

  return (
    <div className='mx-auto my-4 p-4 sm:p-6 md:p-8 bg-white rounded shadow-amber-100 w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl'>
        <h2 className="text-center text-xl font-bold mb-6 text-amber-700">Publier un memoire</h2>
        <form className='space-y-4' onSubmit={handleSubmit}>

            <input type="text" placeholder='Titre' className="border rounded w-full p-2 outline-none border-gray-300" value={form.title} name='title' onChange={handleChange} required/>

            <textarea name="description" id="" rows="4" className='border w-full rounded border-gray-300 p-2 outline-0 resize-none' placeholder='Description' value={form.description} onChange={handleChange}></textarea>

           <input type="text" name='categories' className='p-2 w-full border border-gray-300 rounded outline-0' placeholder='Entrez la categorie' required value={form.categories} onChange={handleChange}/>

            <input type="text" name='tags' placeholder='Entrez un/des tags separes par des virgules' className='w-full border border-gray-300 rounded p-2 outline-0' onChange={handleChange} value={form.tags} required/>

            <input type="file" name="file" accept='.pdf,.doc,.docx' required className='w-full border border-gray-300 p-2 text-center' onChange={handleChange} multiple ref={fileInput}/>

            <button className="w-full p-2 mt-10 text-center font-semibold border rounded border-amber-700 bg-transparent hover:bg-amber-900 transition-all duration-300 hover:text-white hover:font-bold">Ajouter</button>
        </form>
    </div>
  )
}

export default PublicationForm