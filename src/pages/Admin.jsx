import React from "react";
import "../index.css";
import { LuUsers } from "react-icons/lu";
import { BsFillFileTextFill } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import StatsBox from "../Composants/composants de la page admin/StatsBox";
import Image from '../assets/back1.jpg'
import Image2 from '../assets/back2.jpg'
import Image3 from '../assets/back3.jpg'
import Image4 from '../assets/back4.jpg'

import SearchBar from "../Composants/composants de la page admin/SearchBar";

const Admin = () => {
  return (
    <div className="p-2 h-screen grid grid-cols-12 grid-rows-12 gap-1">
      {/* Sidebar */}
      <div className="p-2 col-span-3 row-span-12 row-start-1 border">
        <div
          style={{ backgroundColor: "var(--primary-color)" }}
          className="p-3"
        >
          sidebar
        </div>
      </div>

      {/* Navbar */}
      <div className="col-span-9 col-start-4 row-span-1 border flex items-center justify-center">
        <SearchBar />
      </div>

      {/* Scrollable wrapper pour stats, table, diagramme */}
      <div className="col-span-9 col-start-4 row-span-11 row-start-2 overflow-y-auto grid grid-cols-12 grid-rows-12 gap-1">
        {/* Stats */}
        <div className="p-2 col-span-9 row-span-8 grid grid-cols-2 gap-2">
            <StatsBox titre="Utilisateurs" image={Image} pourcent="30" icone={<LuUsers />} valeur="200" />
            <StatsBox titre="Rapports" image={Image2} pourcent="30" icone={<LuUsers />} valeur="500" />
            <StatsBox titre="Telechargement" image={Image3} pourcent="30" icone={<LuUsers />} valeur="67" />
            <StatsBox titre="Top Rapports" image={Image4} pourcent="30" icone={<LuUsers />} valeur="700" />
        </div>

        {/* Table top rapports */}
        <div className="p-2 row-span-5 col-span-12 border">
          <div
            style={{ backgroundColor: "var(--primary-color)" }}
            className="p-3"
          >
            table top rapports
          </div>
        </div>

        {/* Diagramme */}
        <div className="p-2 col-span-3 row-span-8 col-start-10 row-start-1 border">
          <div
            style={{ backgroundColor: "var(--primary-color)" }}
            className="p-3"
          >
            Diagramme
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
