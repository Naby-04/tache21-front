import { FaCloudDownloadAlt, FaCommentAlt, FaEye } from "react-icons/fa";
import CommentModal from "../Commentaire/CommentModal";
import { useEffect, useState, useMemo, useContext } from "react";
import TextExpandable from "../TextExpandable";
import { CommentairesSection } from "../Commentaire/CommentaireSection";
import { categories } from "../../../data/Categorie";
import { Document, Page, pdfjs } from 'react-pdf';
import mammoth from "mammoth";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import AuthContext from "../../../Contexts/AuthContext";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const RapportCard = ({ doc }) => {
  const [docHtml, setDocHtml] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pdfError, setPdfError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const {users} = useContext(AuthContext);

  const ispdf = doc.type === "application/pdf";
  const isdoc = doc.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const memoizedFile = useMemo(() => ({ url: doc.fileUrl }), [doc.fileUrl]);

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

  // Gestion des événements PDF
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfError(null);
    setIsLoading(false);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF load error:", error);
    setPdfError("Erreur de chargement du PDF");
    setIsLoading(false);
  };

  // Gestion des commentaires

  const handleCommentSubmit = async (comment) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:8000/api/comments/${doc._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      }
    );

    if (!res.ok) {
      console.error("Erreur lors de l’ajout du commentaire");
      return;
    }

    // Facultatif : Affiche commentaires après ajout
    setShowComments(true);
    setShowCommentBox(false);
  } catch (error) {
    console.error("Erreur ajout commentaire :", error);
  }
};


  // Gestion du clic sur le document
const handleDocumentClick = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.target.closest('.download-button')) return;

  if (isdoc) {
    // Solution simple: toujours ouvrir dans le viewer Office Online
    const viewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(doc.fileUrl)}`;
    window.open(viewerUrl, '_blank', 'noopener,noreferrer');
  } else {
    window.open(doc.fileUrl, '_blank', 'noopener,noreferrer');
  }
};

  // Gestion du téléchargement
  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.title || 'document';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Catégories et tags
  const currentCategory = categories.find((cat) => cat.value === doc.category);
  const categoryClass = currentCategory?.color;

  const tagsArray = Array.isArray(doc.tags)
    ? doc.tags
    : typeof doc.tags === "string"
      ? doc.tags.split(",").map(t => t.trim()).filter(Boolean)
      : [];


  // console.log(doc._id)
  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-3xl mx-auto mb-6 transition hover:shadow-lg">
      {/* En-tête avec auteur */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src="/images/dev.jpg"
          alt="Auteur"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sm text-gray-800">{users.prenom}</p>
          <p>
            <span>Publié le: </span>
            <small className="text-gray-500">{doc.createdAt}</small>
          </p>
        </div>
      </div>

      {/* Titre et catégorie */}
      <h2 className="text-lg font-bold text-gray-900 mb-2">{doc.title}</h2>
      <div className="mb-4">
        <strong>Categories:</strong> <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-md mb-2 ${categoryClass}`}>
          {doc.category}
        </span>
      </div>

      {/* Aperçu du document avec overlay */}
      <div 
        className="relative rounded-md overflow-hidden mb-4 cursor-pointer group"
        onClick={handleDocumentClick}
      >
        {/* Overlay au survol - style conservé */}
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
          <span className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold">
            {ispdf ? 'Lire le PDF' : isdoc ? 'Ouvrir le document' : 'Voir le fichier'}
          </span>
        </div>

        {ispdf ? (
          <div className="w-full max-h-[250px]">
            {isLoading && <p>Chargement du PDF...</p>}
            {pdfError && <p className="text-red-500">{pdfError}</p>}
            <Document
              file={memoizedFile}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<p>Chargement...</p>}
              error={<p className="text-red-500">Erreur de chargement</p>}
              className="w-full"
              crossOrigin="anonymous"
            >
              <Page 
                pageNumber={1} 
                width={null}
                loading={<p>Chargement de la page...</p>}
                error={<p className="text-red-500">Erreur d'affichage</p>}
                className="w-full"
              />
            </Document>
          </div>
        ) : isdoc ? (
          <div className="w-full min-h-[200px] bg-gray-100 p-4 overflow-y-auto">
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

      {/* Description et tags */}
      <div className="text-sm text-gray-700 mb-4">
        <TextExpandable>{doc.description}</TextExpandable>
      </div>
      
      <div className="mb-4">
        <strong>Tags:</strong>
        {tagsArray.length > 0 ? (
          <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
            {tagsArray.map((tag, i) => (
              <span key={i} className="bg-gray-200 px-2 py-1 rounded-full">#{tag}</span>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
            <span className="bg-gray-200 px-2 py-1 rounded-full">Aucun tag</span>
          </div>
        )}
      </div>

      {/* Barre d'actions */}
      <div className="flex mt-3 justify-around md:justify-between items-center border-t pt-3 text-sm text-gray-600 p-4">
        <button
          onClick={() => setShowCommentBox(!showCommentBox)}
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <FaCommentAlt />
          <span className="hidden md:block">Commenter</span>
        </button>

        <button 
          className="flex items-center gap-2 hover:text-blue-600 transition"
          onClick={() => setShowComments(!showComments)}
        >
          <FaEye />
          <span className="hidden md:block">
            {showComments ? "Masquer Commentaires" : "Afficher Commentaires"}
          </span>
        </button>

        <button 
          className="flex items-center gap-2 hover:text-blue-600 transition download-button"
          onClick={handleDownload}
        >
          <FaCloudDownloadAlt />
          <span className="hidden md:block">Télécharger</span>
        </button>
      </div>

      {/* Modal commentaire */}
      {/* {showCommentBox && (
        <div className="mt-4">
          <CommentModal
            isOpen={true}
            onClose={() => setShowCommentBox(false)}
            onSubmit={handleCommentSubmit}
            documentId={doc.id}
          />
        </div>
      )} */}
      {showCommentBox && (
        <div className="mt-4">
          <CommentModal
            onClose={() => setShowCommentBox(false)}
            onSubmit={handleCommentSubmit}
          />
        </div>
      )}

      {/* Section Commentaires */}
      {showComments && (
        <div className="mt-4">
          <CommentairesSection rapportId={doc._id} />
        </div>
      )}
    </div>
  );
};