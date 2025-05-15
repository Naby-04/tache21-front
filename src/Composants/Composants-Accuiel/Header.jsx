import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import {  Link as ScrollLink} from "react-scroll";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 pt-2 z-80 bg-white">
      <div className="md:w-[95%] bg-gray-800 shadow-md rounded-full mx-auto flex items-center justify-between px-4 py-4">

        <div className="flex items-center justify-between gap-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain bg-amber-300 rounded-full" />
          <span className="text-xl font-bold text-amber-300">SenRapport</span>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <nav className="hidden md:flex items-center gap-6 text-white text-sm font-medium">
          <Link to="/" className="hover:text-amber-300 transition active">Accueil</Link>
          <ScrollLink  to="services"  smooth={true} duration={500} offset={-70} className=" active-link">Services</ScrollLink>
          <ScrollLink to="rapports" smooth={true} duration={500} offset={-70} className=" active-link">Rapports</ScrollLink>
          <ScrollLink to="a-propos"  smooth={true}  duration={500}  offset={-70} className=" active-link">À propos</ScrollLink>
          <Link to="/connexion">
            <button className="ml-4 px-4 py-2 bg-amber-400 text-white rounded-full hover:bg-amber-500 transition">
          <a href="#" className="hover:text-amber-300 transition">Accueil</a>
          <a href="#" className="hover:text-amber-300 transition">Services</a>
          <Link to="/rapports"><a href="#" className="hover:text-amber-300 transition">Rapports</a></Link>
          <a href="#" className="hover:text-amber-300 transition">À propos</a>
          
        </nav>

        <Link to="/connexion">
            <span className="ml-4 px-4 py-2 bg-amber-400 text-white rounded-full hover:bg-amber-500 transition">
              Connexion
            </span>
        </Link>
      </div>

      {isOpen && (
        <nav className="md:hidden flex flex-col items-start gap-4 px-6 pb-4 bg-gray-800 text-white font-medium">
          <Link to="/" className="hover:text-amber-300">Accueil</Link>
          <Link to="services" className="hover:text-amber-300">Services</Link>
          <Link to="rapports" className="hover:text-amber-300">Rapports</Link>
          <Link to="a-propos" className="hover:text-amber-300">À propos</Link>
          <button className="mt-2 px-4 py-2 bg-amber-400 text-white rounded-full hover:bg-amber-500 transition">
            Connexion
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
