import React from "react";
import '../../index.css'

const StatsBox = ({image, titre, valeur, icone, pourcent}) => {
  console.log(icone)
  return (
    <div className="flex bg-gray-800 rounded-lg border border-gray-300 items-center w-full relative overflow-hidden p-2">
      <img src={image} alt="" className="absolute w-full h-full inset-0 z-0 opacity-10" />
      <div className="flex flex-col p-3 relative w-full">
        <div className="flex justify-between text-white">
          <div>
            <h6 className="text-sm">{titre}</h6>
            <h3 className="text-3xl font-bold">{valeur}</h3>
          </div>
          <div className="p-6 w-10 h-10 flex items-center justify-center bg-[var(--secondary-color)] opacity-75 rounded"><span className="text-xl text-[var(--primary-color)]">{icone}</span></div>
        </div>
        <div className="mt-12">
          <div className="flex items-center gap-3">
            <span className="rounded p-1 bg-[var(--secondary-color)] opacity-50 text-[var(--primary-color)]">+{pourcent}%</span>
            <span className="text-white">Last Month</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default StatsBox;
