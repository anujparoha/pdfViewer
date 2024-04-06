import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfComp({pdfFile}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className='pdf-div'>
      <p>
        page {pageNumber} of {numPages}
      </p>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages &&
          Array.from(Array(numPages), (x, i) => (
            <Page
              key={`page_${i + 1}`}
              pageNumber={i + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default PdfComp;
