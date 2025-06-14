import { Document, Page } from 'react-pdf';
import { useEffect, useState } from 'react';


function PdfViewer({ file, width, height }) {
  // eslint-disable-next-line no-unused-vars
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setNumPages(null);
  }, [file]);

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleLoadError = (err) => {
    console.error("Erreur lors du chargement du PDF :", err);
    setError("Impossible de charger le document.");
  };

  if (!file) return null; 
  return (
    <div>
      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <Document
          file={file}
          onLoadSuccess={handleLoadSuccess}
          onLoadError={handleLoadError}
          key={file} 
          loading="Chargement du document..."
        >
          <Page 
            pageNumber={1} 
            width={width}
            height={height}
            renderTextLayer={false}
            loading="Chargement de la page..."
          />
        </Document>
      )}
    </div>
  );
}

export default PdfViewer;
