import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { ComponentRapport } from "../../Composants/DashboardUsers/Rapport/RapportComponent";
import { FaCloudDownloadAlt } from 'react-icons/fa';
import {FaArrowUpRightFromSquare} from 'react-icons/fa6'
import TextExpandable from "../../Composants/DashboardUsers/TextExpandable";
export const Rapport = () => {
   const rapports = [
      {
         id: "doc1",
         title: "Mémoire sur le climat",
         img: "../../../public/images/dev.jpg",
         description:`Ce mémoire explore les effets du changement climatique sur les écosystèmes
         africains, en mettant l'accent sur la déforestation au Sénégal, les cycles de sécheresse et 
         les conséquences socio-économiques pour les communautés rurales. Il s'appuie sur des données
          scientifiques et des témoignages de terrain pour proposer des stratégies d'adaptation locale`
      },
      {
         id: "doc2",
         title: "Analyse financière des PME",
         img: "../../../public/images/dev.jpg",
         description:`Ce mémoire explore les effets du changement climatique sur les écosystèmes
         africains, en mettant l'accent sur la déforestation au Sénégal, les cycles de sécheresse et 
         les conséquences socio-économiques pour les communautés rurales. Il s'appuie sur des données
          scientifiques et des témoignages de terrain pour proposer des stratégies d'adaptation locale`
      },
      {
         id: "doc3",
         title: "Impact de la technologie sur l’education",
         img: "../../../public/images/dev.jpg",
         description:`Ce mémoire explore les effets du changement climatique sur les écosystèmes
         africains, en mettant l'accent sur la déforestation au Sénégal, les cycles de sécheresse et 
         les conséquences socio-économiques pour les communautés rurales. Il s'appuie sur des données
          scientifiques et des témoignages de terrain pour proposer des stratégies d'adaptation locale`
      },
   ]

 
    return <div className="w-full h-full text-[var(--background-color)] mt-5 p-5 flex flex-col gap-4">
      {rapports.map((rapport)=><div key={rapport.id}>
         <ComponentRapport
         img={rapport.img}
         tite={rapport.title} 
         supp={"Supprimer"}
         view={"Voir"} 
         iconbnt1={<FaEye />}
         modif={"modifier"}
         iconbtn3={<FaEdit />}
         iconbtn2={<FaTrash />}
         date={"01/01/2023"}
         user={"John Doe"}
         >
            <TextExpandable>
               {rapport.description}
            </TextExpandable>
         </ComponentRapport>
      </div>)}

      
    </div>;
}