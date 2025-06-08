import { useContext, useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";

export const Profile = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const { users, setUsers } = useContext(AuthContext);
  const { url } = usePublication();

  useEffect(() => {
    // console.log("✅ useEffect exécuté dans le composant Profile");
    // const fetchProfil = async () => {
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     // console.warn("🚫 Aucun token trouvé");
    //     return;
    //   }

    //   try {
    //     const response = await fetch(`${url}/api/users/profile`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     if (!response.ok) throw new Error("Échec récupération profil");

    //     const data = await response.json();
    //     setUsers(data);
    //   } catch (error) {
    //     console.error("Erreur récupération profil :", error);
    //   }
    // };
    const fetchProfil = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/connexion");
    return;
  }

  try {
    const response = await fetch(`${url}/api/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      // 🔴 Token invalide ou utilisateur supprimé
      localStorage.removeItem("token");
      setUsers(null);
      navigate("/connexion");
      return;
    }

    if (!response.ok) throw new Error("Échec récupération profil");

    const data = await response.json();
    setUsers(data);
  } catch (error) {
    console.error("Erreur récupération profil :", error);
    navigate("/connexion");
  }
};

    fetchProfil();
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Redirection automatique selon le rôle
 

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsers(null);
    navigate("/connexion");
  };

  if (!users) return null;

  //  console.log("users", users.photo);

  return (
    <div className="profile text-white flex items-center justify-center flex-col md:block">
      <div
        className="img-profil mt-4 relative"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <img
          src={users.photo}
          alt="profil"
          className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] rounded-full object-cover border-4 border-gray-800"
        />

        <span className="absolute bottom-[-5px] right-0 bg-[var(--background-color)] rounded-full md:hidden cursor-pointer">
          <FaAngleDown />
        </span>
      </div>

      <div className="infos-profil text-[var(--text-couleur)] mt-4">
        <p className="name text-[8px] font-bold text-[#fff] md:text-[#212121] md:text-lg font-regular">
          {users.prenom}
        </p>
        <p className="description text-sm hidden md:block text-gray-500">
          {users.email}
        </p>
      </div>

      {openMenu && (
        <div
          ref={menuRef}
          className="absolute top-[65px] left-[-5px] bg-white text-gray-800 shadow-lg rounded-lg w-[200px] z-50 py-2"
        >
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-semibold">{users.prenom}</p>
            <p className="text-xs text-gray-500">
              {users.isAdmin ? "Administrateur" : "Utilisateur"}
            </p>
          </div>

          <button
            onClick={() => {
              navigate("pageParametre");
              setOpenMenu(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            Paramètres du compte
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};
