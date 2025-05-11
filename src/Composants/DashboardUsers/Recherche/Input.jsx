import { FiSearch } from "react-icons/fi";
export const Input = () => {
    return (
        <div className="flex items-center shadow rounded  w-full max-w-md mx-auto bg-white px-2 py-1 flex-1">
            <input type="text" placeholder="Rechercher..." className="flex-auto outline-none " />
            <button type="submit" className="text-gray-600 hover:text-black">
                <FiSearch size={20} />
            </button>
        </div>
    );
}