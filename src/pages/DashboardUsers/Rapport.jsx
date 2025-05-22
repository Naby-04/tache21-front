import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { ComponentRapport } from "../../Composants/DashboardUsers/Rapport/RapportComponent";
import TextExpandable from "../../Composants/DashboardUsers/TextExpandable";
// import fakeReports from "../../data/FakeReport";
import { useEffect, useState } from "react";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";

export const Rapport = () => {
   const {url} = usePublication()

   const [rapports, setRapports] = useState([]);

   useEffect(() => {
      const rapportUser = async () => {
         try {
            const response = await fetch(`${url}/rapport/getMyRapport`, {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            });
            const data = await response.json();
            console.log("Publications d'un users ", data);
            setRapports(data);
         } catch (error) {
            console.error('Error fetching publications:', error);
         }
      }
     
      rapportUser();
   }, [url]);

   //   const dateLocale = rapports.createdAt.toLocaleString();

  
    return <div className="w-full h-full text-[var(--background-color)] mt-5 p-5 flex flex-col gap-4">
      {rapports.map((rapport,i)=><div key={i}>
         <ComponentRapport
               tite={rapport.title} 
               supp={"Supprimer"}
               view={"Voir"} 
               iconbnt1={<FaEye />}
               modif={"modifier"}
               iconbtn3={<FaEdit />}
               iconbtn2={<FaTrash />}
               date={rapport.createdAt}
               doc={rapport}
         >
            <TextExpandable>
               {rapport.description}
            </TextExpandable>
         </ComponentRapport>
      </div>)}

      
    </div>;
}