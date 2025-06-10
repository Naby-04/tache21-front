import { useState, useContext } from "react";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { HiUsers } from "react-icons/hi2";
import { HiDocumentReport } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import AuthContext from "../../Contexts/AuthContext";
import leSen from "../../assets/S.png"
import enR from "../../assets/en'Rapport.png"

const SidebarAdmin = ({ setVueActive }) => {
  const [activeItem, setActiveItem] = useState("dashboard"); // par défaut
  const { users, setUsers } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleItemClick = (vue) => {
    setVueActive(vue);
    setActiveItem(vue);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsers(null);
    navigate("/");
  };

  return (
    <aside className="w-13 md:w-64 bg-gray-800 text-white px-1 md:px-5 pt-1 pb-2 flex flex-col static overflow-y-auto transition-all duration-200">
      <div className="flex p-2 rounded gap-2 items-center border-b border-amber-300">
        <div className="relative">
          <img
            src={leSen}
            alt="S"
            className="w-12"
          />
        </div>
        <img src={enR} alt="en'Rapport" className="hidden md:block w-23 ml-[-18px]" />
      </div>

      <div className="mt-10">
        <h5 className="text-amber-100 hidden md:block">Dashboard</h5>

        <ul className="space-y-2">
          <li
            onClick={() => handleItemClick("dashboard")}
            className={`cursor-pointer flex items-center justify-center md:justify-start py-3 px-2 mt-2 gap-2 border-b border-amber-300 rounded-md transition-colors duration-150
              ${
                activeItem === "dashboard"
                  ? "bg-amber-100/20"
                  : "hover:bg-amber-100/20"
              }`}
          >
            <span className="p-2 bg-amber-300 rounded-full text-gray-800">
              {<RiDashboardHorizontalFill />}
            </span>
            <span className="hidden md:inline">Statistiques</span>
          </li>

          <li
            onClick={() => handleItemClick("users")}
            className={`cursor-pointer flex items-center justify-center md:justify-start py-3 px-2 mt-2 gap-2 border-b border-amber-300 rounded-md transition-colors duration-150
              ${
                activeItem === "users"
                  ? "bg-amber-100/20"
                  : "hover:bg-amber-100/20"
              }`}
          >
            <span className="p-2 bg-amber-300 rounded-full text-gray-800">
              {<HiUsers />}
            </span>
            <span className="hidden md:inline">Utilisateurs</span>
          </li>

          <li
            onClick={() => handleItemClick("rapports")}
            className={`cursor-pointer flex items-center justify-center md:justify-start py-3 px-2 mt-2 gap-2 border-b border-amber-300 rounded-md transition-colors duration-150
              ${
                activeItem === "rapports"
                  ? "bg-amber-100/20"
                  : "hover:bg-amber-100/20"
              }`}
          >
            <span className="p-2 bg-amber-300 rounded-full text-gray-800">
              {<HiDocumentReport />}
            </span>
            <span className="hidden md:inline">Rapports</span>
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-center md:justify-start cursor-pointer text-gray-100 hover:text-amber-300 gap-2 mt-auto pt-6 text-4" onClick={handleLogout}>
        <CiLogout className="text-lg md:text-base" />
        <p className="hidden md:inline hover:text-amber-300">Déconnexion</p>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
