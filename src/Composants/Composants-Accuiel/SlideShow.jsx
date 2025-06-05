import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import accueil from "../../assets/accueilt.png";
import test from "../../assets/test 1.png";
import testi from "../../assets/test 2.png";

import RainbowMessages from "./Animation";

const SlideShow = () => {
  const images = [accueil, test, testi];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Timer qui gère l’affichage + transition
    const displayTime = 5000;  // 5 secondes affichage
    const transitionTime = 1000; // 1 seconde transition

    const interval = setInterval(() => {
      // Démarre la transition (image sort)
      setIsTransitioning(true);

      // Après la transition, change d’image
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false); // Fin transition
      }, transitionTime);
    }, displayTime + transitionTime);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="show" className="w-full">
      <div className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[100vh] mx-auto overflow-hidden pt-20 md:pt-30 mb-10 w-full px-4">
        <div className="absolute inset-0 z-40 bg-gradient-to-l from-gray-300/20 via-white/0 to-transparent pointer-events-none"></div>

        <div className="relative w-full h-full flex flex-col-reverse md:flex-row items-center justify-center bg-white">
          {/* Texte */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-6 pt-6 pb-8 md:px-12 z-50">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5" style={{fontFamily: "var(--font-subtitle)", color: "rgb(30, 41, 57)"}}>
              Plateforme de Partage de rapports
            </h1>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-xl">
              Des idées partagées, des rapports qui parlent, une communauté qui grandit et inspire demain.
            </p>
            <Link to="/rapports">
              <button className="bg-gray-800 mt-3 text-amber-300 px-6 py-3 rounded-full font-semibold hover:bg-amber-300 hover:text-gray-800 transition cursor-pointer shadow">
                Découvrir les meilleurs rapports
              </button>
            </Link>
          </div>

          {/* Image avec transition */}
          {/* <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-0 z-50 overflow-hidden max-h-[400px] relative">
            <img
              src={images[currentIndex]}
              alt="illustration"
              className={`w-full h-auto max-h-[400px] object-contain
                transition-all duration-1000 ease-in-out
                ${isTransitioning ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"}`}
            />
          </div> */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-0 z-50 overflow-hidden relative">
            <img
              src={images[currentIndex]}
              alt="illustration"
              className={`max-w-full h-auto object-contain
                transition-all duration-1000 ease-in-out
                ${isTransitioning ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"}
                max-h-[220px] sm:max-h-[280px] md:max-h-[360px] lg:max-h-[420px]`}
            />
          </div>

        </div>

        <RainbowMessages />

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/70 via-white/10 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default SlideShow;