import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { ComponentRapport } from "../../Composants/DashboardUsers/Rapport/RapportComponent";
import TextExpandable from "../../Composants/DashboardUsers/TextExpandable";
import fakeReports from "../../data/FakeReport";
export const Rapport = () => {
  
    return <div className="w-full h-full text-[var(--background-color)] mt-5 p-5 flex flex-col gap-4">
      {fakeReports.map((rapport)=><div key={rapport.id}>
         <ComponentRapport
               img={rapport.img}
               tite={rapport.title} 
               supp={"Supprimer"}
               view={"Voir"} 
               iconbnt1={<FaEye />}
               modif={"modifier"}
               iconbtn3={<FaEdit />}
               iconbtn2={<FaTrash />}
               date={rapport.createdAt}
               user={"John Doe"}
         >
            <TextExpandable>
               {rapport.description}
            </TextExpandable>
         </ComponentRapport>
      </div>)}

      
    </div>;
}