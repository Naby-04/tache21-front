import { FaTrash } from "react-icons/fa";

const RapportCard = ({rapport}) => {
    return ( 
            <div className="flex flex-col lg:flex-row  p-3 rounded shadow-xl gap-3 bg-white">
                <div className="relative w-full lg:w-60 flex justify-center h-60 bg-gray-300 px-3 py-5">
                    <img src={rapport.imageRapport} alt="" className="w-full h-full object-cover rounded" />
                </div>

                <div className="flex flex-col w-full justify-between py-0 px-2 gap-3">
                    <div className="flex gap-2 items-center">
                    <div className="w-8 h-8 rounded-full relative bg-amber-200">
                        <img
                        src={rapport.userPhoto}
                        alt=""
                        className="absolute w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium">{rapport.nomUsers}</p>
                        <p className="text-xs text-gray-600">{rapport.categories}</p>
                    </div>
                    </div>

                    <div className="div">
                        <p className="text-lg font-semibold">{rapport.titre}</p>
                        <p className="text-sm text-gray-700 line-clamp-3">{rapport.descriptionLong}</p>
                    </div>

                    
                    <div className="flex w-full justify-between items-center pt-2">
                        <p className="text-sm text-blue-600 underline cursor-pointer">Détails</p>
                        <button className="p-2 rounded bg-red-600 text-white hover:bg-red-700 transition">
                            <FaTrash />
                        </button>
                    </div>
                </div>
                </div>

     );
}
 
export default RapportCard;