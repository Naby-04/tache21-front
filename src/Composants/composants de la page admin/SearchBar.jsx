import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const valeur = e.target.value
    setSearchTerm(valeur)
    onSearch(valeur)
    console.log("Recherche :", searchTerm);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center shadow rounded px-2 py-1 w-full max-w-md mx-auto bg-white border border-gray-300"
      >
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSubmit}
          className="flex-1 px-2 py-1 outline-none"
        />
        <button type="submit" className="text-gray-600 hover:text-black" onClick={handleSubmit}>
          <FiSearch size={20} />
        </button>
      </form>
    </>
  );
};

export default SearchBar;


// import { useState } from "react";

// const SearchBar = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearchChange = (event) => {
//     const value = event.target.value;
//     setSearchTerm(value);
//     onSearch(value); // Appel à la fonction parent pour filtrer les résultats
//   };

//   return (
//     <input
//       type="text"
//       value={searchTerm}
//       onChange={handleSearchChange}
//       placeholder="Rechercher un utilisateur..."
//       className="p-2 border rounded"
//     />
//   );
// };

// export default SearchBar;
