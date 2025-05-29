import { Document, Page,pdfjs } from 'react-pdf';
// import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


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