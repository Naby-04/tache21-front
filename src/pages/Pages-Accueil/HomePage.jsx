import React from "react";

import Header from "../../Composants/Composants-Accuiel/Header";
import SlideShow from "../../Composants/Composants-Accuiel/SlideShow";
import ProjectDescription from "../../Composants/Composants-Accuiel/ProjectDescription";
import TopReports from "../../Composants/Composants-Accuiel/TopReports";
import Footer from "../../Composants/Composants-Accuiel/Footer";


function HomePage() {
  return ( 
    <div className="">
      <Header/>
      <SlideShow/>
      <ProjectDescription />
      <TopReports />
      <Footer />
    </div>
  );
}

export default HomePage;
