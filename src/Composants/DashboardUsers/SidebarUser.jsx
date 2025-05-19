import { useContext } from "react";
import AuthContext from "../../Contexts/AuthContext";
import { Buttons } from "./Buttons";
import { Profile } from "./Profile";
import {FaCloudUploadAlt,FaHome} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { HiDocument } from "react-icons/hi2";

export const SidebarUser = () => {

	// const handleLogout = () => {
	// 	localStorage.removeItem("token");
	// 	window.location.href = "/";
	// };
 const { users, setUsers } = useContext(AuthContext);
  const navigate = useNavigate();

	  const handleLogout = () => {
     localStorage.removeItem("token");
     setUsers(null);
     navigate("/connexion");
   };

  if (!users) return null;

	return (
		<div className="w-full p-5 bg-white text-gray-800 shadow-xl h-full hidden md:block">
			<Profile />

			<hr className="mt-5 h-[2px] bg-gray-200" />

			<ul className="mt-6 flex flex-col gap-2">
				{[
					{ to: "/users", icon: <FaHome />, label: "Accueil" },
					{ to: "rapport", icon: <HiDocument />, label: "Rapports" },
					{ to: "rapportTelecharger", icon: <FaCloudUploadAlt />, label: "Téléchargements" },
				].map((link, i) => (
					<NavLink
						key={i}
						to={link.to}
						end={"/users"}
						className={({ isActive }) =>
							`flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-all
							${isActive ? "bg-gray-800 text-amber-300 font-semibold" : "hover:bg-gray-200 text-gray-700"}`
						}
					>
						{link.icon}
						<span>{link.label}</span>
					</NavLink>
				))}
			</ul>

			<hr className="mt-6 h-[2px] bg-gray-200" />

			<div className="mt-2 flex flex-col justify-start items-start gap-2 
			text-sm text-gray-600 ">
				<NavLink to={"/pageParametre"} className="cursor-pointer hover:bg-gray-200 
				rounded-md transition p-2 w-full flex items-center gap-2">
				<IoMdSettings />
				<Buttons text="Paramètres du compte" />
				</NavLink>
				<div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200
				 rounded-md transition p-2 w-full text-[#FF0000]" onClick={handleLogout}>
				<CiLogout />
				<Buttons text="Deconnexion" onClick={handleLogout}/>

				</div>
				{/* <Buttons text="À propos" /> */}
			</div>
		</div>
	);
};
