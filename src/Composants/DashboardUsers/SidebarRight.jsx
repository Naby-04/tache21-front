import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { categories } from "../Categorie"
export const SidebarRight = () => {
  
  const allCategories = categories.map(c => c.value);
  console.log("allCategories:", allCategories);
  const {setSelectedCategory} = usePublication()
  
    return <div className="w-[300px] shadow-2xl bg-[var(--background-color)] h-screen
      hidden md:block overflow-scroll">
        <div className="p-4">
          <div className="tite">
          <h4 className="text-[18px] font-bold">Rechercher par Categorie</h4>
          </div>
          <div className="flex">
            <ul className="w-full">
            {categories.map((cat, i) => (
            <li key={i} className="my-2 cursor-pointer">
              <button className={`text-sm px-3 py-1 rounded-md font-medium bg-[#f2f2f2] shadow cursor-pointer`}
              onClick={() => setSelectedCategory(cat.value)}>
                {cat.label}
              </button>
            </li>
          ))}
            </ul>
          </div>
        </div>

    </div>
}