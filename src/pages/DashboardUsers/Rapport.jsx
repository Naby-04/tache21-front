import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { ComponentRapport } from "../../Composants/DashboardUsers/Rapport/RapportComponent";
import TextExpandable from "../../Composants/DashboardUsers/TextExpandable";
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


   // Mettre à jour un rapport
 
   
  
    return <div className="w-full h-full text-[var(--background-color)] mt-5 p-5 flex flex-col gap-4">
      if(rapports.length===0) return <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Vous n'avez aucun rapport publier</h1>
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
           onDeleteSuccess={(id) => {
             const updatedRapports = rapports.filter((r) => r._id !== id);
             setRapports(updatedRapports);
           }}
          onUpdateSuccess={(updatedRapport) => {
            const updatedRapports = rapports.map((r) =>
              r._id === updatedRapport._id ? updatedRapport : r
            );
            setRapports(updatedRapports);
          }}
        >
        <TextExpandable>
          {rapport.description}
        </TextExpandable>
     </ComponentRapport>

      </div>)}

      
    </div>;
}