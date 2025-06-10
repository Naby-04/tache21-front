import { FaDownload, FaFileAlt, FaCommentAlt } from "react-icons/fa";
import Service from "./Service";

const services = [
  {
    titre: "Publication",
    description: "Mettez en ligne vos rapports en quelques étapes, et c’est partagé !",
    icone: <FaFileAlt />,
  },
  {
    titre: "Téléchargement",
    description: "Accédez et téléchargez les rapports partagés par d'autres utilisateurs en toute simplicité.",
    icone: <FaDownload />,
  },
  {
    titre: "Interaction",
    description: "Commentez les rapports pour échanger, poser des questions ou donner votre avis.",
    icone: <FaCommentAlt />,
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
