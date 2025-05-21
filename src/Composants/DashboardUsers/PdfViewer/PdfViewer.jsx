import { Document, Page } from 'react-pdf';

function PdfViewer({ file, width }) {
  return (
    <Document file={file} loading="Chargement...">
      <Page 
        pageNumber={1} 
        width={width}
        renderTextLayer={false}
        loading="Chargement de la page..."
      />
    </Document>
  );
}

export default PdfViewer;