// src/components/PDFViewer.js
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';

// Utilisation du worker local
// import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';

// Configurer le worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', width: 'fit-content' }}>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <Page pageNumber={1} width={300} />
      </Document>
    </div>
  );
}

export default PDFViewer;
