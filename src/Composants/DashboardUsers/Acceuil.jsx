import { FaCloudUploadAlt, FaComment, FaEye } from "react-icons/fa";
import TextExpandable from "./TextExpandable"
import { useState } from "react";
import CommentModal from "./Commentaire/CommentModal";
import { Buttons } from "./Buttons";

// Test
const fakeDocuments = [
    {
      id: "doc1",
      title: "Mémoire sur le climat",
      description:
       ` "Ce mémoire explore les effets du changement climatique sur les écosystèmes
         africains, en mettant l'accent sur la déforestation au Sénégal, les cycles de sécheresse et 
         les conséquences socio-économiques pour les communautés rurales. Il s'appuie sur des données
          scientifiques et des témoignages de terrain pour proposer des stratégies d'adaptation locale
           efficaces. La recherche met également en lumière le rôle des politiques publiques et des ONG dans 
           la résilience environnementale.",`,
        img: "../../../public/images/dev.jpg"
    },
    {
      id: "doc2",
      title: "Analyse financière des PME au Sénégal",
      description:
        `"Ce document fournit une analyse approfondie de la situation financière des petites et moyennes
         entreprises sénégalaises entre 2018 et 2023. Il étudie leur accès au financement bancaire, les 
         taux de rentabilité, les problèmes de trésorerie, ainsi que les effets de la crise sanitaire sur 
         leurs bilans. L’étude propose également des recommandations pour améliorer l'accès au crédit,
          renforcer la digitalisation et encourager l'investissement local.",`,
          img: "../../../public/images/dev.jpg"
    },
  ];
export const Acceuil = () => {
    const [selectedDocId, setSelectedDocId] = useState(null);

    const handleCommentSubmit = (comment, docId) => {
      console.log("Commentaire pour", docId, ":", comment);
      // 🔥 ici tu peux appeler Firestore
    };

    return <div className="p-2 text-[var(--primary-color)] w-full lg:w-[50%] flex flex-col gap-5">
        {fakeDocuments.map((doc)=><div key={doc.id} className="document  w-full shadow-2xl p-5 lg:p-10 bg-white">
            <div className="infos-owner">
            <div className="profil-owner flex items-center gap-2">
                    <img src="../../../public/images/dev.jpg" alt="" className="w-[40px] h-[40px] rounded-full"/>
                    <div className="flex flex-col ">
                    <strong>John Doe</strong>
                    <small>il y' a 2 minutes</small>

                    </div>
                </div>
            </div>
            <h1 className="text-xl font-bold ml-5 mt-3">{doc.title}</h1>
            <div className="pdf p-2 lg:p-5 bg-white">
                <img src={doc.img} alt=""className="max-h-[300px] w-full object-fit: cover" />
            </div>
            
            <div className="description">
                <TextExpandable >
                  {doc.description}
                </TextExpandable>
            </div>

            <div className="flex justify-around lg:justify-between items-center gap-2
               mt-4 p-4 text-[var(--text-couleur)]">
                <p className="flex gap-2 items-center text-xl cursor-pointer" onClick={() => setSelectedDocId(doc.id)}>
                    <FaComment />
                 <span className="hidden lg:block text-sm">
                 <Buttons 
                  text={"Commenter"}
                  
                />
                    
                  </span>
                </p>
                <p className="flex gap-2 items-center text-xl cursor-pointer"><FaEye />
                 <span className="hidden lg:block text-sm">
                 <Buttons 
                  text={"Voir Commentaire"}
                />
                    
                  </span>
                </p>
                <p className="flex gap-2 items-center text-xl cursor-pointer"><FaCloudUploadAlt />
                 <span className="hidden lg:block text-sm">
                 <Buttons 
                  text={"Telecharger"}
                />
                    
                  </span>
                </p>
            </div>
             {/* appel de modal */}
             {selectedDocId === doc.id && (
               <CommentModal
               isOpen={selectedDocId !== null}
               onClose={() => setSelectedDocId(null)}
               onSubmit={handleCommentSubmit}
               documentId={selectedDocId}
             />
            )}
        </div>

        
        )}

       

      
       
       
    </div>;
}