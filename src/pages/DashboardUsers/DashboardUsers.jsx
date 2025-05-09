// import { SidebarUser } from "../../Composants/DashboardUsers/SidebarUser";
import "./Dashboard.css";
// import { Outlet } from "react-router-dom";
// import { SidebarRight } from "./SidebarRight";
import { NavbarUser } from "../../Composants/DashboardUsers/NavbarUser";
import { SidebarUser } from "../../Composants/DashboardUsers/SidebarUser";
import { SidebarRight } from "../../Composants/DashboardUsers/SidebarRight";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";

export const DashboardUsers = () => {
  return (
    <div
      className="w-full  h-full
     text-[var(--background-color)] font-[var()] dasboard"
    >
      <NavbarUser />
      <div className="flex w-full h-full gap-4 justify-between">
        <SidebarUser />
        <Outlet />
        <SidebarRight />
      </div>
    </div>
  );
  return (
    <div className="w-full h-screen overflow-hidden bg-gray-100 text-gray-900">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800">
        <NavbarUser />
      </div>

      <div className="flex pt-[60px] h-full">
        <aside className="hidden md:block w-[250px] h-full fixed top-[70px] left-0 overflow-y-auto bg-white shadow-lg z-40">
          <SidebarUser />
        </aside>

        <main className="flex-1 ml-0 md:ml-[250px] mr-0 md:mr-[250px] h-[calc(100vh-70px)] overflow-y-auto p-4">
          <Outlet />
        </main>

        <aside className="hidden md:block w-[250px] h-full fixed top-[70px] right-0 overflow-y-auto bg-white shadow-lg z-40">
          <SidebarRight />
        </aside>
      </div>
    </div>
  );
};
