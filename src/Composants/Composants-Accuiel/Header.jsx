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
    <header className="w-full fixed top-0 pt-2 z-80">
      <div className="w-[95%] bg-gray-800 shadow-md rounded-full mx-auto flex items-center justify-between px-4 py-4 md:border-0 border-1 border-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-26"
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
          <button className="ml-4 px-4 py-2 bg-amber-400 text-gray-800 rounded-full hover:bg-white hover:text-gray-800 transition">
            Connexion
          </button>
        </Link>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <nav className="md:hidden flex flex-col items-center rounded-2xl max-w-[95%] mx-auto gap-4 px-6 py-4 bg-gray-800 text-white mt-1 font-medium">
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
            <button className="mt-2 px-4 py-2 bg-amber-300 text-gray-800 rounded-full hover:bg-white hover:text-gray-800 transition">
              Connexion
            </button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;


// import { useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { Link } from "react-router-dom";
//  import {  Link as ScrollLink} from "react-scroll";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="w-full fixed top-0 pt-2 z-80 bg-white">
//       <div className="md:w-[95%] bg-gray-800 shadow-md rounded-full mx-auto flex items-center justify-between px-4 py-4">

//         <div className="flex items-center gap-2">
//           <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain bg-amber-300 rounded-full" />
//           <span className="text-xl font-bold text-amber-300">SenRapport</span>
//         </div>

//         <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//         </button>

//         <nav className="hidden md:flex items-center gap-6 text-white text-sm font-medium">
//           <ScrollLink to="show" smooth={true} duration={500} offset={-70} className="hover:text-amber-300 transition active">Accueil</ScrollLink>
//           <ScrollLink  to="services"  smooth={true} duration={500} offset={-70} className=" active-link">Services</ScrollLink>
//           <ScrollLink to="rapports" smooth={true} duration={500} offset={-70} className=" active-link">Rapports</ScrollLink>
//           <ScrollLink to="a-propos"  smooth={true}  duration={500}  offset={-70} className=" active-link">À propos</ScrollLink>
//         </nav>
//           <Link to="/connexion">
//             <button className="ml-4 px-4 py-2 bg-amber-400 text-white rounded-full hover:bg-white hover:text-gray-800 cursor-pointer transition">
//               Connexion
//             </button>
//           </Link>
//       </div>

//       {isOpen && (
//         <nav className="md:hidden flex flex-col items-start gap-4 px-6 pb-4 bg-gray-800 text-white font-medium">
//           <ScrollLink to="show" className="hover:text-amber-300">Accueil</ScrollLink>
//           <ScrollLink to="services" className="hover:text-amber-300">Services</ScrollLink>
//           <ScrollLink to="rapports" className="hover:text-amber-300">Rapports</ScrollLink>
//           <ScrollLink to="a-propos" className="hover:text-amber-300">À propos</ScrollLink>
//           <button className="mt-2 px-4 py-2 bg-amber-300 text-white rounded-full hover:bg-white hover:text-gray-800 cursor-pointer transition">
//             Connexion
//           </button>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;
