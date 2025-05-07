import React from "react";
// import Dashboard from "./Dashbord";
import Users from "./Users";
// import StatsBox from "../Composants/composants de la page admin/StatsBox";
import "../index.css";
import { LuUsers } from "react-icons/lu";
import { BsFillFileTextFill } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import StatsBox from "../Composants/composants de la page admin/StatsBox";

const Admin = () => {
  return (
    <div className="h-screen border rounded-md grid grid-cols-12 grid-rows-12 gap-1">
      {/* partie composant navbar */}
      <div className="p-2 col-span-10 col-start-3 row-span-2 border">
        <div
          style={{
            backgroundColor: "var(--primary-color)",
          }}
          className="p-3 rounded-md "
        >
          navbar
        </div>
      </div>
      {/* partie composant navbar exit */}
      {/* partie composant sidebar*/}
      <div className="p-2 col-span-2 row-span-12 row-start-1 border">
        <div
          style={{
            backgroundColor: "var(--primary-color)",
          }}
          className="p-3"
        >
          sidebar
        </div>
      </div>
      {/* partie composant sidebar exit*/}
      {/* partie composant stats */}
      <div className="p-2 col-span-7 row-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 border-gray-300 rounded border-1 shadow ">
          <StatsBox titre="Utilisateurs" valeur="150" icone={<LuUsers />} />
          <StatsBox titre="Rapports" valeur="800" icone={<BsFillFileTextFill />} />
          <StatsBox titre="Rapports Télécharger" valeur="450" icone={<FaFileDownload />} />
          <StatsBox titre="Top Téléchargement" valeur="75" icone={<FaDownload />} />
      </div>
      {/* partie composant stats exit*/}
      {/* partie composant Table utilisateur*/}
      <div className="sm:col-span-7 row-span-5 col-span-10 border-gray-300 rounded border-1 p-2 shadow overflow-y-hidden">
        <Users />
      </div>
      {/* partie composant Table utilisateur exit*/}
      {/* partie composant liste top rapports */}
      <div className="p-2 col-span-3 sm:row-span-10 sm:row-start-3 row-span-5 sm:col-start-10 col-start-10 row-start-3 border">
        <div
          style={{
            backgroundColor: "var(--primary-color)",
          }}
          className="p-3"
        >
          liste top rapports
        </div>
      </div>
      {/* partie composant liste top rapports exit*/}
    </div>
  );
};

export default Admin;
