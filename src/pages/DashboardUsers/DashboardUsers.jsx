import { NavbarUser } from "./NavbarUser";
import { SidebarUser } from "./SidebarUser";
import "./Dashboard.css"
import { Outlet } from "react-router-dom";
import { SidebarRight } from "./SidebarRight";

export const DashboardUsers = () => {
    return <div className="w-full  h-full
     text-[var(--background-color)] font-[var()] dasboard">
        <NavbarUser/>
        <div className="flex w-full h-full gap-4 justify-between">
        <SidebarUser/>
         <Outlet/>
        <SidebarRight/>
        </div>
    </div>;
}