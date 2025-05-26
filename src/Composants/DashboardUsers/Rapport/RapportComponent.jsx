import mammoth from "mammoth";
import { useEffect, useState } from "react";
import PdfViewer from "../PdfViewer/PdfViewer";
import { usePublication } from "../../../Contexts/DashboardUser/UseContext";

export const ComponentRapport = ({ doc, tite, children, view, supp, modif, iconbtn3,
   iconbnt1, iconbtn2, date, onDeleteSuccess,onUpdateSuccess}) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(tite);
  const [description, setDescription] = useState(children);
  const [file, setFile] = useState(null);
  const { url,docHtml, setDocHtml,pdfError,isLoading,setIsLoading } = usePublication();
  const ispdf = doc.type === "application/pdf";
  const isdoc =
    doc.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const rapportId = doc._id;

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
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
      doc.fileUrl
    )}`;
    window.open(viewerUrl, "_blank", "noopener,noreferrer");
  };

  const handleDelete = async (rapportId) => {
    const confirme = window.confirm("Voulez-vous vraiment supprimer ce rapport ?");
    if (!confirme) return;

    try {
      const response = await fetch(`${url}/rapport/deleteMyRapport/${rapportId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      if (onDeleteSuccess) onDeleteSuccess(rapportId);
    } catch (err) {
      console.error("Erreur de suppression :", err);
    }
  };


  const handleUpdateRapport = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch(`${url}/rapport/updateMyRapport/${rapportId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

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
console.log("Affichage du PDF :", doc.fileUrl);
  return (
    <div className="p-4 text-[var(--text-couleur)] bg-[var(--background-color)] min-w-[300px] min-h-[200px] flex-auto flex justify-center items-center composantRapport">
      <div className="flex gap-4 w-full bg-[#f2f2f2] p-2">
        <div className="image w-full flex-auto max-h-[200px] overflow-hidden">
          {ispdf ? (
            <div className="w-full h-full ">
              {pdfError && <p className="text-red-500">{pdfError}</p>}
              <PdfViewer file={doc.fileUrl} width={"200"} height={"200"} />
            </div>
          ) : isdoc ? (
            <div className="w-full h-full bg-gray-100 p-4 ">
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
          <div className="contenu space-y-1">
            {editMode ? (
              <>
                <input
                   className="w-full border px-2 py-1 rounded"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                 />
                 <textarea
                   className="w-full border px-2 py-1 rounded text-sm"
                   rows={3}
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                 />
                 <input
                   type="file"
                   accept=".pdf,.doc,.docx"
                   onChange={(e) => setFile(e.target.files[0])}
                 />
              </>
            ) : (
              <>
                <h1 className="font-semibold">{tite}</h1>
                <div>Date : <span className="font-light text-[10px]">{date}</span></div>
                <div className="text-sm line-clamp-2">{children}</div>
              </>
            )}
          </div>

          <div className="action_button mt-2 flex gap-4 flex-wrap text-[12px]">
            <button
              className="flex gap-2 items-center justify-center"
              onClick={handleDocumentClick}
            >
              <span className="hidden md:block">{view}</span> {iconbnt1}
            </button>

            <button
              className="flex gap-2 items-center justify-center"
              onClick={() => handleDelete(rapportId)}
            >
              <span className="hidden md:block">{supp}</span> {iconbtn2}
            </button>

            {editMode ? (
              <button
                className="flex gap-2 items-center justify-center text-green-600"
                onClick={handleUpdateRapport}
              >
                <span className="hidden md:block">Enregistrer</span> ✅
              </button>
            ) : (
              <button
                className="flex gap-2 items-center justify-center"
                onClick={() => setEditMode(true)}
              >
                <span className="hidden md:block">{modif}</span> {iconbtn3}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
