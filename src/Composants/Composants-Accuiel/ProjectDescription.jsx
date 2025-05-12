import React from 'react';
import Animation from './Animation';

function ProjectDescription() {
  return (
  <div className='relative flex justify-center'>
    <Animation/>
    <section className="py-16 px-6 bg-gradient-to-br from-white to-yellow-50 mt-15">
        <h2 className="text-3xl font-bold text-yellow-800 mb-6 text-center font-[Merriweather]">
          À propos du projet
        </h2>
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-20 border border-yellow-100">
        <p className="text-gray-700 text-lg leading-relaxed font-[Inter] text-center">
          Notre plateforme est un espace collaboratif ouvert à tous permettant la <span className="font-semibold text-yellow-700">publication</span>, le
          <span className="font-semibold text-yellow-700"> commentaire</span> et le
          <span className="font-semibold text-yellow-700"> téléchargement</span> de rapports ou mémoires. Elle a pour vocation de promouvoir 
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
