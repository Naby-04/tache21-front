import { FaShareAlt, FaSearch, FaCloudUploadAlt } from "react-icons/fa";
import Service from "./Service";

const services = [
  {
    titre: "Partage Facile",
    description: "Téléchargez et partagez vos rapports en quelques clics avec toute la communauté.",
    icone: <FaCloudUploadAlt />,
  },
  {
    titre: "Recherche Avancée",
    description: "Trouvez rapidement les rapports qui vous intéressent grâce à un moteur de recherche intelligent.",
    icone: <FaSearch />,
  },
  {
    titre: "Diffusion Large",
    description: "Diffusez vos travaux auprès d’un large public d'étudiants, chercheurs et professionnels.",
    icone: <FaShareAlt />,
  },
];

const LesServices = () => {
  return (
    <section id="services">
    <div className="w-full my-10 px-4">
      {/* <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Services</h2> */}
      <div className="flex justify-center mb-8">
        <h2 className="relative text-2xl font-bold text-gray-800 after:content-[''] after:block after:h-[3px] after:w-[50%] after:mx-auto after:bg-amber-300 after:mt-2">Services</h2>
      </div>
      <div className="w-full bg-gray-100 py-15">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((element, index) => (<Service key={index} service={element} />))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default LesServices;
