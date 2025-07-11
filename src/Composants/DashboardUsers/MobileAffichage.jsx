import { FaCloudUploadAlt, FaHome, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { Buttons } from "./Buttons";
import { AddRapport } from "./Rapport/AddRapport";
import { useContext } from "react";
import AuthContext from "../../Contexts/AuthContext";
import { HiDocument } from "react-icons/hi2";
import { Profile } from "./Profile";

export const MobileSidebar = ({ isOpen, onClose }) => {
  const { users, setUsers } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsers(null);
    navigate("/");
  };

  if (!users) return;
  const links = [
    { to: "/users", icon: <FaHome />, label: "Accueil" },
    { to: "rapport", icon: <HiDocument />, label: "Mes rapports" },
    {
      to: "rapportTelecharger",
      icon: <FaCloudUploadAlt />,
      label: "Mes téléchargements",
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-3/4 h-full bg-white z-50 shadow-lg transition-transform duration-300 md:hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Menu</h2>
          <FaTimes className="text-xl cursor-pointer" onClick={onClose} />
        </div>

        <div className="mb-6 flex justify-center items-center">
          <Profile />
        </div>

        <ul className="flex flex-col gap-3 mt-4">
          {links.map((link, i) => (
            <NavLink
              key={i}
              to={link.to}
              end="/users"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm p-2 rounded-md ${
                  isActive
                    ? "bg-gray-200 text-gray-800 font-semibold"
                    : "hover:bg-gray-100 text-gray-800"
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </ul>

        <hr className="my-4" />

        <div className="flex flex-col justify-start items-start gap-2 text-sm">
          <div className="addDocs">
            <AddRapport style={{ backgroundColor: "#1E2939", color: "#fff" }} />
          </div>
          <NavLink to="pageParametre" onClick={onClose}>
            <Buttons text="Paramètres du compte" />
          </NavLink>
          <div onClick={handleLogout}>
            <Buttons text="Déconnexion" />
          </div>
        </div>
      </div>
    </div>
  );
};
