import React from "react";
import '../../index.css'

const StatsBox = ({titre, valeur, icone}) => {
  return <div className="flex p-4 bg-white rounded-lg border border-gray-300 flex-col items-center w-full min-w-56">
    <div className="h-25 w-25 rounded-full p-4 border border-[var(--primary-color)] mb-4 flex items-center justify-center text-4xl text-[var(--background-color)] bg-[var(--primary-color)]">
      {icone}
    </div>
    <div className="text-center">
      <p className="text-sm text-gray-800">{titre}</p>
      <h2 className="font-bold text-3xl text-[var(--primary-color)]">{valeur}</h2>
    </div>
  </div>;
};

export default StatsBox;
