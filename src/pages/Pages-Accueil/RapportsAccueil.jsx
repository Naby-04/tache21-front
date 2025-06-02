import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RapportsPages } from "../../Composants/Composants-Accuiel/RapportsPages";
import { Link } from "react-router-dom";
import { SidebarAccuiel } from "../../Composants/Composants-Accuiel/SidebarAccuiel";
import  logo  from "../../assets/SenRapport.png"

function RapportsAccueil() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="w-full fixed top-0 py-2 z-50 bg-white">
        <nav className="md:w-[95%] bg-gray-800 shadow-md rounded-full mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Burger for mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white text-2xl lg:hidden"
            >
              ☰
            </button>
            <Link to="/" className="text-2xl font-bold text-white">
              <div className="flex items-center gap-2">
                        <img
                          src={logo}
                          alt="Logo"
                          className="w-26"
                        />
                        {/* <span className="text-md md:text-xl font-bold text-amber-300">SenRapport</span> */}
                      </div>
            </Link>
          </div>

          {/* Search bar */}
          <div className="relative w-1/2 max-w-md hidden sm:block">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-full border border-gray-300 focus:outline-none bg-white text-sm"
            />
            <FiSearch className="absolute left-2 top-3 text-gray-500" />
          </div>

          {/* Connexion button */}
          <div className="flex items-center space-x-3">
            <Link
              to="/connexion"
              className="ml-4 px-4 py-2 bg-amber-400 text-white rounded-full hover:bg-amber-500 transition"
            >
              Connexion
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 flex lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-black opacity-40" />

          <div
            className="relative z-50 w-[260px] h-full bg-amber-100 shadow-xl animate-slide-in-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-3">
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <SidebarAccuiel
              setActiveCategory={(value) => {
                setActiveCategory(value);
                setSidebarOpen(false); 
              }}
              isMobile={true}
            />
          </div>
        </div>
      )}

      {/* desktop*/}
      <div className="pt-[80px] flex">
        <aside className="hidden text-gray-800 lg:block w-[260px] fixed top-[80px] left-0 bottom-0 shadow-lg z-30 p-4 overflow-y-auto bg-white">
          <SidebarAccuiel
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
          />
        </aside>

        {/*Contenue */}
        <main className="w-full lg:ml-[260px] px-4 py-6">
          <RapportsPages
            searchTerm={searchTerm}
            activeCategory={activeCategory}
          />
        </main>
      </div>
    </div>
  );
}

export default RapportsAccueil;
