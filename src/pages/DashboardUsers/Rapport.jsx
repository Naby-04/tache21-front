import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { ComponentRapport } from "../../Composants/DashboardUsers/Rapport/RapportComponent";
import TextExpandable from "../../Composants/DashboardUsers/TextExpandable";
import { useEffect, useState } from "react";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { HiDocumentArrowDown } from "react-icons/hi2";
import { AddRapport } from "../../Composants/DashboardUsers/Rapport/AddRapport";

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
      {rapports.length === 0 && <div className=" text-center flex flex-col gap-4 items-center justify-center
      h-screen text-gray-800 mb-8">
         <h1 className="text-2xl font-semibold">Vous n'avez pas encore de rapports</h1>
      <div className="ml-2">
         <AddRapport />
      </div>
      </div>}
      {rapports.map((rapport,i)=><div key={i}>
         
        <ComponentRapport
           tite={rapport.title} 
           supp={"Supprimer"}
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