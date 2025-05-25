import React, { useState, useEffect } from "react";
import "../index.css";
import "./StylePerdo.css";

import Users from "../Composants/composants de la page admin/Users";
import RapportCard from "../Composants/composants de la page admin/RapportCard";
import SidebarAdmin from "../Composants/composants de la page admin/SidebarAdmin";
import HeaderAdmin from "../Composants/composants de la page admin/HeaderAdmin";
import DashboardContenu from "../Composants/composants de la page admin/DashbordContenu";
import CardScroll from "../Composants/composants de la page admin/CardScroll";
import DetailRapportAdmin from "../Composants/composants de la page admin/DetailRapportAdmin";
import { usePublication } from "../Contexts/DashboardUser/UseContext";

// import LesUtilisateurs from "../data/LesUtilisateurs";

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
  const [recherche, setRecherche] = useState("");
  const [rechercheDashboard, setRechercheDashboard] = useState("");
  const [rechercheRapports, setRechercheRapports] = useState("");

  const {url} = usePublication()

  const [allUsers, setAllUsers] = useState([])
  const [filtreUser, setFiltreUser] = useState([]);
  const [rapportsOriginaux, setRapportsOriginaux] = useState([]);
  const [rapportfiltre, setRapportFiltre] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [vueActive, setVueActive] = useState("dashboard");
  const [rapportSelect, setRapportSelect] = useState(null);

  // 🔁 Récupération des rapports depuis l’API
  useEffect(() => {
    const fetchRapports = async () => {
      try {
        const response = await fetch(`${url}/rapport/all`);
        const data = await response.json();
        setRapportsOriginaux(data);
        setRapportFiltre(data);
      } catch (error) {
        console.error("Erreur lors du chargement des rapports :", error);
      }
    };

    fetchRapports();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // récupère le token stocké

        const response = await fetch(`${url}/api/users/allusers`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
          setAllUsers(data);
          setFiltreUser(data);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      }
    };

    fetchUsers();
  }, []);

  // 🔍 Recherche utilisateurs
  const changement = (utile) => {
    setRecherche(utile);

    if (utile === "") {
      setFiltreUser(allUsers);
    } else {
      const filtre = allUsers.filter((u) =>
        u.prenom.toLowerCase().includes(utile.toLowerCase()) ||
        u.email.toLowerCase().includes(utile.toLowerCase())
      );
      setFiltreUser(filtre);
    }
  }


  // 🔍 Recherche et filtre dans "dashboard"
  const filtrerRapportsParTexte = (texte) => {
    setRechercheDashboard(texte);
    let filtered = rapportsOriginaux;

    if (texte !== "") {
      filtered = filtered.filter((r) =>
        r.title.toLowerCase().includes(texte.toLowerCase())
      );
    }

    setRapportFiltre(filtered);
  };

  // 🔍 Recherche + catégorie dans "rapports"
  const filtrerRapportsParTexteEtCategorie = (texte) => {
    setRechercheRapports(texte);
    let filtered = rapportsOriginaux;

    if (selectedIndex !== 0) {
      const selectedCategory = services[selectedIndex].label;
      filtered = filtered.filter((r) => r.category === selectedCategory);
    }

    if (texte !== "") {
      filtered = filtered.filter((r) =>
        r.title.toLowerCase().includes(texte.toLowerCase())
      );
    }

    setRapportFiltre(filtered);
  };

  const supprimerRapport = async (id) => {
    try {
      const token = localStorage.getItem("token"); // ou "access_token", selon ton backend

      const response = await fetch(`${url}/rapport/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const nouveauTableau = rapportfiltre.filter((r) => r._id !== id);
        setRapportFiltre(nouveauTableau);
      } else {
        console.error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
    }
  };

  const supprimerUtilisateur = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${url}/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const miseAJour = filtreUser.filter((u) => u._id !== id);
      setAllUsers(miseAJour);
      setFiltreUser(miseAJour);
    } else {
      console.error("Erreur lors de la suppression de l'utilisateur");
    }
  } catch (error) {
    console.error("Erreur serveur lors de la suppression :", error);
  }
};


  // Vue active
  useEffect(() => {
    if (vueActive === "dashboard") {
      filtrerRapportsParTexte(rechercheDashboard);
    } else if (vueActive === "rapports") {
      filtrerRapportsParTexteEtCategorie(rechercheRapports);
    } else if (vueActive === "users") {
        setRechercheDashboard("");
        setRechercheRapports("");
        setFiltreUser(allUsers);
        setRapportFiltre(rapportsOriginaux);
        setSelectedIndex(0);
      }
  }, [vueActive]);

  useEffect(() => {
    if (vueActive === "rapports") {
      filtrerRapportsParTexteEtCategorie(rechercheRapports);
    }
  }, [selectedIndex, vueActive]);

  return (
    <div className="h-screen flex">
      <SidebarAdmin setVueActive={setVueActive} />
      <main className="flex-1 bg-gray-100 overflow-y-auto transition-all duration-300">
        {vueActive === "users" && <HeaderAdmin onSearch={changement} />}
        {vueActive === "dashboard" && <HeaderAdmin onSearch={filtrerRapportsParTexte} />}
        {vueActive === "rapports" && <HeaderAdmin onSearch={filtrerRapportsParTexteEtCategorie} />}

        {vueActive === "dashboard" && (
          <DashboardContenu rapports={rapportfiltre} onDelete={supprimerRapport} utilisateurs={allUsers} />
        )}

        {vueActive === "users" && (
          <div className="p-3 w-full">
            <Users lesUtilisateurs={filtreUser} onDelete={supprimerUtilisateur} />
          </div>
        )}

        {vueActive === "rapports" && (
          <div className="p-3 w-full">
            {rapportSelect ? (
              <DetailRapportAdmin
                onClick={() => setRapportSelect(null)}
                rapportChoisi={rapportSelect}
              />
            ) : (
              <>
                <div className="flex py-5 justify-center">
                  <CardScroll
                    services={services}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                  {rapportfiltre.map((ele) => (
                    <RapportCard
                      key={ele._id}
                      rapport={ele}
                      onDelete={() => supprimerRapport(ele._id)}
                      onDetailCliquer={() => setRapportSelect(ele)}
                    />
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
