import React from "react";
import Header from "../Composants/Header";

import SlideShow from "../Composants/SlideShow";
import ProjectDescription from "../Composants/ProjectDescription";
import TopReports from "../Composants/TopReports";
import Footer from "../Composants/Footer";
import PDFViewer from "../Composants/PDFViewer";

function HomePage() {
  return (
    <div className="">
      <Header />
      <SlideShow />
      <ProjectDescription />
      <TopReports />
      <Footer />
       <div style={{ padding: '20px' }}>
            <h2>Prévisualisation PDF (1ère page)</h2>
            <PDFViewer fileUrl="../../public/Le HTML resume.pdf" />
          </div>
    </div>
  );
}

export default HomePage;
