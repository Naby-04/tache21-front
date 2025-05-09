import { FaTrash } from "react-icons/fa";

const RapportCard = ({rapport}) => {
    return ( 
            <div className="flex p-3 rounded shadow-xl gap-2 bg-white">
                <div className="relative w-full flex justify-center px-3 py-5 bg-gray-300 ">
                    <img src={rapport.imageRapport} alt="" className="w-50 h-full object-cover" />
                </div>
                <div className="flex flex-col py-0 px-3 gap-3">
                    <div className="flex gap-2 items-center">
                        <div className="w-8 h-8 rounded-full relative bg-amber-200">
                            <img src={rapport.userPhoto} alt="" className="absolute w-full h-full object-cover rounded-full" />
                        </div>
                        <div>
                            <p className="text-sm">{rapport.nomUsers}</p>
                            <p className="text-xs opacity-75">{rapport.categories}</p>
                        </div>
                    </div>
                    <p className="text-xl">{rapport.titre}</p>
                    <div className="text-sm opacity-75">{rapport.descriptionLong}</div>
                    <div className="flex w-full justify-between items-center">
                        <p className="text-sm text-blue-600 underline">Details</p>
                        <span className="p-2 rounded bg-red-600 text-amber-300">{<FaTrash />}</span>
                    </div>
                </div>
            </div>
     );
}
 
export default RapportCard;