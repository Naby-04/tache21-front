// TopReports.jsx (publique)
import React, { useEffect, useState } from 'react';
import ReportCard from './ReportCard';
import { Link } from 'react-router-dom';
import { usePublication } from '../../Contexts/DashboardUser/UseContext';

function TopReports() {
  const [topRapports, setTopRapports] = useState([]);
  const { url } = usePublication();
  // const {url,docHtml, setDocHtml}= usePublication()
  


  // // Conversion des DOCX en HTML améliorée
  // const ispdf = doc.type === "application/pdf";
  // const isdoc = doc.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

   useEffect(() => {
    const fetchTopDownloadedRapports = async () => {
      try {
        const response = await fetch(`${url}/download/top/downloaded`);
        const data = await response.json();
        setTopRapports(data); // car tu utilises topRapports dans l’affichage
      } catch (error) {
        console.error("Erreur lors du chargement des rapports les plus téléchargés :", error);
      }
    };
  
    fetchTopDownloadedRapports();
  }, []);

  // useEffect(() => {
  //   const fetchTopRapports = async () => {
  //     try {
  //       // const token = localStorage.getItem("token");
  //       const response = await fetch(`${url}/api/comments/top/commented`);
  //       const data = await response.json();
  //       // On récupère juste les rapports
  //       const rapportsAvecCommentaires = data.map(item => ({
  //         ...item.rapport,
  //         totalComments: item.totalComments
  //       }));
  //       setTopRapports(rapportsAvecCommentaires);
  //     } catch (error) {
  //       console.error("Erreur lors du chargement des top rapports :", error);
  //     }
  //   };

  //   fetchTopRapports();
  // }, []);

  //  useEffect(() => {
  //   if (ispdf && doc.file) {
  //     setIsLoading(false);
  //   }

  //   if (!isdoc || !doc.file) return;

  //   const convertDocxToHtml = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(doc.file);
  //       const blob = await response.blob();
  //       const arrayBuffer = await new Response(blob).arrayBuffer();

  //       const result = await mammoth.convertToHtml(
  //         { arrayBuffer },
  //         {
  //           styleMap: [
  //             "p[style-name='Heading 1'] => h1:fresh",
  //             "p[style-name='Heading 2'] => h2:fresh",
  //             "p[style-name='Heading 3'] => h3:fresh",
  //           ],
  //           includeEmbeddedStyleMap: true,
  //           includeDefaultStyleMap: true,
  //         }
  //       );

  //       setDocHtml(result.value || "<p>Aucun contenu à afficher</p>");
  //     } catch (err) {
  //       console.error("Erreur de conversion docx:", err);
  //       setDocHtml(`
  //         <div style="padding: 20px; text-align: center;">
  //           <p style="color: #666;">Impossible d'afficher l'aperçu du document</p>
  //         </div>
  //       `);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   convertDocxToHtml();
  // }, [doc]);

  console.log(topRapports)

  return (
    <section id="rapports" className="p-10 bg-white">
      <div className="flex justify-center mb-8">
        <h2 className="relative text-2xl font-bold text-gray-800 after:content-[''] after:block after:h-[3px] after:w-[50%] after:mx-auto after:bg-amber-300 after:mt-2">
          Top rapports
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topRapports.slice(0,3).map((report) => (
          <ReportCard key={report._id} report={report} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to="/rapports"
          className="px-4 py-2 bg-gray-800 text-white hover:bg-amber-300 hover:text-gray-800 transition duration-100 cursor-pointer text-md rounded-full text-center"
        >
          Découvrir Plus
        </Link>
      </div>
    </section>
  );
}

export default TopReports;
