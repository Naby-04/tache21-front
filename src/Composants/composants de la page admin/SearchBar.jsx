import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    console.log("Recherche :", searchTerm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center shadow rounded px-2 py-1 
        w-full sm:max-[250px] md:max-w-[350px] bg-white 
        border border-gray-300 transition-all duration-200"
    >
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleChange}
        className="flex-1 px-2 py-1 outline-none text-sm"
      />
      <button type="submit" className="text-gray-600 hover:text-black">
        <FiSearch size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
