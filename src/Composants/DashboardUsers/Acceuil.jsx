import { FaCloudUploadAlt, FaComment, FaEye } from "react-icons/fa";
import TextExpandable from "./TextExpandable";
import { useState } from "react";
import CommentModal from "./Commentaire/CommentModal";
import { Buttons } from "./Buttons";

import { RapportCard } from "./Rapport/RapportCards";
// Test
const fakeDocuments = [
  {
    id: "doc1",
    title: "Mémoire sur le climat",
    description: ` "Ce mémoire explore les effets du changement climatique sur les écosystèmes
         africains, en mettant l'accent sur la déforestation au Sénégal, les cycles de sécheresse et 
         les conséquences socio-économiques pour les communautés rurales. Il s'appuie sur des données
          scientifiques et des témoignages de terrain pour proposer des stratégies d'adaptation locale
           efficaces. La recherche met également en lumière le rôle des politiques publiques et des ONG dans 
           la résilience environnementale.",`,
    img: "../../../public/images/dev.jpg",
  },
  {
    id: "doc2",
    title: "Analyse financière des PME au Sénégal",
    description: `"Ce document fournit une analyse approfondie de la situation financière des petites et moyennes
         entreprises sénégalaises entre 2018 et 2023. Il étudie leur accès au financement bancaire, les 
         taux de rentabilité, les problèmes de trésorerie, ainsi que les effets de la crise sanitaire sur 
         leurs bilans. L’étude propose également des recommandations pour améliorer l'accès au crédit,
          renforcer la digitalisation et encourager l'investissement local.",`,
    img: "../../../public/images/dev.jpg",
  },
];
export const Acceuil = () => {
  const [selectedDocId, setSelectedDocId] = useState(null);

  const handleCommentSubmit = (comment, docId) => {
    console.log("Commentaire pour", docId, ":", comment);
    // 🔥 ici tu peux appeler Firestore
  };

  return (
    <div className="py-6 px-4 flex flex-col items-center">
      {fakeDocuments.map((doc) => (
        <RapportCard key={doc.id} doc={doc} />
      ))}
    </div>
  );
};
