import mammoth from "mammoth";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom"
import PdfViewer from "../PdfViewer/PdfViewer";
import { usePublication } from "../../../Contexts/DashboardUser/UseContext";

export const ComponentRapport = ({doc,tite,children,view,supp,modif,
   iconbtn3,iconbnt1,iconbtn2,date}) => {
      
       const [docHtml, setDocHtml] = useState(null);
        const [pdfError] = useState(null);
        const [isLoading, setIsLoading] = useState(true);

        const {url}= usePublication()
   const ispdf = doc.type === "application/pdf";
     const isdoc = doc.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
   
     // Conversion des DOCX en HTML améliorée
     useEffect(() => {
       if (!isdoc || !doc.fileUrl) return;
   
       const convertDocxToHtml = async () => {
         try {
           setIsLoading(true);
           const response = await fetch(doc.fileUrl);
           const blob = await response.blob();
           const arrayBuffer = await new Response(blob).arrayBuffer();
           
           const result = await mammoth.convertToHtml(
             { arrayBuffer },
             {
               styleMap: [
                 "p[style-name='Heading 1'] => h1:fresh",
                 "p[style-name='Heading 2'] => h2:fresh",
                 "p[style-name='Heading 3'] => h3:fresh"
               ],
               includeEmbeddedStyleMap: true,
               includeDefaultStyleMap: true
             }
           );
           
           setDocHtml(result.value || "<p>Aucun contenu à afficher</p>");
         } catch (err) {
           console.error("Erreur de conversion docx:", err);
           setDocHtml(`
             <div style="padding: 20px; text-align: center;">
               <p style="color: #666;">Impossible d'afficher l'aperçu du document</p>
             </div>
           `);
         } finally {
           setIsLoading(false);
         }
       };
   
       convertDocxToHtml();
     }, [doc.fileUrl, isdoc]);

const handleDocumentClick = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (isdoc) {
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(doc.fileUrl)}`;
    window.open(viewerUrl, '_blank', 'noopener,noreferrer');
  } else  {
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(doc.fileUrl)}`;
    window.open(viewerUrl, '_blank', 'noopener,noreferrer');
  } 
};

const handleDelete = async (rapportId) => {
   const confirme = window.confirm("Voulez-vous vraiment supprimer ce rapport ?");

   if(!confirme){
    return;
   }

  try{
    const response = await fetch(`${url}/rapports/deleteMyRapport/${rapportId}`,{
      method:"DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
   
    if(!response.ok){
      throw new Error("Error deleting rapport");
    }else{
       console.log("Rapport deleted successfully");
    }

   }catch(err){
   console.error("Error deleting rapport:", err);
   }
}


console.log("id rapporte :",doc._id);


    return <div className="p-4 text-[var(--text-couleur)] bg-[var(--background-color)] min-w-[300px] min-h-[200px]
     flex-auto flex justify-center items-center composantRapport">
        <div className="flex gap-4 w-full bg-[#f2f2f2] p-2">
            <div className="image flex-auto ">
               {ispdf ? (
          <div className="w-full max-h-[250px] overflow-hidden">
            {pdfError && <p className="text-red-500">{pdfError}</p>}
           <PdfViewer file={doc.fileUrl} width={"200"}  height={null}/>
          </div>
        ) : isdoc ? (
          <div className="w-full min-h-[200px] bg-gray-100 p-4 overflow-hidden">
            {isLoading ? (
              <p>Chargement du document...</p>
            ) : docHtml ? (
              <div 
                className="docx-preview max-h-64"
                dangerouslySetInnerHTML={{ __html: docHtml }} 
              />
            ) : (
              <p>Document non disponible</p>
            )}
          </div>
        ) : (
          <div className="w-full">
            <img
              src="/images/word.jpg"
              alt={doc.title}
              className="w-full h-[200px] object-cover"
            />
          </div>
        )}
            </div>

            <div>
               <div className="contenu">
 
                <h1>{tite}</h1>
                <div>Date : <span className="font-light text-[10px]">{date}</span></div>
                <div className="text-sm line-clamp-2">{children}</div>
               </div>

               <div className="action_button mt-2 flex gap-4 flex-wrap text-[12px]">
                <button className=" flex gap-2 items-center justify-center " 
                onClick={handleDocumentClick}
                >
                   <span className="hidden md:block">{view}</span>  {iconbnt1} 
                </button> 
                <button className='flex gap-2 items-center justify-center '
                onClick={() => handleDelete(doc._id)}
                >
                   <span className="hidden md:block">{supp}</span>{iconbtn2}
                </button>
                <button className='flex gap-2 items-center justify-center'>
                   <span className="hidden md:block">{modif}</span> {iconbtn3}
                </button>
               </div>

            </div>
        </div>
      </div>
   
}
   
   
