import SearchBar from "./SearchBar"
import { Avatar } from "@mui/material";


const HeaderAdmin = ({ onSearch }) => {
  return (
    <div className="flex items-center justify-evenly bg-gray-100 p-2 px-3 shadow-lg mb-6 sticky top-0 z-50">
      <div className="flex-1 mx-auto">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="flex items-center gap-1 flex-col-reverse">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-300 overflow-hidden border border-gray-800 cursor-pointer">
          {<Avatar />}
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;