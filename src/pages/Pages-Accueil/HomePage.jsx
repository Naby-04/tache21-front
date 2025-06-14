import React from "react";

import Header from "../../Composants/Composants-Accuiel/Header";
import SlideShow from "../../Composants/Composants-Accuiel/SlideShow";
import ProjectDescription from "../../Composants/Composants-Accuiel/ProjectDescription";
import TopReports from "../../Composants/Composants-Accuiel/TopReports";
import Footer from "../../Composants/Composants-Accuiel/Footer";
import LesServices from "../../Composants/Composants-Accuiel/LesServices";
import Chatbot from "../../Composants/Composants-Accuiel/Chatbot";






function HomePage() {
  return ( 
    <div className="">
      <Header/>
      <SlideShow/>
      <LesServices />
      <TopReports />
      <ProjectDescription />
      <Footer />
       <Chatbot /> 
    </div>
  );
}

export default HomePage;
