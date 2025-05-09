import { RiDashboardHorizontalFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import { HiDocumentReport } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";

const SidebarAdmin = ({setVueActive}) => {
    return ( 
      <aside className="w-20 md:w-64 bg-gray-800 text-white px-5 pt-1 pb-2 flex flex-col static overflow-y-auto transition-all duration-200">

        <div className="flex p-2 rounded gap-2 items-center border-b border-amber-300">
            <div className="w-8 h-8 relative rounded-full border-amber-300 border">
                <img src="" alt="" className="absolute w-full h-full object-cover rounded-full" />
            </div>
            <h4 className="text-white text-xl font-bold uppercase hidden md:block">SenRapport</h4>
        </div>

        <div className="mt-10">
            <h5 className="text-amber-100 hidden md:block">Dashboard</h5>

            <ul className="space-y-2">
            <li onClick={() => setVueActive("dashboard")} className="cursor-pointer flex items-center justify-center md:justify-start py-3 mt-2 gap-2 border-b border-amber-200">
                <span className="p-2 bg-amber-200 rounded-full text-gray-800">{<RiDashboardHorizontalFill />}</span>
                <span className="hidden md:inline">Dashboards</span>
            </li>
            <li onClick={() => setVueActive("users")} className="cursor-pointer flex items-center justify-center md:justify-start py-3 mt-2 gap-2 border-b border-amber-200">
                <span className="p-2 bg-amber-200 rounded-full text-gray-800">{<HiUsers />}</span>
                <span className="hidden md:inline">Utilisateurs</span>
            </li>
            <li onClick={() => setVueActive("rapports")} className="cursor-pointer flex items-center justify-center md:justify-start py-3 mt-2 gap-2 border-b border-amber-200">
                <span className="p-2 bg-amber-200 rounded-full text-gray-800">{<HiDocumentReport />}</span>
                <span className="hidden md:inline">Rapports</span>
            </li>
            </ul>
        </div>

        <div className="flex items-center justify-center md:justify-start cursor-pointer gap-2 mt-auto pt-6 text-4">
            {<CiLogout />}
            <p className="text-amber-50 hidden md:inline">Déconnexion</p>
        </div>
        </aside>

     );
}
 
export default SidebarAdmin;