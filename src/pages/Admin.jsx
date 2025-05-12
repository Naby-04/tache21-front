import React, { useState } from "react";
import "../index.css";

import word from "../assets/word.jpg";
import pdf from "../assets/pdf.jpeg";
import avatar from "../assets/avatar.jpg";

import "./StylePerdo.css";

import Users from "./Users";
import RapportCard from "../Composants/composants de la page admin/RapportCard";
import SidebarAdmin from "../Composants/composants de la page admin/SidebarAdmin";
import HeaderAdmin from "../Composants/composants de la page admin/HeaderAdmin";
import DashboardContenu from "../Composants/composants de la page admin/DashbordContenu";
import CategorieCard from "../Composants/composants de la page admin/CategorieCard";
import CardScroll from "../Composants/composants de la page admin/CardScroll";

const rapports = [
  {
    rank: 1,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
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
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
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
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
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
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
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
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
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
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
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
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Medecine",
    nomUsers: "Hamidou Ly",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 8,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Medecine",
    nomUsers: "Hamidou Ly",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 9,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Medecine",
    nomUsers: "Hamidou Ly",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 10,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Medecine",
    nomUsers: "Hamidou Ly",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 11,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Informatique",
    nomUsers: "Ndeye Amie",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 12,
    imageRapport: pdf,
    titre: "Rapport de stage",
    description: "Stages passer à Volkeno....",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Economie",
    nomUsers: "Snkr",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 13,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Pshycologie",
    nomUsers: "Binta Dia",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 14,
    imageRapport: pdf,
    titre: "Rapport de stage",
    description: "Stages passer à Volkeno....",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Informatique",
    nomUsers: "Nafina",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 15,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Informatique",
    nomUsers: "Baba Faye",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 16,
    imageRapport: pdf,
    titre: "Rapport de stage",
    description: "Stages passer à Volkeno....",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Agriculture",
    nomUsers: "Nabi dev",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 17,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Medecine",
    nomUsers: "Hamidou Ly",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 18,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Medecine",
    nomUsers: "Hamidou Ly",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 19,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Medecine",
    nomUsers: "Hamidou Ly",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 20,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Medecine",
    nomUsers: "Hamidou Ly",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 21,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Informatique",
    nomUsers: "Ndeye Amie",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 22,
    imageRapport: pdf,
    titre: "Rapport de stage",
    description: "Stages passer à Volkeno....",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Economie",
    nomUsers: "Snkr",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 23,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Pshycologie",
    nomUsers: "Binta Dia",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 24,
    imageRapport: pdf,
    titre: "Rapport de stage",
    description: "Stages passer à Volkeno....",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Informatique",
    nomUsers: "Nafina",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 25,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Informatique",
    nomUsers: "Baba Faye",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 26,
    imageRapport: pdf,
    titre: "Rapport de stage",
    description: "Stages passer à Volkeno....",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Agriculture",
    nomUsers: "Nabi dev",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 27,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Medecine",
    nomUsers: "Hamidou Ly",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 28,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Medecine",
    nomUsers: "Hamidou Ly",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 29,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Medecine",
    nomUsers: "Hamidou Ly",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    rank: 30,
    imageRapport: word,
    titre: "Rapport de Memoire",
    description: "Analyse des impacts climatiques...",
    descriptionLong:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt cumque quod non sint! Ut veniam repellendus delectus recusandae quam .......",
    userPhoto: avatar,
    categories: "Medecine",
    nomUsers: "Hamidou Ly",
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
];

const lesUtilisateurs = [
  {
    id: 1,
    name: "Abdoul Wakhab",
    email: "planimportant@gmail.com",
    role: "admin",
    jourInscripte: "2024-12-01",
    image: avatar,
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    id: 2,
    name: "Ndeye Amy Thiam",
    email: "thiam@gmail.com",
    role: "utilisateur",
    jourInscripte: "2024-13-21",
    image: avatar,
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    id: 3,
    name: "Naby Dev",
    email: "devTre@gmail.com",
    role: "admin",
    jourInscripte: "2025-02-05",
    image: avatar,
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    id: 4,
    name: "Nafissatou",
    email: "badji@gmail.com",
    role: "utilisateur",
    jourInscripte: "2022-02-11",
    image: avatar,
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    id: 5,
    name: "Baba",
    email: "faye@gmail.com",
    role: "admin",
    jourInscripte: "2021-10-11",
    image: avatar,
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    id: 6,
    name: "Binta Dia",
    email: "binta@gmail.com",
    role: "admin",
    jourInscripte: "2021-02-13",
    image: avatar,
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
  {
    id: 7,
    name: "Hamidou",
    email: "lyham@gmail.com",
    role: "utilisateur",
    jourInscripte: "2025-01-16",
    image: avatar,
    onDetailClick: () => console.log("Voir détail rapport 1"),
    onDeleteClick: () => console.log("Supprimer rapport 1"),
  },
];

const services = [
  { icon: "📝", label: "Rapport d'intervention" },
  { icon: "🔍", label: "Rapport d'inspection" },
  { icon: "⚠️", label: "Rapport d'incident" },
  { icon: "📊", label: "Rapport d'activité" },
  { icon: "🧾", label: "Rapport de maintenance" },
  { icon: "📅", label: "Rapport de visite" },
];

const Admin = () => {
  const [recherche, setRecherche] = useState("");
  const [filtreUser, setFiltreUser] = useState(lesUtilisateurs);

  const changement = (utile) => {
    setRecherche(utile);
    if (utile === "") {
      setFiltreUser(lesUtilisateurs);
    } else {
      const filtre = lesUtilisateurs.filter((lefiltre) =>
        lefiltre.name.toLowerCase().includes(utile.toLowerCase())
      );
      setFiltreUser(filtre);
    }
  };

  const [vueActive, setVueActive] = useState("dashboard");

  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <SidebarAdmin setVueActive={setVueActive} />

      {/* Main */}
      <main className="flex-1 bg-gray-100 overflow-y-auto transition-all duration-300">
        <HeaderAdmin vueActive={vueActive} onSearch={changement} />

        {vueActive === "dashboard" && <DashboardContenu rapports={rapports} />}

        {vueActive === "users" && (
          <div className="p-3 w-full">
            <Users lesUtilisateurs={filtreUser} />
          </div>
        )}

        {vueActive === "rapports" && (
          <div className="p-3 w-full">
            <div className="flex py-5 justify-center">
              <CardScroll
                services={services}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
              {rapports.map((ele, index) => (
                <RapportCard rapport={ele} key={index} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
