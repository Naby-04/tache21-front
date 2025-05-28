import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { categories } from "../../data/Categorie";
export const SidebarRight = () => {
  
  const {setSelectedCategory,selectedCategory} = usePublication()
  
    return <div className="w-[350px] shadow-2xl bg-[var(--background-color)] h-screen hidden md:block p-2">
    <div className="p-4 ">
      <h4 className="text-[18px] font-bold mb-4">Rechercher par Catégorie</h4>
  
      <ul className="w-full space-y-2 mb-4">
        {/* Bouton "Tous" */}
        <li>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`text-sm px-3 py-1 rounded-md font-medium  text-left cursor-pointer
              ${selectedCategory === null
                ? "bg-gray-800 text-amber-300"
                : "bg-gray-200 hover:opacity-80 text-gray-700"}`}
          >
            Tous
          </button>
        </li>
  
        {/* Boutons catégories */}
        {categories.map((cat, i) => (
          <li key={i} className="cursor-pointer w-full">
            <button
              onClick={() => setSelectedCategory(cat.value)}
              className={`text-sm px-3 py-1 rounded-md font-medium text-left transition  cursor-pointer
                ${selectedCategory === cat.value
                  ? `bg-gray-800 text-amber-300`
                  : "bg-gray-200 hover:opacity-80 hover:scale-105 text-gray-700"}`}
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  
}