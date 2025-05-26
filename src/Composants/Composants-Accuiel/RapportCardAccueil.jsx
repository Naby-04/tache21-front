import { FaCloudDownloadAlt, FaCommentAlt, FaEye } from "react-icons/fa";
import CommentModal  from "../../Composants/DashboardUsers/Commentaire/CommentModal";
import { useEffect, useState } from "react";
import TextExpandable from "../../Composants/DashboardUsers/TextExpandable";
import { categories } from "../../data/Categorie"
import PdfViewer from "../DashboardUsers/PdfViewer/PdfViewer";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import mammoth from "mammoth";



export const RapportCardAccueil = ({ doc }) => {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const {pdfError,isLoading,docHtml,setDocHtml,setIsLoading}= usePublication();

    const handleCommentSubmit = (comment) => {
        console.log("Commentaire:", comment, "pour:", doc.id);
        setShowCommentBox(false);
    };

    // type de ocument 
     const ispdf = doc.type === "application/pdf";
    const isdoc = doc.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    // lire document 
 
    const currentCategory = categories.find((cat) => cat.value === doc.category); 
        const categoryClass = currentCategory?.color
       
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
        

    return (
        <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-3xl mx-auto mb-6 transition hover:shadow-lg">
            {/* Auteur */}
            <div className="flex items-center gap-3 mb-3">
                <img
                    src="../../../public/images/dev.jpg"
                    alt="Auteur"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold text-sm text-gray-800">{doc.userId.prenom}</p>
                    <small className="text-gray-500">{doc.date}</small>
                </div>
            </div>

           

            {/* Titre */}
            <h2 className="text-lg font-bold text-gray-900 mb-2">{doc.title}</h2>

            <div className="mb-4">
					<strong>Categories:</strong> <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-md mb-2 ${categoryClass}`}>
						{doc.category}
						</span>
			</div>

            {/* Image */}
            <div className="rounded-md overflow-hidden mb-4">
               {ispdf ? (
            <div className="w-full h-[200px] ">
              {pdfError && <p className="text-red-500">{pdfError}</p>}
              <PdfViewer file={doc.fileUrl} width={null} height={null} />
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

            {/* Description */}
            <div className="text-sm text-gray-700 mb-4">
                <TextExpandable>{doc.description}</TextExpandable>
            </div>

            {/* Barre d’actions */}
            <div className="flex justify-around  md:justify-between items-center border-t pt-3 text-sm text-gray-600">
                <button
                    onClick={() => setShowCommentBox(!showCommentBox)}
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                >
                    <FaCommentAlt />
                    <span className=" hidden md:block">Commenter</span>
                </button>

                <button className="flex items-center gap-2 hover:text-blue-600 transition">
                    <FaEye />
                    <span className=" hidden md:block">Voir commentaires</span>
                </button>

                <button className="flex items-center gap-2 hover:text-blue-600 transition">
                    <FaCloudDownloadAlt />
                    <span className=" hidden md:block">Télécharger</span>
                </button>
            </div>

            {showCommentBox && (
                <div className="mt-4">
                    <CommentModal
                        isOpen={true}
                        onClose={() => setShowCommentBox(false)}
                        onSubmit={(comment) => handleCommentSubmit(comment)}
                        documentId={doc.id}
                    />
                </div>
            )}
        </div>
    );
};
