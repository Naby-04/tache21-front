import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recherche :", searchTerm);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center border rounded-md px-2 py-1 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-2 py-1 outline-none"
        />
        <button type="submit" className="text-gray-600 hover:text-black">
          <FiSearch size={20} />
        </button>
      </form>
    </>
  );
};

export default SearchBar;
