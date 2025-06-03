import React from "react";
import "../../index.css";

const StatsBox = ({ image, titre, valeur, icone }) => {
  return (
    <div className="flex bg-gray-800 rounded-lg border border-gray-300 items-center w-full relative overflow-hidden p-2 transition-transform duration-300 hover:scale-102 hover:shadow-lg cursor-pointer">
      <img
        src={image}
        alt=""
        className="absolute w-full h-full inset-0 z-0 opacity-10"
      />
      <div className="flex flex-col p-3 relative w-full">
        <div className="flex justify-between text-white">
          <div>
            <h6 className="text-sm">{titre}</h6>
            <h3 className="text-3xl font-bold">{valeur}</h3>
          </div>
          <div className="p-6 w-10 h-10 flex items-center justify-center bg-gray-100 rounded">
            <span className="text-xl text-[var(--primary-color)]">{icone}</span>
          </div>
        </div>
        <div className="mt-12">
          <div className="p-1 w-20 h-8 flex flex-col relative items-center gap-3">
            <span className="p-[1px] rounded bg-gray-300 absolute w-[50%] top-[20%] left-0">
              {/* +{pourcent}% */}
            </span>
            <span className="p-[1px] rounded bg-amber-300 absolute w-[50%] top-[50%] left-[10%]">
              {/* +{pourcent}% */}
            </span>
            <span className="p-[1px] rounded bg-gray-300 absolute w-[50%] top-[80%] left-0">
              {/* +{pourcent}% */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBox;
