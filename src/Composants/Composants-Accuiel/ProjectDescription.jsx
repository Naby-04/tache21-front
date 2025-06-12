import React from "react";
// import Animation from './Animation';

function ProjectDescription() {
  return (
    <div className="relative flex justify-center">
      {/* <Animation/> */}
      <section id="a-propos" className="to-yellow-50 my-6 mb-30 w-full">
        <div className="flex justify-center mb-8 mt-5">
          <h4 className="relative text-2xl font-bold text-gray-800 after:content-[''] after:block after:h-[3px] after:w-[50%] after:mx-auto after:bg-amber-300 after:mt-2">
            A propos de nous
          </h4>
        </div>
        <div className="w-full py-10 bg-gray-100 px-3">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10 md:p-20 border border-gray-200">
            <p className="text-gray-800 text-sm md:text-md leading-relaxed font-[Inter] text-justify">
              Notre plateforme est un espace collaboratif ouvert à tous,
              permettant la{" "}
              <span className="font-bold text-gray-800">publication</span>, le
              <span className="font-bold text-gray-800"> commentaire</span> et
              le
              <span className="font-bold text-gray-800">
                {" "}
                téléchargement
              </span>{" "}
              de rapports ou mémoires. Elle a pour vocation de promouvoir le
              partage de connaissances et de valoriser les travaux de recherches
              au sein de la communauté academique, mais également auprès d'un
              public plus large. En facilitant l'accès libre aux contenus, elle
              encourage l'échange d'idées, l'apprentissage continu et la
              visibilité des auteurs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectDescription;
