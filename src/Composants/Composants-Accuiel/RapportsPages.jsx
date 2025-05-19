import { RapportCardAccueil } from "./RapportCardAccueil";


// Test
const fakeDocuments = [
    {
      id: 1,
      title: "L'Impact de l'Intelligence Artificielle sur l'Éducation",
      description:
        "Ce rapport explore comment les technologies d'IA transforment l'enseignement, de la personnalisation des parcours à l'automatisation de la correction. Il aborde les avantages pédagogiques mais aussi les limites éthiques et techniques de ces outils dans les établissements scolaires et universitaires.",
      tags: ["IA", "éducation", "technologie", "machine learning"],
      type: "application/pdf",
      img: "/images/pdf.jpeg",
      category: "Éducation & Pédagogie",
      createdAt: new Date().toLocaleString("fr-FR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    },
    {
      id: 2,
      title: "Analyse financière des Startups Africaines 2024",
      description:
        "Ce document présente une analyse détaillée des levées de fonds, des business models et des défis financiers rencontrés par les startups africaines. Il propose des indicateurs clés et des cas pratiques issus du Sénégal, du Nigéria et du Kenya.",
      tags: ["finance", "startups", "Afrique", "investissement"],
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      img: "/images/word.jpg",
      category: "Sciences Économiques",
      createdAt: new Date().toLocaleString("fr-FR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    },
    {
      id: 3,
      title: "La Transition Écologique dans les Grandes Villes",
      description:
        "Un rapport sur les politiques vertes mises en place dans les métropoles pour lutter contre le changement climatique : transports durables, gestion des déchets, urbanisme responsable. L'étude s'appuie sur des données de Paris, Dakar et Montréal.",
      tags: ["écologie", "urbanisme", "climat", "ville durable"],
      type: "image/png",
      img: "/images/word.jpg",
      category: "Géographie & Environnement",
      createdAt: new Date().toLocaleString("fr-FR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    },
    {
      id: 4,
      title: "L'Évolution de la Performance dans le Football Moderne",
      description:
    "Ce rapport étudie l'impact des nouvelles technologies (GPS, capteurs biométriques, analyses vidéo) sur la performance des joueurs de football professionnel. Il met en lumière la manière dont les données influencent la préparation physique, la stratégie de jeu et la prévention des blessures. Une attention particulière est portée à l’évolution des entraînements dans les grands clubs européens.",
      tags: ["sport", "football", "analyse", "performance"],
       type: "application/pdf",
      img: "/images/pdf.jpeg",
      category: "Sport & Sciences du sport",
      createdAt: new Date().toLocaleString("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
    }),
    },
    {
        id: 5,
        title: "L’Ascension de l’Intelligence Artificielle dans le Développement Web",
        description:
          "Ce rapport explore l’intégration de l’IA dans le développement web moderne, notamment avec les assistants de code, les générateurs d’interface UI, et l’analyse automatisée des performances. Il analyse également les enjeux liés à la sécurité, l’accessibilité et l’éthique dans le développement piloté par l’IA.",
        tags: ["intelligence artificielle", "développement", "web", "technologie"],
        type: "application/pdf",
        img: "/images/pdf.jpeg",
        category: "Informatique & Technologie",
        createdAt: new Date().toLocaleString("fr-FR", {
            dateStyle: "short",
            timeStyle: "short",
          }),
      }
  ];
export const RapportsPages = ({ searchTerm }) => {
const filteredDocs = fakeDocuments.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

    return <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
     {filteredDocs.map((doc) => (
        <RapportCardAccueil key={doc.id} doc={doc} />
      ))}
</div>
        
        
}