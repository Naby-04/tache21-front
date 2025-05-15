// import { FaLightbulb } from "react-icons/fa"; // Ou n'importe quelle autre icône

const Service = ({service}) => {
  return (
      <div className="flex flex-col items-center text-center px-4 max-w-xl">
        {/* Icône centrée */}
        <div className="text-gray-800 text-4xl mb-4 flex h-25 w-25 border border-gray-800 items-center justify-center rounded-full">
            {service.icone}
        </div>

        {/* Titre */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">
           {service.titre}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base">
            {service.description}
        </p>
      </div>
  );
};

export default Service;
