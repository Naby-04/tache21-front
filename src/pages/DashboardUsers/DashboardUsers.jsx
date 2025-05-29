import { SidebarUser } from "../../Composants/DashboardUsers/SidebarUser";
import "./Dashboard.css"
import { Outlet } from "react-router-dom";
import { NavbarUser } from "../../Composants/DashboardUsers/NavbarUser";
import { SidebarRight } from "../../Composants/DashboardUsers/SidebarRight";
import "./Dashboard.css";

export const DashboardUsers = () => {
	return (
		<div className="w-full h-screen overflow-hidden bg-gray-100 text-gray-900">
			<div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 p-2">
				<NavbarUser />
			</div>

			<div className="flex pt-[70px] h-full"> 
				
				<aside className="hidden lg:block w-[250px] h-full fixed top-[70px] left-0 overflow-y-auto bg-white shadow-lg z-40">
					<SidebarUser />
				</aside>

				<main className="flex-1 ml-0 lg:ml-[250px] mr-0 lg:mr-[250px] h-[calc(100vh-70px)] overflow-y-auto p-4 no-scrollbar bg-[#fff]">
					<Outlet />
				</main>

				<aside className="hidden lg:block w-[250px] h-full fixed top-[70px] right-0 overflow-y-auto bg-white shadow-lg z-40">
					<SidebarRight />
				</aside>
			</div>
		</div>
	);
};
