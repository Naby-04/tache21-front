import { FaCloudDownloadAlt, FaCommentAlt, FaEye } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import CommentModal from "../../Composants/DashboardUsers/Commentaire/CommentModal";
import { useEffect, useState } from "react";
import TextExpandable from "../../Composants/DashboardUsers/TextExpandable";
import { categories } from "../../data/Categorie";
import PdfViewer from "../DashboardUsers/PdfViewer/PdfViewer";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import mammoth from "mammoth";
import { CommentairesSection } from "../DashboardUsers/Commentaire/CommentaireSection";

export const RapportCardAccueil = ({ doc }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { pdfError, isLoading, docHtml, setDocHtml, setIsLoading } = usePublication();
  const [showLoginModal, setShowLoginModal] = useState(false);


  // const handleCommentSubmit = (comment) => {
  //     console.log("Commentaire:", comment, "pour:", doc.id);
  //     setShowCommentBox(false);
  // }

  // Conversion des DOCX en HTML améliorée
  const ispdf = doc.type === "application/pdf";
  const isdoc =
    doc.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const currentCategory = categories.find((cat) => cat.value === doc.category);
  const categoryClass = currentCategory?.color;

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
              "p[style-name='Heading 3'] => h3:fresh",
            ],
            includeEmbeddedStyleMap: true,
            includeDefaultStyleMap: true,
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

  const handleCommentSubmit = async (comment) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${url}/api/comments/${doc._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      });

      if (!res.ok) {
        console.error("Erreur lors de l’ajout du commentaire");
        return;
      }

      // ✅ Afficher commentaires après ajout
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
    const encodedUrl = encodeURIComponent(doc.file);
    if (isdoc) {
      const viewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}`;
      window.open(viewerUrl, "_blank", "noopener,noreferrer");
    } else if (ispdf) {
      const viewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}`;
      window.open(viewerUrl, "_blank", "noopener,noreferrer");
    } else {
      window.open(doc.file, "_blank", "noopener,noreferrer");
    }
  };

  

  const tagsArray = Array.isArray(doc.tags)
    ? doc.tags
    : typeof doc.tags === "string"
      ? doc.tags.split(",").map(t => t.trim()).filter(Boolean)
      : [];

  
  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-3xl mx-auto mb-6 transition hover:shadow-lg">
      {/* En-tête avec auteur */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={doc.userId ? `${doc.userId.photo} ` : " "}
          alt="Auteur"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sm text-gray-800">
            {doc.userId ? `${doc.userId.prenom} ` : "Utilisateur inconnu "}{" "}
          </p>
          <p>
            <span>Publié le: </span>
            <small className="text-gray-500">
              {new Date(doc.createdAt).toLocaleString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </p>
        </div>
      </div>

      {/* Titre et catégorie */}
      <h2 className="text-lg font-bold text-gray-900 mb-2">{doc.title}</h2>
      <div className="mb-4">
        <strong>Categories:</strong>{" "}
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-md mb-2 ${categoryClass}`}
        >
          {doc.category}
        </span>
      </div>

      {/* Aperçu du document avec overlay */}
      <div
        className="relative rounded-md overflow-hidden mb-4 cursor-pointer group"
        onClick={handleDocumentClick}
      >
        {/* Overlay au survol - style conservé */}
        <div
          className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300
         flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
        >
          <span className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold">
            {ispdf
              ? "Lire le PDF"
              : isdoc
              ? "Ouvrir le document"
              : "Voir le fichier"}
          </span>
        </div>

        {ispdf ? (
          <div className="w-full max-h-[250px]">
            {pdfError && <p className="text-red-500">{pdfError}</p>}
            <PdfViewer file={doc.file} width={null} />
          </div>
        ) : isdoc ? (
          <div className="w-full min-h-[200px] bg-gray-100 p-4 ">
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
              <span key={i} className="bg-gray-200 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
            <span className="bg-gray-200 px-2 py-1 rounded-full">
              Aucun tag
            </span>
          </div>
        )}
      </div>

      {/* Barre d'actions */}
      <div className="flex mt-3 justify-around md:justify-between items-center border-t pt-3 text-sm text-gray-600 p-4">
      <button
  onClick={() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
    } else {
      setShowCommentBox((prev) => {
        const newState = !prev;
        if (newState) setShowComments(false);
        return newState;
      });
    }
  }}
  className="flex items-center gap-2 hover:text-blue-600 transition"
>
  <FaCommentAlt />
  <span className="hidden md:block">Commenter</span>
</button>




        <button
  className="flex items-center gap-2 hover:text-blue-600 transition"
  onClick={() => {
    setShowComments((prev) => {
      const newState = !prev;
      if (newState) {
        setShowCommentBox(false); // Masquer le champ de commentaire si on ouvre les commentaires
      }
      return newState;
    });
  }}
>
  <FaEye />
  <span className="hidden md:block">
    {showComments ? "Masquer Commentaires" : "Afficher Commentaires"}
  </span>
</button>


        {/* <button 
          className="flex items-center gap-2 hover:text-blue-600 transition download-button"
          onClick={() => handleDownload(doc._id)}
        >
          <FaCloudDownloadAlt />
          <span className="hidden md:block">Télécharger</span>
        </button> */}
      </div>

      {/* Modal commentaire */}

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
      {showLoginModal && (
  <div className=" flex items-center justify-center fixed inset-0 z-100 bg-gray-800/20 backdrop-blur-xs">
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full text-center">
    <div className="relative max-w-md w-full">
      <button
        onClick={() => setShowLoginModal(false)}
        className="absolute -top-5 -right-5 bg-amber-300 rounded-full shadow p-1 
        text-gray-800 hover:text-white text-2xl"
        aria-label="Fermer"
      >
        <AiOutlineClose />
      </button>
      <h2 className="text-lg font-semibold text-red-600 mb-4">
        Espace réservé
      </h2>
      <p className="text-gray-700 mb-6">
        Cette espace est réservée aux utilisateurs inscrits.
        Veuillez vous connecter pour pouvoir commenter.
      </p>
      <div className="flex justify-center items-center  gap-4">
     
      <button
          onClick={() => {
            setShowLoginModal(false);
            
            window.location.href = "/inscription"; 
          }}
          className="bg-gray-800 hover:text-white text-amber-300 px-4 py-2 rounded w"
        >
          S'inscrire
        </button>
        </div>
        </div>
    </div>
  </div>
)}

    </div>

    
  );
};
