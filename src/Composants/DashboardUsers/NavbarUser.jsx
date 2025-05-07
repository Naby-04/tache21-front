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
			<h1 className="text-[var(--secondary-color)] text-4xl font-[--font-title;--weight-bold] cursor-pointer">
				AcadDocs
			</h1>
			<div className="addDocs">
				<button
					className="p-2 bg-[var(--secondary-color)] text-[var(--primary-color)] 
              font-[var(--font-button)] text-[12px] rounded-xl cursor-pointer hidden lg:block"
				>
					Ajouter un rapport
				</button>
			</div>
			<div className="flex items-center gap-5">
				<div
					className="hover:text-[var(--background-color)] cursor-pointer text-[20px] text-[var(--secondary-color)]
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
