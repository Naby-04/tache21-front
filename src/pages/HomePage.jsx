import React from "react";
import Header from "../Composants/Header";
import Carousel from "../Composants/Carousel";

import SlideShow from "../Composants/SlideShow";
import ProjectDescription from "../Composants/ProjectDescription";
import TopReports from "../Composants/TopReports";
import Footer from "../Composants/Footer";

function HomePage() {
  return (
    <div className="bg-gray-50 pt-10">
      <Header />
      <Carousel />
      <SlideShow />
      <ProjectDescription />
      <TopReports />
      <Footer />
    </div>
  );
}

export default HomePage;
