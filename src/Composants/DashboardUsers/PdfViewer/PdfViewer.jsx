<<<<<<< HEAD
import { Document, Page,pdfjs } from 'react-pdf';
// import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
=======
import { Document, Page } from 'react-pdf';
import { useEffect, useState } from 'react';
>>>>>>> df10b4cf8d1b0d7122648bc6dfd187a52f78207b


function PdfViewer({ file, width, height }) {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  console.log(numPages);
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
