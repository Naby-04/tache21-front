import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar"
import { Avatar } from "@mui/material";
import AuthContext from "../../Contexts/AuthContext";


const HeaderAdmin = ({ onSearch }) => {

  const [affichage, setAffichage] = useState(false)
  const { users, setUsers } = useContext(AuthContext);
  const navigate = useNavigate();

  const change = () => {
    setAffichage(!affichage)
  }
   const handleLogout = () => {
    localStorage.removeItem("token");
    setUsers(null);
    navigate("/");
  };

  if (!users) return null;

  return (
    <div className="flex items-center justify-evenly bg-gray-100 p-2 px-3 shadow-lg mb-6 sticky top-0 z-50">
      <div className="flex-1 mx-auto gap-3">
        <SearchBar onSearch={onSearch} />
      </div>
           <p className="font-medium text-gray-700">Bonjour, {users.prenom}</p>
      <div className="flex items-center gap-1 flex-col-reverse relative">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-300 overflow-hidden border border-gray-800 cursor-pointer" onClick={change}>
          {<Avatar />}
        </div>
        {affichage && (

        <div className="absolute top-12 right-0 flex flex-col gap-2 p-3 rounded bg-white text-gray-800 shadow-2xl z-50 w-40">
              <p className="p-2 border-b border-gray-300 text-sm">
                Admin : {users.prenom}
              </p>
              <p
                className="p-2 border-b border-gray-300 text-sm text-red-500 cursor-pointer"
                onClick={handleLogout}
              >
                Déconnexion
              </p>
            </div>
      )}
        
      </div>
    </div>
  );
};

export default HeaderAdmin;