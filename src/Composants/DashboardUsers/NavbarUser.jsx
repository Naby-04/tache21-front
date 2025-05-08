import { Deconnexion } from "./Decconexion";
import { RiMenuFill } from "react-icons/ri";

export const NavbarUser = () => {
	const handleToggle = () => {
		document.getElementById("sidebar").classList.toggle("hidden");
	};
	return (
		<div
			className="flex justify-between items-center bg-[var(--primary-color)]
         p-5 w-full sticky top-0 z-10"
			id="navbar"
		>
			<h1 className="text-[var(--couleur-Logo)] text-4xl font-[--font-title;--weight-bold] cursor-pointer" id="logo">
				AcadDocs
			</h1>
			<div className="addDocs">
				<button
					className="p-2 bg-[var(--couleur-Logo)] text-[var(--text-couleur)] 
              font-[var(--font-button)] text-[12px] rounded-xl cursor-pointer hidden lg:block"
				>
					Ajouter un rapport
				</button>
			</div>
			<div className="flex items-center gap-5">
				<div
					className="hover:text-[var(--couleur-Logo)] cursor-pointer text-[20px] text-[var(--couleur-Logo)]
                  hidden lg:block"
				>
					<Deconnexion button={"Deconnexion"} />
				</div>
			</div>
			<div className="menu_mobil block lg:hidden cursor-pointer">
				<RiMenuFill
					className="text-[var(--secondary-color)] text-4xl cursor-pointer"
					onClick={handleToggle}
				/>
			</div>
		</div>
	);
};
