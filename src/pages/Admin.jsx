import React, { useState, useEffect } from "react";
import "../index.css";
import "./StylePerdo.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Users from "../Composants/composants de la page admin/Users";
import RapportCard from "../Composants/composants de la page admin/RapportCard";
import SidebarAdmin from "../Composants/composants de la page admin/SidebarAdmin";
import HeaderAdmin from "../Composants/composants de la page admin/HeaderAdmin";
import DashboardContenu from "../Composants/composants de la page admin/DashbordContenu";
import CardScroll from "../Composants/composants de la page admin/CardScroll";
import DetailRapportAdmin from "../Composants/composants de la page admin/DetailRapportAdmin";
import { usePublication } from "../Contexts/DashboardUser/UseContext";
import { categories } from "../data/Categorie";

const categoryIcons = {
  informatique_sciences: "💻",
  marketing_economie: "📈",
  education_sante: "🧬",
  environnement_politique: "🧠",
  ingenierie_entrepreneuriat: "🔧",
  rapport_stage_recherche: "📝",
  reseaux_communication: "📡",
  loisirs_sport: "⚽",
  culture_art: "🎨",
  justice_droit: "⚖️",
};

const services = [
  { icon: "📚", label: "Toutes les catégories", value: "all" },
  ...categories.map((cat) => ({
    icon: categoryIcons[cat.value] || "📁", // icône par défaut si non définie
    label: cat.label,
    value: cat.value,
  })),
];

const Admin = () => {
  const [recherche, setRecherche] = useState("");
  const [rechercheDashboard, setRechercheDashboard] = useState("");
  const [rechercheRapports, setRechercheRapports] = useState("");

  const { url } = usePublication();

  const [allUsers, setAllUsers] = useState([]);
  const [filtreUser, setFiltreUser] = useState([]);
  const [rapportsOriginaux, setRapportsOriginaux] = useState([]);
  const [rapportfiltre, setRapportFiltre] = useState([]);
  const [topRapports, setTopRapports] = useState([]);
  const [topRapportsFiltres, setTopRapportsFiltres] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [vueActive, setVueActive] = useState("dashboard");
  const [rapportSelect, setRapportSelect] = useState(null);
  const [telecharge, setTelechargement] = useState([]);
  console.log(topRapports)

  // Récupération des rapports depuis l’API
  useEffect(() => {
    const fetchRapports = async () => {
      try {
        const response = await fetch(`${url}/rapport/all`);
        const data = await response.json();
        console.log(data);
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

  useEffect(() => {
  const fetchTopDownloadedRapports = async () => {
    try {
      const response = await fetch(`${url}/download/top/downloaded`);
      const data = await response.json();
      setTopRapports(data); // car tu utilises topRapports dans l’affichage
    } catch (error) {
      console.error("Erreur lors du chargement des rapports les plus téléchargés :", error);
    }
  };

  fetchTopDownloadedRapports();
}, []);

  useEffect(() => {
    const fetchTelechargement = async () => {
      try {
        const response = await fetch(`${url}/download/all/rapport`);

        const data = await response.json();
        setTelechargement(data);
      } catch (error) {
        console.error("Erreur lors du chargement des top rapports :", error);
      }
    };

    fetchTelechargement();
  }, []);

  // 🔍 Recherche utilisateurs
  const changement = (utile) => {
    setRecherche(utile);

    if (utile === "") {
      setFiltreUser(allUsers);
    } else {
      const filtre = allUsers.filter(
        (u) =>
          u.prenom.toLowerCase().includes(utile.toLowerCase()) ||
          u.email.toLowerCase().includes(utile.toLowerCase())
      );
      setFiltreUser(filtre);
    }
  };

  // const filtrerRapportsParTexte = (texte) => {
  //   setRechercheDashboard(texte);
  //   let filtered = rapportsOriginaux;

  //   if (texte !== "") {
  //     filtered = filtered.filter((r) =>
  //       r.title.toLowerCase().includes(texte.toLowerCase())
  //     );
  //   }

  //   setRapportFiltre(filtered);
  // };
  const filtrerRapportsParTexte = (texte) => {
    setRechercheDashboard(texte);

    let filteredRapports = rapportsOriginaux;
    let filteredTops = topRapports;

    if (texte !== "") {
      filteredRapports = filteredRapports.filter((r) =>
        r.title.toLowerCase().includes(texte.toLowerCase())
      );

      filteredTops = topRapports.filter((item) =>
        item.rapport.title.toLowerCase().includes(texte.toLowerCase())
      );
    }

    setRapportFiltre(filteredRapports);
    setTopRapportsFiltres(filteredTops);
  };

  // 🔍 Recherche + catégorie dans "rapports"
  const filtrerRapportsParTexteEtCategorie = (texte) => {
    setRechercheRapports(texte);

    const selectedCategory = services[selectedIndex]?.value;

    const filtered = rapportsOriginaux.filter((rapport) => {
      const correspondCategorie =
        selectedCategory === "all" || rapport.category === selectedCategory;

      const correspondTexte =
        texte === "" ||
        rapport.title.toLowerCase().includes(texte.toLowerCase());

      return correspondCategorie && correspondTexte;
    });

    setRapportFiltre(filtered);
  };

  const supprimerRapport = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${url}/rapport/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const supUnRap = rapportfiltre.filter((r) => r._id !== id);
        const supRapport = rapportsOriginaux.filter((r) => r._id !== id);

        setRapportFiltre(supUnRap);
        setRapportsOriginaux(supRapport);
        // setRapportFiltre((prev) => prev.filter((r) => r._id !== id));
        // setRapportsOriginaux((prev) => prev.filter((r) => r._id !== id));
        setTopRapports((prev) => prev.filter((t) => t.rapport._id !== id));

        toast.success("Rapport supprimé avec succès !");
      } else {
        toast.error("Échec de la suppression du rapport.");
        const errorText = await response.text();
        console.error(
          `Erreur lors de la suppression. Status: ${response.status}, Message: ${errorText}`
        );
      }
    } catch (error) {
      toast.error("Erreur serveur lors de la suppression.");
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
        toast.success("Utilisateur supprimé avec succès !");
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo && userInfo.id === id) {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        toast.info("Votre compte a été supprimé. Déconnexion...");
        navigate("/#/connexion");
      }
      } else {
        toast.error("Échec de la suppression de l'utilisateur.");
        console.error("Erreur lors de la suppression de l'utilisateur");
      }
    } catch (error) {
      toast.error("Erreur serveur lors de la suppression.")
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
        {vueActive === "dashboard" && (
          <>
            <HeaderAdmin onSearch={filtrerRapportsParTexte} />
            <DashboardContenu
              rapports={rapportfiltre}
              onDelete={supprimerRapport}
              utilisateurs={allUsers}
              topRapports={
                topRapportsFiltres.length ? topRapportsFiltres : topRapports
              }
              telechargement={telecharge}
            />
          </>
        )}

        {vueActive === "users" && (
          <>
            <HeaderAdmin onSearch={changement} />
            <div className="p-3 w-full">
              <Users
                lesUtilisateurs={filtreUser}
                onDelete={supprimerUtilisateur}
              />
            </div>
          </>
        )}

        {vueActive === "rapports" && (
          <>
            <HeaderAdmin onSearch={filtrerRapportsParTexteEtCategorie} />
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
          </>
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
};

export default Admin;
