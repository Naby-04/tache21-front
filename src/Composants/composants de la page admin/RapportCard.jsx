import { FaTrash } from "react-icons/fa";

const RapportCard = ({ rapport, onDelete, onDetailCliquer }) => {
  return (
    <div className="flex flex-col lg:flex-row p-3 rounded shadow-xl gap-3 bg-white">
      <div className="relative w-full lg:w-60 flex justify-center h-50 bg-gray-300 px-3 py-5">
        <img
          src=""
          alt=""
          className="w-full h-full object-cover rounded"
        />
      </div>

      <div className="flex flex-col w-full justify-between py-0 px-2 gap-3">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded-full relative bg-amber-200">
            <img
              src=""
              alt=""
              className="absolute w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <p className="text-sm font-medium">{rapport.user}</p>
            <p className="text-xs text-gray-600">{rapport.category}</p>
          </div>
        </div>

        <div className="div">
          <p className="text-md font-semibold line-clamp-1">- {rapport.title}</p>
          <p className="text-sm text-gray-700 line-clamp-3">{rapport.description}</p>
        </div>

        <div className="flex w-full justify-between items-center pt-2">
          <p
            className="text-sm text-blue-600 underline cursor-pointer"
            onClick={onDetailCliquer}
          >
            Voir détails
          </p>
          <button
            className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition text-[10px]"
            onClick={onDelete}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RapportCard;
