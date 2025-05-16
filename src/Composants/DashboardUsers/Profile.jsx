import { useContext, useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";

export const Profile = () => {
    const [openMenu, setOpenMenu] = useState(false);
	const menuRef = useRef();
	const navigate = useNavigate();
	  const { users, setUsers } = useContext(AuthContext);

    useEffect(() => {
        const handleClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setOpenMenu(false);
			}
		};
        document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
    },[])


	const handleLogout = () => {
    localStorage.removeItem("token");
    setUsers(null);
    navigate("/connexion");
  };

//   const handleDashboard = () => {
//     if (users?.isAdmin) {
//       navigate("/admin");
//     } else {
//       navigate("/accueil");
//     }
//     setOpenMenu(false);
//   };
  if (!users) return null;
    return <div className="profile text-white flex items-center flex-col  md:block">
            <div className="img-profil mt-4 relative" onClick={() => setOpenMenu(!openMenu)}>
             <img src={"https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}
              alt="profil" className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] rounded-full"/>
              <span className=" absolute bottom-[-5px] right-0 bg-[var(--background-color)]
              rounded-full md:hidden cursor-pointer"><FaAngleDown /></span>
            </div>
            <div className="infos-profil text-[var(--text-couleur)] mt-4">
                <p className="name text-sm text-[#fff] md:text-[#212121] md:text-lg font-regular">
					{/* John Doe */}
					 Bonjour, {users.prenom}
					</p>
                <p className="description text-sm hidden md:block text-gray-500">
					{/* je suis un utilisateur */}
					 {users.isAdmin ? "Administrateur" : "Utilisateur"}
					</p>
            </div>
            {/* Mini-menu dropdown */}
			{openMenu && (
				<div
					ref={menuRef}
					className="absolute top-[60px]  bg-white text-gray-800 shadow-lg rounded-lg w-[200px] z-50 py-2"
				>
					<div className="px-4 py-2 border-b">
						<p className="text-sm font-semibold">
							John Doe
							{users.prenom}
							</p>
						<p className="text-xs text-gray-500">
							{/* Utilisateur */}
							{users.isAdmin ? "Administrateur" : "Utilisateur"}
							</p>
					</div>
					<button
						onClick={() => {
							navigate("/pageParametre");
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

}