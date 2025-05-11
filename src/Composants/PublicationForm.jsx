import React from 'react'
import { toast } from 'react-hot-toast'
import {usePublication } from '../Contexts/DashboardUser/UseContext'

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
        const {name , value, files } = e.target

        setForm((prev => ({...prev, [name]: files ? files[0] : value})))
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
    <div className='mx-auto my-4 p-4 sm:p-6 md:p-8 bg-[#1E2939] rounded shadow-amber-100 w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl'>
        <h2 className="text-center text-xl font-bold mb-6 text-white">Publier un memoire</h2>
        <form className='space-y-4' onSubmit={handleSubmit}>

            <input type="text" placeholder='Titre' className="border rounded w-full p-2 outline-none border-gray-300 placeholder:text-white text-white" value={form.title} name='title' onChange={handleChange} required/>

            <textarea name="description" id="" rows="4" className='border w-full rounded border-gray-300 p-2 outline-0 placeholder:text-white text-white resize-none' placeholder='Description' value={form.description} onChange={handleChange}></textarea>

           <select name="categories" className='w-full border border-gray-300 rounded p-2 outline-0 placeholder:text-white text-white' value={form.categories} onChange={handleChange}>
                <option value="" className='text-blue-950'>Veuillez choisir une categorie</option>
                <option value="Medecine" className='text-blue-950'>Medecine</option>
                <option value="Informatique" className='text-blue-950'>Informatique</option>
                <option value="Astrologie" className='text-blue-950'>Astrologie</option>
           </select>

            <input type="text" name='tags' placeholder='Entrez un/des tags separes par des virgules' className='w-full placeholder:text-white text-white border border-gray-300 rounded p-2 outline-0' onChange={handleChange} value={form.tags} required/>

            <input type="file" name="file" accept='.pdf,.doc,.docx' required className='w-full border border-gray-300 placeholder:text-white text-white p-2 text-center' onChange={handleChange} multiple ref={fileInput}/>

            <button className="w-full p-2 mt-10 text-center font-semibold border rounded border-white bg-transparent hover:bg-white transition-all duration-300 hover:text-blue-950 text-white hover:font-bold">Ajouter</button>
        </form>
    </div>
  )
}

export default PublicationForm