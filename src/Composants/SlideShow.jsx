import React from 'react';
import hero from '../assets/hero.png';

const SlideShow = () => {
  return (
    <section className="relative bg-gradient-to-r from-amber-100 via-white to-amber100 py-16 px-8 flex flex-col-reverse md:flex-row items-center justify-between overflow-hidden">

    {/* Background décoratif */}
    {/* <div className="absolute -top-10 -left-10 w-[300px] h-[300px] bg-amber-100 rounded-full opacity-40 z-0"></div>
    <div className="absolute top-20 right-0 w-[250px] h-[250px] bg-yellow-700 rounded-[60%] rotate-45 opacity-40 z-0"></div> */}
  
    {/* Texte gauche */}
    <div className="max-w-2xl z-10">
      <h1 className="text-4xl font-[var(--font-title)] text-black leading-tight">
        Publiez vos rapports, <span className="text-yellow-700">explorez ceux des autres</span><br />
        commentez, téléchargez <span className="text-black">visualisez</span>
      </h1>
      <p className="text-gray-700 mt-4">
        et faites partie d’une communauté de savoir en évolution.
      </p>
      <button className="mt-8 bg-yellow-700 text-white px-6 py-3 rounded-full flex items-center gap-2 font-semibold transition">
        Découvrir les meilleurs rapports
      </button>
    </div>
  
    {/* Image droite */}
    <div className="relative w-full md:w-[45%] mb-8 md:mb-0 z-10">
      <img src={hero} alt="formation" className="w-full max-w-sm mx-auto" />
    </div>
  </section>
  
  );
};

export default SlideShow;
