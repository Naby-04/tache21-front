import React from 'react';
import Animation from './Animation';

function ProjectDescription() {
  return (
  <div className='relative flex justify-center'>
    <Animation/>
    <section id="a-propos" className="px-6 to-yellow-50 mt-5 mb-30">
      <div className="flex justify-center mb-8 mt-5">
        <h2 className="relative text-2xl font-bold text-gray-800 after:content-[''] after:block after:h-[3px] after:w-[50%] after:mx-auto after:bg-amber-300 after:mt-2">A propos de nous</h2>
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 md:p-20 border border-gray-200">
        <p className="text-gray-800 text-md leading-relaxed font-[Inter] text-center">
          Notre plateforme est un espace collaboratif ouvert à tous permettant la <span className="font-bold text-gray-800">publication</span>, le
          <span className="font-bold text-gray-800"> commentaire</span> et le
          <span className="font-bold text-gray-800"> téléchargement</span> de rapports ou mémoires. Elle a pour vocation de promouvoir 
           le <span className="italic">partage de connaissances</span> et de valoriser les <span className="italic">travaux de recherches</span> au sein de la 
           communauté academique, mais également auprès d'un public plus large. En facilitant l'accès libre aux contenus, elle encourage l'échange 
           d'idées, l'apprentissage continu et la visibilité des auteurs.
        </p>
      </div>
    </section>
      </div>
  );
}

export default ProjectDescription;
