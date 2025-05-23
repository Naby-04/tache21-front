import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { categories } from "../../data/Categorie";

export const SidebarAccuiel = ({ setActiveCategory, isMobile = false }) => {
  const { setSelectedCategory, selectedCategory } = usePublication();

  return (
    <div
      className={`w-[260px] h-full overflow-y-auto p-4 shadow-2xl ${
        isMobile ? "block bg-white" : "hidden md:block bg-[var(--background-color)]"
      }`}
    >
      <div className="p-1">
        <h4 className="text-[18px] font-bold mb-4 text-gray-800">Rechercher par Catégorie</h4>

        <ul className="w-full space-y-2">
          {/* Bouton "Tous" */}
          <li>
            <button
          onClick={() => {
    setSelectedCategory(null);
    setActiveCategory(null); 
  }}
              className={`text-sm px-3 py-1 rounded-md font-medium text-left cursor-pointer w-[40%]
                ${
                  selectedCategory === null
                    ? "bg-gray-800 text-amber-300"
                    : "bg-gray-200 hover:opacity-80 text-gray-800"
                }`}
            >
              Tous
            </button>
          </li>

          {/* Boutons catégories */}
          {categories.map((cat, i) => (
            <li key={i}>
              <button
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setActiveCategory(cat.value);
                }}
                className={`text-sm px-3 py-1 rounded-md font-medium text-left w-full transition
                  ${
                    selectedCategory === cat.value
                      ? "bg-gray-800 text-amber-300"
                      : "bg-gray-200 hover:opacity-80 text-gray-800"
                  }`}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
