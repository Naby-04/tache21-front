import React, { useState } from "react";
import "../index.css";
import { LuUsers } from "react-icons/lu";
import { BsFillFileTextFill } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

import { Link, Route, Routes } from "react-router-dom";

import word from "../assets/word.jpg";
import pdf from "../assets/pdf.jpeg";
import avatar from "../assets/avatar.jpg"


import StatsBox from "../Composants/composants de la page admin/StatsBox";
import Image from "../assets/back1.jpg";
import Image2 from "../assets/back2.jpg";
import Image3 from "../assets/back3.jpg";
import Image4 from "../assets/back4.jpg";

import "./StylePerdo.css";

import SearchBar from "../Composants/composants de la page admin/SearchBar";
import TopRapports from "../Composants/composants de la page admin/TopRapports";
import BasicPie from "../Composants/composants de la page admin/Diagramme";
import Users from "./Users";
import RapportCard from "../Composants/composants de la page admin/RapportCard";


const rapports = [
  {
    rank: 1,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Informatique",
    nomUsers: "Ndeye Amie",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 2,
    imageRapport: pdf,
    titre: "Rapport de stage",
    description: "Stages passer à Volkeno....",
    descriptionLong: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Economie",
    nomUsers: "Snkr",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 3,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Pshycologie",
    nomUsers: "Binta Dia",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 4,
    imageRapport: pdf,
    titre: "Rapport de stage",
    description: "Stages passer à Volkeno....",
    descriptionLong: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Informatique",
    nomUsers: "Nafina",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 5,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Informatique",
    nomUsers: "Baba Faye",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 6,
    imageRapport: pdf,
    titre: "Rapport de stage",
    description: "Stages passer à Volkeno....",
    descriptionLong: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Agriculture",
    nomUsers: "Nabi dev",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 7,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Medecine",
    nomUsers: "Hamidou Ly",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  
];


const LesLiens = [
  {
    lien: "Dashboards",
    chemin: "/DashBordContent",
  },
  {
    lien: "Utilisateurs",
    chemin: "/Users",
  },
  {
    lien: "Rapports",
    chemin: "/AllRapports",
  }
]

const lesUtilisateurs = [
  {
      id: 1,
      name: 'Abdoul Wakhab',
      email: 'planimportant@gmail.com',
      role: 'admin',
      jourInscripte: '2024-12-01',
      image: avatar,
      onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
      id: 2,
      name: 'Ndeye Amy Thiam',
      email: 'thiam@gmail.com',
      role: 'utilisateur',
      jourInscripte: '2024-13-21',
      image: avatar,
      onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
      id: 3,
      name: 'Naby Dev',
      email: 'devTre@gmail.com',
      role: 'admin',
      jourInscripte: '2025-02-05',
      image: avatar,
      onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
      id: 4,
      name: 'Nafissatou',
      email: 'badji@gmail.com',
      role: 'utilisateur',
      jourInscripte: '2022-02-11',
      image: avatar,
      onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
      id: 5,
      name: 'Baba',
      email: 'faye@gmail.com',
      role: 'admin',
      jourInscripte: '2021-10-11',
      image: avatar,
      onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
      id: 6,
      name: 'Binta Dia',
      email: 'binta@gmail.com',
      role: 'admin',
      jourInscripte: '2021-02-13',
      image: avatar,
      onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
      id: 7,
      name: 'Hamidou',
      email: 'lyham@gmail.com',
      role: 'utilisateur',
      jourInscripte: '2025-01-16',
      image: avatar,
      onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
]


const Admin = () => {
  const [recherche, setRecherche] = useState("")
    const [filtreUser, setFiltreUser] = useState(lesUtilisateurs)

    const changement = (utile) => {
        setRecherche(utile)
        if(utile === "") {
            setFiltreUser(lesUtilisateurs)
        } else {
            const filtre = lesUtilisateurs.filter(lefiltre => lefiltre.name.toLowerCase().includes(utile.toLowerCase()))
            setFiltreUser(filtre)
        }
    }

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 flex flex-col static overflow-y-auto">

        <div className="flex p-2 rounded gap-2 items-center border-b border-amber-300">
          <div className="w-8 h-8 relative rounded-full bg-amber-300">
            <img
              src=""
              alt=""
              className="absolute w-full h-full object-cover rounded-full"
            />
          </div>
          <h4 className="text-white text-xl font-bold uppercase">Nom Projet</h4>
        </div>

        <div className="mt-10">
          <h5 className="text-amber-100">Dashbord</h5>
          <ul className="space-y-2">

            {LesLiens.map((lien, index) => (
              <Link to={lien.chemin}>
                <li className="flex py-3 mt-2 border-b-1 border-amber-200 gap-2" key={index}>
                  <span className="p-1 bg-amber-200"></span>
                  {lien.lien}
                </li>
              </Link>
            ))}

          </ul>
        </div>

        <div className="flex gap-2 items-center text-end mt-auto pt-6">
          <i className="p-2 bg-amber-50"></i>
          <p className="text-amber-200">Deconnexion</p>
        </div>
      </aside>

      {/* Main dashboard content */}
        <main className="flex-1 bg-gray-100 overflow-y-auto">

          <div className="flex items-center justify-evenly bg-white p-2 px-3 rounded shadow mb-6 sticky top-0 z-50">
            {/* Barre de recherche */}
            <div className="flex-1 mx-auto">
              <SearchBar onSearch={changement} />
            </div>

            {/* Profil */}
            <div className="flex items-center gap-1 flex-col-reverse">
              {/* <span className="text-gray-700 text-sm font-medium hidden sm:inline">
                Nom
              </span> */}
              <div className="w-10 h-10 rounded-full bg-amber-300 overflow-hidden border border-amber-600">
                <img src="" alt="Profil" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          
          <Routes>
            <Route path="/DashBordContent" element={
              <div>
              <div className="flex flex-col lg:flex-row gap-4 p-3">
              {/* ✅ Section 1 : 4 Cartes (grille dans une div) */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatsBox
                  titre="Utilisateurs"
                  image={Image}
                  pourcent="30"
                  icone={<LuUsers />}
                  valeur="200"
                />
                <StatsBox
                  titre="Rapports"
                  image={Image2}
                  pourcent="30"
                  icone={<BsFillFileTextFill />}
                  valeur="500"
                />
                <StatsBox
                  titre="Telechargement"
                  image={Image3}
                  pourcent="30"
                  icone={<FaFileDownload />}
                  valeur="67"
                />
                <StatsBox
                  titre="Top Rapports"
                  image={Image4}
                  pourcent="30"
                  icone={<FaDownload />}
                  valeur="700"
                />
              </div>

              {/* ✅ Section 2 : 1 Carte unique à côté */}
              <div className="w-full lg:w-1/3 flex-shrink-0">
                <div className="bg-white p-6 rounded shadow h-full">
                  <p className="text-gray-600 text-sm mb-3">Diagrammes</p>
                  <h3 className="text-lg font-semibold mb-4">Les Statistiques</h3>
                  <BasicPie />
                </div>
              </div>
            </div>
            
            <div className="p-3 w-full border-t"> 
              <TopRapports rapports={rapports} />
            </div>
            </div>
            } 
            />
            

            <Route path="/Users" element={
              <div>
                <div className="p-3 w-full border-t"> 
                  <Users lesUtilisateurs={filtreUser} />
                </div>
              </div>
            } />

            <Route path="/AllRapports" element={
              <div>
                <div className="p-3 w-full border-t">
                  <div className="grid grid-cols-1 sm:grid-cols-2 :lg-grid-cols-3 gap-3">
                    {rapports.map((ele) => (<RapportCard rapport={ele} key={ele.id}  />))}
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>
    </div>
  );
};

export default Admin;
