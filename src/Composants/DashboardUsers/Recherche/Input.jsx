import { FiSearch } from "react-icons/fi";
export const Input = ({onSearch,value}) => {
    return (
        <div className="flex items-center shadow rounded-3xl w-[130px] md:w-full   max-w-md mx-auto bg-white px-2 py-1 flex-1">
            <input type="text" placeholder="Rechercher..." className=" outline-none w-full"
             value={value}
             onChange={(e) => onSearch(e.target.value)}
             />
            <button type="submit" className="text-gray-600 hover:text-black">
                <FiSearch size={20} />
            </button>
        </div>
    );
}