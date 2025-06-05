import mammoth from "mammoth";
import { useEffect, useState } from "react";
import PdfViewer from "../PdfViewer/PdfViewer";
import { usePublication } from "../../../Contexts/DashboardUser/UseContext";
import { LireDocx } from "../LireDocx";
import { LirePdf } from "../LirePdf";


export const ComponentRapport = ({ doc, tite, children, supp, modif, iconbtn3,
   iconbtn2, date, onDeleteSuccess, onUpdateSuccess }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(tite);
  const [description, setDescription] = useState(children);
  const [fille, setFile] = useState(null);
  const { url,docHtml, setDocHtml,pdfError,isLoading,setIsLoading,setPublications } = usePublication();
  const [showPdfModal, setShowPdfModal] = useState(false);
    const [showdocModal, setShowDocModal] = useState(false);
  const ispdf = doc.type === "application/pdf";
  const isdoc =
    doc.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const rapportId = doc._id;

  useEffect(() => {
    if (!isdoc || !doc.file) return;
     
    const convertDocxToHtml = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(doc.file);
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
  }, [doc.file, isdoc]);
  
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(doc.file)}`;
  const handleDocumentClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    {
      if (isdoc) {
        setShowDocModal(true);
      } else if (ispdf) {
        setShowPdfModal(true);
      } else {
        window.open(doc.file, "_blank", "noopener,noreferrer");
      }
    }
    // window.open(viewerUrl, "_blank", "noopener,noreferrer");
  };

  const handleDelete = async (rapportId) => {
    const confirme = window.confirm("Voulez-vous vraiment supprimer ce rapport ?");
    if (!confirme) return;

    console.log("token", localStorage.getItem("token"));
    try {
      const response = await fetch(`${url}/rapport/deleteMyRapport/${rapportId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPublications((prevPublications) =>
        prevPublications.filter((pub) => pub._id !== rapportId)
      );

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      if (onDeleteSuccess) onDeleteSuccess(rapportId);
    } catch (err) {
      console.error("Erreur de suppression :", err);
      console.log("rapportId", rapportId);
      
    }
  };

  const handleUpdateRapport = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (fille) {
      formData.append("file", fille);
    }
    try {
      const response = await fetch(`${url}/rapport/updateMyRapport/${rapportId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      setPublications((prevPublications) =>
        prevPublications.map((pub) =>
          pub._id === rapportId ? { ...pub, title, description } : pub
        )
      );
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Erreur de mise à jour");

      if (onUpdateSuccess) {
        onUpdateSuccess(result.rapport);
      }

      setEditMode(false);
      setFile(null);
    } catch (error) {
      console.error("Erreur de modification :", error.message);
    }
  };

  useEffect(() => {
    if (editMode) {
      setTitle(doc.title);
      setDescription(doc.description || "");
    }
  }, [editMode, doc]);

  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow 
    duration-300 flex flex-col text-black">
      <div className="flex-1 p-4 flex flex-col bg-gray-100">
        <div className="flex flex-1 gap-4">
          {/* Preview section - fixed width but flexible height */}
          <div 
            className="w-24 flex-shrink-0 rounded flex justify-center overflow-hidden cursor-pointer"
            onClick={handleDocumentClick}
          >
            {ispdf ? (
              <div className="w-full h-[128px]">
                {pdfError && <p className="text-red-500 text-xs">{pdfError}</p>}
                <PdfViewer file={doc.file} width={"96"} height={"128"} />
              </div>
            ) : isdoc ? (
              <div className="w-full max-h-[128px] p-2 text-black">
                {isLoading ? (
                  <p className="text-xs text-gray-500">Chargement...</p>
                ) : docHtml ? (
                  <div
                    className="docx-preview h-full text-xs overflow-hidden "
                    dangerouslySetInnerHTML={{ __html: docHtml }}
                  />
                ) : (
                  <p className="text-xs text-gray-500">Document non disponible</p>
                )}
              </div>
            ) : (
              <img
                src="/images/word.jpg"
                alt={doc.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Content section - takes remaining space */}
          <div className="flex-1 flex flex-col">
            {editMode ? (
              <div className="space-y-2 flex-1 text-gray-800">
                <input
                  className="w-full border-b border-gray-300 px-1 py-1 text-sm focus:outline-none
                   focus:border-amber-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="w-full flex-1 border border-gray-300 px-1 py-1 rounded text-xs"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
               
              </div>
            ) : (
              <div className="flex-1 space-y-1 text-black">
                <h1 className="text-sm font-semibold text-gray-800">{tite}</h1>
                <div className="text-xs text-gray-700 mt-2 line-clamp-4 flex-1">{children}</div>
                <p className="text-xs text-gray-400 mt-1">Date: {new Date(date).toLocaleString("fr-FR")}</p>
              </div>
            )}

            {/* Actions - fixed at bottom of content section */}
            <div className="mt-auto pt-2">
              <div className="flex justify-center gap-6 items-center">
                <button
                  className="text-amber-600 border-1 p-2 rounded text-xs hover:bg-amber-50 transition-colors"
                  onClick={editMode ? handleUpdateRapport : () => setEditMode(true)}
                >
                  {editMode ? (
                    <span className="flex items-center gap-1">
                      <span>Enregistrer</span> ✅
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span>{modif}</span> {iconbtn3}
                    </span>
                  )}
                </button>

                {editMode ? (
                  <button
                    className="text-gray-600 border-1 p-2 rounded text-xs hover:bg-gray-50 transition-colors"
                    onClick={() => setEditMode(false)}
                  >
                    Annuler
                  </button>
                ):(

                <button
                  className="text-red-600 text-xs hover:bg-red-50 border-1 p-2 rounded flex items-center gap-1"
                  onClick={() => handleDelete(rapportId)}
                >
                  <span>{supp}</span> {iconbtn2}
                </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal lecture */}
           {showPdfModal && (
             <div>
               <LirePdf isOpen={showPdfModal}
                onClose={() => setShowPdfModal(false)} 
                file={doc.file} 
                onOpen={() => window.open(viewerUrl, "_blank", "noopener,noreferrer")}
                />
             </div>
           )}
     
           {/* modal docx */}
           {showdocModal && (
             <div>
               <LireDocx isOpen={showdocModal}
                onClose={() => setShowDocModal(false)}
                 htmlContent={docHtml} 
                 onOpen={() => window.open(viewerUrl, "_blank", "noopener,noreferrer")}
                 />
             </div>
           )}
        
   
    </div>
  );
};