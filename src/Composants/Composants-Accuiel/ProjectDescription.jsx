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
          Cette plateforme permet aux étudiants de <span className="font-semibold text-yellow-700">publier</span>, 
          <span className="font-semibold text-yellow-700"> commenter</span> et 
          <span className="font-semibold text-yellow-700"> télécharger</span> des rapports ou mémoires librement. 
          Accessible à tous, elle favorise le <span className="italic">partage de connaissances</span> au sein de la communauté académique.
        </p>
      </div>
    </section>
      </div>
  );
}

export default ProjectDescription;
