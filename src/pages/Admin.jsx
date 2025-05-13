import React, { useState } from "react";
import "../index.css";

import "./StylePerdo.css";

import Users from "./Users";
import RapportCard from "../Composants/composants de la page admin/RapportCard";
import SidebarAdmin from "../Composants/composants de la page admin/SidebarAdmin";
import HeaderAdmin from "../Composants/composants de la page admin/HeaderAdmin";
import DashboardContenu from "../Composants/composants de la page admin/DashbordContenu";
import CardScroll from "../Composants/composants de la page admin/CardScroll";
import DetailRapportAdmin from "../Composants/composants de la page admin/DetailRapportAdmin";

import RapportsTab from "../data/RapportsTableau";
import LesUtilisateurs from "../data/LesUtilisateurs";


const services = [
  { icon: "📚", label: "Toutes les catégories" },
  { icon: "💻", label: "Informatique" },
  { icon: "📈", label: "Economie" },
  { icon: "🧠", label: "Psychologie" },
  { icon: "🌾", label: "Agriculture" },
  { icon: "🧬", label: "Médecine" },
  { icon: "📝", label: "Littérature" },
];

const Admin = () => {
  const [recherche, setRecherche] = useState("")
    const [filtreUser, setFiltreUser] = useState(LesUtilisateurs)

    const [rapportfiltre, setRapportFiltre] = useState(RapportsTab)

  const changement = (utile) => {
    setRecherche(utile);
    if (utile === "") {
      setFiltreUser(LesUtilisateurs);
    } else {
      const filtre = LesUtilisateurs.filter((lefiltre) =>
        lefiltre.name.toLowerCase().includes(utile.toLowerCase())
      );
      setFiltreUser(filtre);
    }
  }

    const supprimerUtilisateur = (id) => {
      const nouveauTab = filtreUser.filter(sup => sup.id !== id)
      setFiltreUser(nouveauTab)
    }

    const filtreRapport = (rapport) => {
      // setRapportFiltre(rapport)
        if(rapport === "") {
            setRapportFiltre(RapportsTab)
        } else {
            const filtreRap = RapportsTab.filter(lefiltre => lefiltre.titre.toLowerCase().includes(rapport.toLowerCase()))
            setRapportFiltre(filtreRap)
        }
    }

    const supprimerRapport = (rank) => {
      const nouveauTableau = rapportfiltre.filter(sup => sup.rank !== rank)
      setRapportFiltre(nouveauTableau)
    }

  const [vueActive, setVueActive] = useState("dashboard");

  const [selectedIndex, setSelectedIndex] = useState(1);

  const [rapportSelect, setRapportSelect] = useState(null)

  // console.log('hello');
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      
      <SidebarAdmin setVueActive={setVueActive} />

      {/* Main */}
        <main className="flex-1 bg-gray-100 overflow-y-auto transition-all duration-300">

          {vueActive === "users" && <HeaderAdmin onSearch={changement} />}
          {(vueActive === "dashboard" || vueActive === "rapports") && (<HeaderAdmin onSearch={filtreRapport} />)}
          
          
          {vueActive === "dashboard" && 
              <DashboardContenu rapports={rapportfiltre} />
            }

          {vueActive === "users" && (
              <div className="p-3 w-full">
                <Users lesUtilisateurs={filtreUser} onDelete={supprimerUtilisateur} />
              </div>
           )}

        {vueActive === "rapports" && (
          <div className="p-3 w-full">
            {rapportSelect ? (
              <>
                <DetailRapportAdmin onClick={() => setRapportSelect(null)} rapportChoisi={rapportSelect} />
              </>
              
            ) : (
              <>
                <div className="flex py-5 justify-center">
                  <CardScroll
                    services={services}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                  {rapportfiltre.map((ele, index) => (
                    <RapportCard rapport={ele} key={index} onDelete={() => supprimerRapport(ele.rank)} onDetailCliquer={() => setRapportSelect(ele)} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};


export default Admin;
