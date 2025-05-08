import React from "react";
import "../index.css";
import { LuUsers } from "react-icons/lu";
import { BsFillFileTextFill } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

// import Image from "../assets/back1.jpg";
// import Image2 from "../assets/back2.jpg";
// import Image3 from "../assets/back3.jpg";
// import Image4 from "../assets/back4.jpg";

import StatsBox from "../Composants/composants de la page admin/StatsBox";
import Image from '../assets/back1.jpg'
import Image2 from '../assets/back2.jpg'
import Image3 from '../assets/back3.jpg'
import Image4 from '../assets/back4.jpg'

import './StylePerdo.css'

import SearchBar from "../Composants/composants de la page admin/SearchBar";
// import Users from "./Users";
import TopRapports from "../Composants/composants de la page admin/TopRapports";

const Admin = () => {
  const rapports = [
    {
      rank: 1,
      imageRapport: "https://via.placeholder.com/50",
      titre: "Rapport Environnemental 2025",
      description: "Analyse des impacts climatiques...",
      userPhoto: "https://via.placeholder.com/40",
      onDetailClick: () => console.log("Voir détail rapport 1"),
      onDeleteClick: () => console.log("Supprimer rapport 1"),
    },
    {
      rank: 1,
      imageRapport: "https://via.placeholder.com/50",
      titre: "Rapport Environnemental 2025",
      description: "Analyse des impacts climatiques...",
      userPhoto: "https://via.placeholder.com/40",
      onDetailClick: () => console.log("Voir détail rapport 1"),
      onDeleteClick: () => console.log("Supprimer rapport 1"),
    },
    {
      rank: 1,
      imageRapport: "https://via.placeholder.com/50",
      titre: "Rapport Environnemental 2025",
      description: "Analyse des impacts climatiques...",
      userPhoto: "https://via.placeholder.com/40",
      onDetailClick: () => console.log("Voir détail rapport 1"),
      onDeleteClick: () => console.log("Supprimer rapport 1"),
    },
    {
      rank: 1,
      imageRapport: "https://via.placeholder.com/50",
      titre: "Rapport Environnemental 2025",
      description: "Analyse des impacts climatiques...",
      userPhoto: "https://via.placeholder.com/40",
      onDetailClick: () => console.log("Voir détail rapport 1"),
      onDeleteClick: () => console.log("Supprimer rapport 1"),
    },
    {
      rank: 1,
      imageRapport: "https://via.placeholder.com/50",
      titre: "Rapport Environnemental 2025",
      description: "Analyse des impacts climatiques...",
      userPhoto: "https://via.placeholder.com/40",
      onDetailClick: () => console.log("Voir détail rapport 1"),
      onDeleteClick: () => console.log("Supprimer rapport 1"),
    },
    {
      rank: 1,
      imageRapport: "https://via.placeholder.com/50",
      titre: "Rapport Environnemental 2025",
      description: "Analyse des impacts climatiques...",
      userPhoto: "https://via.placeholder.com/40",
      onDetailClick: () => console.log("Voir détail rapport 1"),
      onDeleteClick: () => console.log("Supprimer rapport 1"),
    },
    {
      rank: 1,
      imageRapport: "https://via.placeholder.com/50",
      titre: "Rapport Environnemental 2025",
      description: "Analyse des impacts climatiques...",
      userPhoto: "https://via.placeholder.com/40",
      onDetailClick: () => console.log("Voir détail rapport 1"),
      onDeleteClick: () => console.log("Supprimer rapport 1"),
    },
    // Tu peux ajouter d'autres rapports ici
  ];
  return (
    <div className="h-screen flex">
    {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-5 flex flex-col static overflow-y-auto">
          <div className="flex p-2 rounded gap-2 items-center bg-amber-900">
            <div className="w-8 h-8 relative rounded-full bg-amber-300">
              <img src="" alt="" className="absolute w-full h-full object-cover rounded-full" />
            </div>
            <h4 className="text-white text-xl font-bold uppercase">Admin</h4>
          </div>
          <div className="mt-10">
            <h5 className="text-amber-100">Dashbord</h5>
            <ul className="space-y-2">
              <li className="flex py-3 mt-2 border-b-1 border-amber-200 gap-2"><i className="p-1 bg-amber-200"></i><a href="#" className="block hover:text-gray-300">Dashboard</a></li>
              <li className="flex py-3 mt-2 border-b-1 border-amber-200 gap-2"><i className="p-1 bg-amber-200"></i><a href="#" className="block hover:text-gray-300">Utilisaateurs</a></li>
              <li className="flex py-3 mt-2 border-b-1 border-amber-200 gap-2"><i className="p-1 bg-amber-200"></i><a href="#" className="block hover:text-gray-300">Rapports</a></li>
            </ul>
          </div>
          <div className="mt-10">
            <h5 className="text-amber-100">Dashbord</h5>
            <ul className="space-y-2">
              <li className="flex py-3 mt-2 border-b-1 border-amber-200 gap-2"><i className="p-1 bg-amber-200"></i><a href="#" className="block hover:text-gray-300">Dashboard</a></li>
              <li className="flex py-3 mt-2 border-b-1 border-amber-200 gap-2"><i className="p-1 bg-amber-200"></i><a href="#" className="block hover:text-gray-300">Utilisaateurs</a></li>
              <li className="flex py-3 mt-2 border-b-1 border-amber-200 gap-2"><i className="p-1 bg-amber-200"></i><a href="#" className="block hover:text-gray-300">Rapports</a></li>
            </ul>
          </div>
  
          <div className="flex gap-2 items-center text-end mt-auto pt-6">
            <i className="p-2 bg-amber-50"></i>
            <p className="text-amber-200">Deconnexion</p>
          </div>
        </aside>
  
        {/* Main dashboard content */}
        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <div className="flex items-center justify-evenly bg-white p-2 px-3 rounded shadow mb-6">
              {/* Barre de recherche */}
              <div className="flex-1 mx-auto">
                <SearchBar />
              </div>
  
              {/* Profil */}
              <div className="flex items-center gap-3 ml-4 flex-col-reverse">
                <span className="text-gray-700 font-medium hidden sm:inline">Nom</span>
                <div className="w-10 h-10 rounded-full bg-amber-300 overflow-hidden">
                  <img
                    src=""
                    alt="Profil"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
          </div>
  
          <div className="flex flex-col lg:flex-row gap-4 p-3">
  
      {/* ✅ Section 1 : 4 Cartes (grille dans une div) */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatsBox titre="Utilisateurs" image={Image} pourcent="30" icone={<LuUsers />} valeur="200" />
        <StatsBox titre="Rapports" image={Image2} pourcent="30" icone={<BsFillFileTextFill />} valeur="500" />
        <StatsBox titre="Telechargement" image={Image3} pourcent="30" icone={<FaFileDownload />} valeur="67" />
        <StatsBox titre="Top Rapports" image={Image4} pourcent="30" icone={<FaDownload />} valeur="700" />
      </div>
  
      {/* ✅ Section 2 : 1 Carte unique à côté */}
      <div className="w-full lg:w-1/3 flex-shrink-0">
        <div className="bg-white p-6 rounded shadow h-full">
          <h3 className="text-lg font-semibold mb-2">Partie Diagramme</h3>
          <p className="text-gray-600 text-sm">
            Diagramme
          </p>
        </div>
      </div>
      </div>
      <div className="p-3 w-full border">
        <TopRapports rapports={rapports} />
      </div>
          
        </main>
      </div>  
  );
};

export default Admin;