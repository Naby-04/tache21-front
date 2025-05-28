import { useState } from "react";
import { Deconnexion } from "./Decconexion";
import { RiMenuFill } from "react-icons/ri";
import { Profile } from "./Profile";
import { MobileSidebar } from "./MobileAffichage";
import { Input } from "./Recherche/Input";
import { AddRapport } from "./Rapport/AddRapport";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
// import { MobileSidebar } from "./MobileSidebar"; // importe ton composant mobile

export const NavbarUser = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const {searchTerm, setSearchTerm}= usePublication()

	return (
		<div className="relative">
			{/* Navbar principale */}
			<div
				className="flex justify-between items-center  p-2 w-full z-10"
			>
				{/* Logo et profil (mobile) */}
				<div>
					<div className="md:flex items-center gap-2 hidden">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain bg-amber-300 rounded-full" />
          <span className="text-xl font-bold text-amber-300">SenRapport</span>
        </div>
					<div className="block md:hidden">
						<Profile />
					</div>
				</div>

				{/* filter recherche */}

				<div className="flex items-center gap-3">
					<Input
					value={searchTerm}
					onSearch={setSearchTerm}
					/>
				</div>

				{/* Bouton ajout rapport */}
				<div className="addDocs hidden  md:block">
					<AddRapport/>
				</div>
                    
        {/* Toggle menu mobile */}
        <div className="block md:hidden">
          <RiMenuFill
            className="text-white text-2xl"
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          />
        </div>
      </div>

      <MobileSidebar
        isOpen={openMobileMenu}
        onClose={() => setOpenMobileMenu(false)}
      />
    </div>
  );
};
