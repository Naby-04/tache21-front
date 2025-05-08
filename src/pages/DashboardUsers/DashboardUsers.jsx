// import { SidebarUser } from "../../Composants/DashboardUsers/SidebarUser";
import "./Dashboard.css";
// import { Outlet } from "react-router-dom";
// import { SidebarRight } from "./SidebarRight";
import { NavbarUser } from "../../Composants/DashboardUsers/NavbarUser";
import { SidebarUser } from "../../Composants/DashboardUsers/SidebarUser";
import "./Dashboard.css";
import { Outlet } from "react-router-dom";
import { SidebarRight } from "../../Composants/DashboardUsers/SidebarRight";

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
};
