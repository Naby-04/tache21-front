import { Link, useNavigate } from "react-router-dom";

export const DetailsRapport = () => {
    const navigate= useNavigate()

    const handleGoBack = () => {
        navigate("/rapports")
    }
  return (
    <div className="w-full py-10 px-4 max-w-7xl mx-auto">
      {/* Image */}
      <div className="w-full h-[300px] rounded overflow-hidden shadow-md">
        <img
          src="../../../public/images/dev.jpg"
          alt="Rapport"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenu */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Infos à gauche */}
        <div className="bg-gray-100 text-gray-800 p-5 rounded w-full lg:w-1/3 shadow">
          <Link
            onClick={handleGoBack}
            className="block mb-4 text-blue-600 hover:underline text-sm"
          >
            ← Retour aux rapports
          </Link>

          <div className="mb-2">
            <strong className="block text-sm text-gray-500">Publié le</strong>
            <span className="text-base font-medium">10/10/2022</span>
          </div>

          <div className="mb-2">
            <strong className="block text-sm text-gray-500">Catégorie</strong>
            <span className="text-base font-medium">Informatique</span>
          </div>

          <div className="mt-4">
            <button className="bg-gray-600 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 transition">
              Télécharger
            </button>
          </div>
        </div>

        {/* Texte principal à droite */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Nom du rapport
          </h1>
          <p className="text-sm text-gray-700 leading-relaxed text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            voluptate ad minima voluptas unde corrupti, numquam distinctio qui
            totam molestiae, magni reiciendis aspernatur ipsum sit, ex provident
            eligendi impedit. Velit? Asperiores animi inventore maiores officia
            nisi sed at odit dignissimos nesciunt, illo commodi dolore alias ad
            rem similique recusandae quod iste fuga necessitatibus temporibus
            velit atque quos. Corrupti, recusandae impedit? Vel alias ipsam
            ducimus fuga, soluta vitae unde totam. Magnam et, fugiat vitae
            cupiditate sapiente pariatur quisquam, porro maxime omnis
            perspiciatis aliquid hic voluptatibus aut laborum, nulla ipsa quam
            facere?
          </p>
        </div>
      </div>
    </div>
  );
};
