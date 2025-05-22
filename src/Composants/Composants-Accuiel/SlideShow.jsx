// import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import background from "../../assets/background.jpg"


const SlideShow = () => {
  return (
  <div className="relative h-[425px] slideshow-bg mx-auto overflow-hidden rounded-none md:rounded-2xl shadow-lg mt-28 mb-15 w-100% md:w-[95%] bg-amber-100">
  {/* Superposition */}
  <div className="relative h-full w-full">
    <div className="absolute top-0 left-0 w-[100%] md:w-[90%] h-[20%] bg-gray-100 opacity-80 rounded-none md:rounded-br-xl shadow-lg z-10"></div>
    <div className="absolute top-[20%] left-0 w-[100%] md:w-[80%] h-[20%] bg-gray-100 opacity-80 rounded-none md:rounded-br-xl shadow-lg z-20"></div>
    <div className="absolute top-[40%] left-0 w-[100%] md:w-[70%] h-[20%] bg-gray-100 opacity-80 rounded-none md:rounded-br-xl shadow-lg z-30"></div>
    <div className="absolute top-[60%] left-0 w-[100%] md:w-[60%] h-[20%] bg-gray-100 opacity-80 rounded-none md:rounded-br-xl shadow-lg z-40"></div>
    <div className="absolute bottom-0 left-0 w-[100%] md:w-[50%] h-[20%] bg-gray-100 opacity-80 rounded-none md:rounded-br-xl shadow-lg z-50"></div>

    {/* Image */}
    <img src={background} alt="" className="absolute z-0 right-0 h-full w-full object-cover" />
  </div>

  {/* Texte centré responsive */}
  <div className="absolute inset-0 z-60 flex flex-col items-center md:items-start justify-center text-start px-4 sm:px-8 gap-3">
    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
      Plateforme de Partage de rapports
    </p>
    <p className="text-center md:text-start sm:text-lg md:text-xl max-w-xl text-gray-800 font-semibold mb-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora soluta natus aut atque ut unde eveniet...
    </p>
    <Link to="/rapports">
      <button className="mt-3 bg-amber-300 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition">
        Découvrir les meilleurs rapports
      </button>
    </Link>
  </div>

  {/* Dégradé */}
  <div className="absolute top-0 left-0 w-full h-full z-50 rounded-xl bg-gradient-to-r from-white/80 via-white/20 to-white/5 pointer-events-none"></div>

  {/* <div className="absolute top-0 left-0 w-full h-full z-50 rounded-xl bg-gradient-to-br from-black/40 via-transparent to-black/30 pointer-events-none"></div> */}
</div>


  );
};

export default SlideShow;