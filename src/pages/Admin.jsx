import React from "react";
import "../index.css";
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
        <div className="p-2 col-span-9 row-span-8 border">
          <div
            style={{ backgroundColor: "var(--primary-color)" }}
            className="p-3"
          >
            stats
          </div>
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
