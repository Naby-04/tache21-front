import { useState, useEffect } from "react";
import { IoOpenOutline } from "react-icons/io5";
import { Document, Page } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

export const LirePdf = ({ isOpen, onClose, file, onOpen }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(800); // Valeur par défaut

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = 800;
      const screenWidth = window.innerWidth;
      const newWidth = screenWidth < maxWidth ? screenWidth * 0.9 : maxWidth;
      setPageWidth(newWidth);
    };

    handleResize(); // appeler au chargement
    window.addEventListener('resize', handleResize); // mettre à jour au redimensionnement

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur z-50 flex items-center justify-center w-full bg-opacity-60">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-[90vw] md:max-w-[80vw] w-full max-h-[90vh] overflow-y-auto relative flex justify-center">
        <div>
          <button
            onClick={onClose}
            className="fixed top-[50px] z-100 right-25 md:right-50 text-gray-700 hover:text-red-600 text-2xl font-bold"
          >
            ✕
          </button>

          <button
            className="fixed top-[50px] z-100 left-25 md:left-50 text-gray-900 hover:text-blue-600 text-2xl font-bold"
            onClick={onOpen}
          >
            <IoOpenOutline />
          </button>

          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p className="text-center">Chargement du PDF...</p>}
            error={<p className="text-red-500 text-center">Erreur de chargement du PDF</p>}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={pageWidth}
                className="mb-4"
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};
