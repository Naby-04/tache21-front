import { useState } from "react";
import SearchBar from "./SearchBar"
import { Avatar } from "@mui/material";


const HeaderAdmin = ({ onSearch }) => {

  const [affichage, setAffichage] = useState(false)

  const change = () => {
    setAffichage(!affichage)
  }

  return (
    <div className="flex items-center justify-evenly bg-gray-100 p-2 px-3 shadow-lg mb-6 sticky top-0 z-50">
      <div className="flex-1 mx-auto">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="flex items-center gap-1 flex-col-reverse relative">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-300 overflow-hidden border border-gray-800 cursor-pointer" onClick={change}>
          {<Avatar />}
        </div>
        {affichage && <div className="flex flex-col gap-2 p-3 rounded bg-white text-gray-800 absolute top-10 transition duration-100 right-[-10px] shadow-2xl">
          <p className="p-2 border-b border-gray-800 cursor-pointer text-sm" onClick={() => setAffichage(false)}>Admin</p>
          <p className="p-2 border-b border-gray-800 cursor-pointer text-sm" onClick={() => setAffichage(false)}>Deconnexion</p>
        </div>}
        
      </div>
    </div>
  );
};

export default HeaderAdmin;