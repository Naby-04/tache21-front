import { Buttons } from "./Buttons";
import { Profile } from "./Profile";
import {FaCloudUploadAlt,FaDochub,FaHome} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const SidebarUser = () => {
	return (
		<div className="w-full p-5 bg-white text-gray-800 shadow-xl h-full hidden md:block">
			<Profile />

			<hr className="mt-5 h-[2px] bg-gray-200" />

			<ul className="mt-6 flex flex-col gap-2">
				{[
					{ to: "/users", icon: <FaHome />, label: "Accueil" },
					{ to: "rapport", icon: <FaDochub />, label: "Rapports" },
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

			<div className="mt-2 flex flex-col justify-start items-start gap-2 text-sm text-gray-600">
				<NavLink to={"/pageParametre"} className="cursor-pointer">
				<Buttons text="Paramètres du compte" />
				</NavLink>
				<Buttons text="Deconnexion" />
				<Buttons text="À propos" />
			</div>
		</div>
	);
};
