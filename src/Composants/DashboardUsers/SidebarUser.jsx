import { Deconnexion } from "./Decconexion";
import { Profile } from "./Profile";
import {
	FaCloudUploadAlt,
	FaDochub,
	FaEdit,
	FaHome,
	FaTrash,
} from "react-icons/fa";

export const SidebarUser = () => {
	return (
		<div
			className=" w-full lg:w-[400px] p-5 bg-[var(--background-color)] 
 /       text-[var(--primary-color)] shadow-2xl h-screen
          hidden lg:block sticky top-0"
			id="sidebar"
		>
			<Profile />
			<hr className="mt-5 h-[4px] w-full bg-[var(--primary-color)]" />
			<ul className="list-unstyled flex flex-col mt-5 gap-3 cursor-pointer">
				<li className="text-[18px] font-[var(--weight-semi-bold)] flex gap-2 items-center">
					<FaHome /> Acceuil
				</li>
				<li className="text-[18px] font-[var(--weight-semi-bold)] flex gap-2 items-center">
					<FaDochub /> Mes Rapports
				</li>
				<li className="text-[18px] font-[var(--weight-semi-bold)] flex gap-2 items-center">
					<FaCloudUploadAlt /> Mes Telechargements
				</li>
				<li className="text-[18px] font-[var(--weight-semi-bold)] flex gap-2 items-center">
					<FaTrash /> Supprimer Un rapport
				</li>
				<li className="text-[18px] font-[var(--weight-semi-bold)] flex gap-2 items-center">
					<FaEdit /> Modifier un rapport
				</li>
			</ul>
			<hr className="mt-5 h-[4px] w-full bg-[var(--primary-color)]" />
			<div className="mt-5 cursor-pointer text-xl flex flex-col gap-2 justify-start items-start">
				<Deconnexion button={"Paramètres du Compte"} />
				<Deconnexion button={"Aides"} />
				<Deconnexion button={"A propos"} />
			</div>
		</div>
	);
};
