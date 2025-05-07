import React from 'react'

const Profile = () => {

    const publiRapp =[
        {title: "Memoire portant sur la programmation", description: "Voici ma memoire qui resulte de la totalite de mon parcours universitaire sur la programmation", date: "10/02/2025"},
        {title: "Memoire portant sur la Medecine", description: "Voici ma memoire qui resulte de la totalite de mon parcours universitaire sur la Medecine", date: "10/03/2025"}
    ]

    const rapportDownload =[
        {title: "Memoire portant sur la Diplomatie",  date: "10/02/2025"},
        {title: "Memoire portant sur la Science juridique", date: "10/03/2025"}
    ]
    
  return (
    <div className='flex flex-col justify-center items-center mx-auto mt-10 p-4 md:p-8 bg-orange-50 gap-4'>
        <h1 className='text-center text-3xl text-amber-900 font-bold'>Profile</h1>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 mt-8 w-full">

            <div className="info border border-gray-300 rounded p-4 w-full">
                <h2 className='text-center text-xl font-bold text-amber-900 underline uppercase'>Informations personnelles</h2>
                <div className='grid lg:grid-cols-2 lg:gap-8 mt-6 text-xl'>
                    <p>Nom : <span className='font-semibold'>sall</span></p>
                    <p>Prenom : <span className='font-semibold'>Saliou</span></p>
                    <p>Date et lieu de naissance : <span className='font-semibold'>10/02/2003</span></p>
                    <p>Sexe : <span className='font-semibold'>Masculin</span></p>
                    <p>Email: <span className='font-semibold'>salljunior439@gmail.com</span></p>
                    <p>Mot de passe: <span className='font-semibold'>***********</span></p>
                </div>
            </div>

            <div className="info border border-gray-300 rounded p-4 w-full">
                <h2 className='text-center text-xl font-bold text-amber-900 underline uppercase'>Mes publications</h2>
                {publiRapp.map((rapp, index) => (
                    <div className='grid grid-cols-1 border border-gray-300 p-2 rounded gap-2 mt-6 text-xl' key={index}>
                        <p>Titre : <span className='font-semibold'>{rapp.title}</span></p>
                        <p>description : <span className='font-semibold'>{rapp.description}</span></p>
                        <p>Date : <span className='font-semibold'>{rapp.date}</span></p>
                    </div>
                ))}
            </div>


            <div className="info border border-gray-300 rounded p-4 w-full">
                <h2 className='text-center text-xl font-bold text-amber-900 underline uppercase'>Mes telechargements</h2>
                {rapportDownload.map((rapp, index) => (
                    <div className='grid grid-cols-1 border border-gray-300 p-2 rounded gap-2 mt-6 text-xl' key={index}>
                        <p>Titre : <span className='font-semibold'>{rapp.title}</span></p>
                        <p>Date : <span className='font-semibold'>{rapp.date}</span></p>
                    </div>
                ))}
            </div>
        </div>

        <div className="but mt-6 flex gap-8 w-full">
            <button className='border border-amber-800 font-semibold p-4 w-full hover:bg-amber-800 hover:text-white duration-300 transition-all rounded cursor-pointer'>Modifier le profile</button>
            <button className='border border-gray-800 font-semibold p-4 w-full rounded cursor-pointer hover:bg-gray-800 hover:text-white transition-all duration-300'>Fermer</button>
        </div>
      
    </div>
  )
}

export default Profile