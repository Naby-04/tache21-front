import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { usePublication } from "../Contexts/DashboardUser/UseContext";
import { categories } from "../data/Categorie";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { IoCloudUploadSharp } from "react-icons/io5";
// import axios from 'axios'

const PublicationForm = () => {
  const { form, fileInput, handleChange, ajouterPublication } =
    usePublication();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  console.log("token", token);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(form.title === "" || form.description === "" || form.category === ""  || form.file === null){
      toast.error("Veuillez remplir tous les champs");
      return
    }


    setLoading(true);
    await ajouterPublication(form, fileInput, token, toast, navigate);
    setLoading(true);
  };
  console.log("fichier :", form.file);
  return (
    <div
      className="mx-auto my-4 p-4 sm:p-6 md:p-8 bg-[#fff] rounded
      w-full max-w-md sm:max-w-lg md:max-w-2xl
      lg:max-w-3xl shadow-xl"
    >
      <h2 className="text-center text-xl font-bold mb-6">Ajouter un Rapport</h2>

      <form
        className="space-y-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Titre"
          className="border rounded w-full p-2
             outline-none border-gray-800 placeholder:text-[12px]
             placeholder:text-gray-800 text-gray-800"
          value={form.title}
          name="title"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          id="rapportDescription"
          rows="4"
          className="border rounded w-full p-2 outline-none border-gray-800
             placeholder:text-gray-800 text-gray-800 placeholder:text-[12px]"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        ></textarea>

           <select name="category" className='border rounded w-full p-2 outline-none border-gray-800
             placeholder:text-gray-800 text-gray-800 placeholder:text-[12px]'
              value={form.category} onChange={handleChange}>
                <option value="" className='text-blue-950 text-[12px]'>Veuillez choisir une catégorie</option>
                {categories.map((categorie,i) => (
                    <option key={i} value={categorie.value}
                     className='text-blue-950'>{categorie.label}
                     </option>
                ))}
                
           </select>

        <input
          type="text"
          name="tags"
          placeholder="Entrez un/des tags separes par des virgules"
          className="border rounded w-full p-2 outline-none border-gray-800
             placeholder:text-gray-800 text-gray-800 placeholder:text-[12px]"
          onChange={handleChange}
          value={form.tags}
        />
   
        <input
          type="file"
          name="file"
          id="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          required
          className="border rounded w-full p-2 outline-none border-gray-800
             placeholder:text-gray-800 text-gray-800 hidden"
          onChange={handleChange}
          ref={fileInput}
        />
        <label htmlFor="file" className="border-1 flex justify-center rounded w-full p-2 outline-none
         border-gray-800 mb-2 cursor-pointer">
          <IoCloudUploadSharp size={30} className="text-amber-500"/>
        </label>

        {form.file && (
          <p className="text-gray-800 ">{form.file.name}</p>
        )}  


        <button
          className="border bg-amber-500 rounded w-full p-2 outline-none 
             placeholder:text-white hover:opacity-80 text-white cursor-pointer"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#fff" size={20} />
          ) : (
            "Ajouter"
          )}
        </button>
      </form>
    </div>
  );
};

export default PublicationForm;
