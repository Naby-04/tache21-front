import React from "react";
// import Dashboard from "./Dashbord";
import Users from "./Users";
// import StatsBox from "../Composants/composants de la page admin/StatsBox";
import "../index.css";

const Admin = () => {
  return (
    <div className="p-2 h-screen border rounded-md grid grid-cols-12 grid-rows-12 gap-1">
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
      <div className="p-2 col-span-7 row-span-5 border">
        <div
          style={{
            backgroundColor: "var(--primary-color)",
          }}
          className="p-3"
        >
          stats
        </div>
      </div>
      {/* partie composant stats exit*/}
      {/* partie composant Table utilisateur*/}
      <div className="p-2 sm:col-span-7 row-span-5 col-span-10 border">
        <div
          style={{
            backgroundColor: "var(--primary-color)",
          }}
          className="p-3"
        >
          table utilisateur
        </div>
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
