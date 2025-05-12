import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 fixed top-0 left-0 w-full z-50 shadow">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </div>

        {/* Burger icon */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-white pb-0 border-b-2 border-transparent border-white transition duration-300">Accueil</a>
          <Link to="/rapports" className="text-white pb-0 border-b-2 border-transparent hover:border-white transition duration-300">Rapports</Link>
          <Link to="/inscription">  <button className="bg-white text-black px-6 py-2 rounded hover:bg-amber-200 transition">
            Connexion
          </button></Link>
        </nav>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="md:hidden flex flex-col items-start gap-4 px-6 pb-4 bg-[var(--primary-color)]">
          <a href="#" className="text-white hover:text-gray-200">Accueil</a>
          <Link to="/rapports" className="text-white hover:text-gray-200">Rapports</Link>
         <Link to="/inscription"> <button className="bg-white text-black px-6 py-2 rounded hover:bg-amber-200 transition">
            Connexion
          </button>
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
