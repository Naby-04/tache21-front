// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SearchBar from "./SearchBar"
// import { Avatar } from "@mui/material";
// import AuthContext from "../../Contexts/AuthContext";


// const HeaderAdmin = ({ onSearch }) => {

//   const [affichage, setAffichage] = useState(false)
//   const { users, setUsers } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const change = () => {
//     setAffichage(!affichage)
//   }
//    const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUsers(null);
//     navigate("/");
//   };

//   if (!users) return null;

//   return (
//     <div className="flex items-center justify-evenly bg-gray-100 p-2 px-3 shadow-lg mb-6 sticky top-0 z-50">
//       <div className="flex-1 mx-auto gap-3">
//         <SearchBar onSearch={onSearch} />
//       </div>
//       <div className="flex items-center gap-2 relative cursor-pointer" onClick={change}>
//         <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-300 overflow-hidden border border-gray-800 cursor-pointer">
//           {<Avatar />}
//         </div>
//         <div className="flex flex-col">
//           <p className="font-medium text-gray-700 text-sm">{users.prenom}</p>
//           <p className="font-light text-gray-500 text-xs">Administrateur</p>
//         </div>
//         {affichage && (

//         <div className="absolute top-12 right-0 flex flex-col gap-2 p-3 rounded bg-white text-gray-800 shadow-2xl z-50 w-40">
//               <p className="p-2 border-b border-gray-300 text-sm">
//                 {users.prenom}
//               </p>
//               <p
//                 className="p-2 border-b border-gray-300 text-sm text-red-500 cursor-pointer"
//                 onClick={handleLogout}
//               >
//                 Déconnexion
//               </p>
//             </div>
//       )}
        
//       </div>
//     </div>
//   );
// };

// export default HeaderAdmin;

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Avatar } from "@mui/material";
import AuthContext from "../../Contexts/AuthContext";

const HeaderAdmin = ({ onSearch }) => {
  const [affichage, setAffichage] = useState(false);
  const { users, setUsers } = useContext(AuthContext);
  const navigate = useNavigate();

  const change = () => setAffichage(!affichage);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsers(null);
    navigate("/");
  };

  if (!users) return null;

  return (
    <div className="flex items-center justify-between bg-gray-100 p-2 px-3 shadow-lg mb-6 sticky top-0 z-50">
      {/* Search bar */}
      <div className="flex-1 flex justify-start sm:justify-center sm:mr-4">
        <SearchBar onSearch={onSearch} />
      </div>

      {/* Avatar & user info */}
      <div
        className="flex items-center gap-2 relative cursor-pointer ml-4
                  before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2
                  before:w-[2px] before:bg-gray-700 before:opacity-50 before:mr-2 before:ml-[-8px]"
        onClick={change}
      >
        {/* Avatar (responsive size) */}
        <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-amber-300 overflow-hidden border border-gray-800">
          <Avatar sx={{ width: "100%", height: "100%" }} />
        </div>

        {/* Texte à côté de l'avatar, masqué sur petits écrans */}
        <div className="hidden sm:flex flex-col">
          <p className="font-medium text-gray-700 text-sm">{users.prenom}</p>
          <p className="font-light text-gray-500 text-xs">Administrateur</p>
        </div>

        {/* Dropdown menu */}
        {affichage && (
          <div className="absolute top-12 right-0 flex flex-col gap-2 p-3 rounded bg-white text-gray-800 shadow-2xl z-50 w-40">
            <p className="p-2 border-b border-gray-300 text-sm">
              {users.prenom}
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
