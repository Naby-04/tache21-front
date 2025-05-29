import { Document, Page } from 'react-pdf';

function PdfViewer({ file, width, height }) {
  // console.log("url",file);
  
  return (
    <Document file={file} loading="Chargement...">
      <Page 
        pageNumber={1} 
        width={width}
        height={height}
        renderTextLayer={false}
        loading="Chargement de la page..."
      />
    </Document>
  );
}

export default PdfViewer;