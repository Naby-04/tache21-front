import { useState } from "react";
import { Deconnexion } from "./Decconexion";
import { RiMenuFill } from "react-icons/ri";
import { Profile } from "./Profile";
import { MobileSidebar } from "./MobileAffichage";
// import { MobileSidebar } from "./MobileSidebar"; // importe ton composant mobile

export const NavbarUser = () => {
	const [openMobileMenu, setOpenMobileMenu] = useState(false);

	return (
		<div className="relative">
			{/* Navbar principale */}
			<div
				className="flex justify-between items-center  p-2 w-full z-10"
			>
				{/* Logo et profil (mobile) */}
				<div>
					<h1
						className="text-[var(--couleur-Logo)] text-3xl font-bold hidden md:block cursor-pointer"
						id="logo"
					>
						AcadDocs
					</h1>
					<div className="block md:hidden">
						<Profile />
					</div>
				</div>

				{/* Bouton ajout rapport */}
				<div className="addDocs">
					<button
						className="p-2 bg-[var(--couleur-Logo)] text-[var(--text-couleur)] text-xs rounded-3xl hover:opacity-80"
					>
						Ajouter un rapport
					</button>
				</div>

				{/* Déconnexion desktop */}
				<div className="flex items-center gap-5">
					<div className="hidden lg:block text-[#fff]">
						<Deconnexion button={"Déconnexion"} />
					</div>
				</div>

				{/* Toggle menu mobile */}
				<div className="block md:hidden">
					<RiMenuFill
						className="text-white text-2xl"
						onClick={() => setOpenMobileMenu(!openMobileMenu)}
					/>
				</div>
			</div>

			<MobileSidebar isOpen={openMobileMenu} onClose={() => setOpenMobileMenu(false)} />
		</div>
	);
};
