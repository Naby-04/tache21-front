import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { categories} from "../../data/Categorie"
import { RapportsPages } from "../../Composants/Composants-Accuiel/RapportsPages";
import { Link } from "react-router-dom";

function RapportsAccueil() {
  const [activeCategory, setActiveCategory] = useState(categories[0].value);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  return (
    <>
    <div className="w-full min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-6 py-3 bg-gray-800 shadow fixed w-full top-0 z-50">
        <div className="flex items-center gap-4">
          {/* Burger for mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white text-2xl lg:hidden"
          >
            ☰
          </button>
          <Link to="/" className="text-2xl font-bold text-white">Logo</Link>
        </div>

        {/* Search bar */}
        <div className="relative w-1/2 max-w-md hidden sm:block">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded border border-gray-300 focus:outline-none bg-white text-sm"
          />
          <FiSearch className="absolute left-2 top-2.5 text-gray-500" />
        </div>

        {/* User section */}
        <div className="flex items-center space-x-3">
          <Link  to="/connexion" className="bg-white text-gray-800 px-4 py-1.5 rounded hover:bg-amber-200 transition text-sm">
            Connexion
          </Link>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="bg-white w-[250px] h-full p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold">Catégories</p>
              <button onClick={() => setSidebarOpen(false)} className="text-xl">
                ✕
              </button>
            </div>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.value}>
                  <Link to="/"
                    
                    onClick={() => {
                      setActiveCategory(cat.value);
                      setSidebarOpen(false);
                    }}
                    className={`block text-sm font-semibold px-4 py-2 rounded transition cursor-pointer ${
                      activeCategory === cat.value
                        ? "bg-gray-100 text-gray-800"
                        : "text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="pt-[70px] flex">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block w-[250px] fixed top-[70px] left-0 bottom-0 shadow-lg z-30 p-4 overflow-y-auto bg-white">
          <p className="text-2xl font-semibold mb-6 text-center">Catégories</p>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.value}>
                <Link to=""
                  onClick={() => setActiveCategory(cat.value)}
                  className={`block text-sm font-semibold px-4 py-2 rounded transition cursor-pointer ${
                    activeCategory === cat.value
                      ? "bg-gray-100 text-gray-800"
                      : "text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="w-full lg:ml-[250px] px-4 py-6">
          <RapportsPages searchTerm={searchTerm} />
        </main>
      </div>
    </div>
    </>
  );
}

export default RapportsAccueil;
