import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Header.css";
import logo from '../../assets/SenRapport.png'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="w-full fixed top-0 pt-2 z-80 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-2 before:bg-white">
      <div className="w-[95%] bg-gray-800 shadow-md rounded-full mx-auto flex items-center justify-between px-4 py-4 md:border-0 border-1 border-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-26 cursor-pointer"
          />
          {/* <span className="text-md md:text-xl font-bold text-amber-300">SenRapport</span> */}
        </div>

        {/* Bouton hamburger mobile */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-white text-sm font-medium">
          {["show", "services", "rapports", "a-propos"].map((section, index) => (
            <ScrollLink
              key={index}
              to={section}
              smooth={true}
              duration={500}
              offset={section === "show" ? -150 : -150} // Ajuste selon les sections
              spy={true}
              activeClass="active-link"
              className="cursor-pointer transition hover:text-amber-300"
            >
              {section === "show"
                ? "Accueil"
                : section === "services"
                ? "Services"
                : section === "rapports"
                ? "Rapports"
                : "À propos"}
            </ScrollLink>
          ))}
        </nav>


        <Link to="/connexion" className="hidden md:block">
          <button className="ml-4 px-4 py-2 bg-amber-400 text-gray-800 rounded-full hover:bg-white hover:text-gray-800 transition cursor-pointer">
            Connexion
          </button>
        </Link>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <nav className="md:hidden flex flex-col items-center rounded-2xl max-w-[95%] mx-auto gap-4 px-6 py-4 bg-gray-800 text-white mt-1 font-medium border-1 md:border-0 border-white">
          {["show", "services", "rapports", "a-propos"].map((section, index) => (
            <ScrollLink
              key={index}
              to={section}
              smooth={true}
              duration={500}
              offset={section === "show" ? -80 : -90}
              spy={true}
              activeClass="active-link"
              onClick={closeMenu}
              className="cursor-pointer transition hover:text-amber-300"
            >
              {section === "show"
                ? "Accueil"
                : section === "services"
                ? "Services"
                : section === "rapports"
                ? "Rapports"
                : "À propos"}
            </ScrollLink>
          ))}
          <Link to="/connexion">
            <button className="mt-2 px-4 py-2 bg-amber-300 text-gray-800 rounded-full hover:bg-white hover:text-gray-800 transition cursor-pointer">
              Connexion
            </button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
