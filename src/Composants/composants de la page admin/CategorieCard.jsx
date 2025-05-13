import React from "react";

const CategorieCard = ({ icon, label, selected }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-xl transition 
              ${
                selected ? "bg-white shadow-md" : "bg-transparent"
              } cursor-pointer`}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <p className="text-center font-medium text-gray-800">{label}</p>
    </div>
  );
};

export default CategorieCard;
