import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const images = [
  "https://images.pexels.com/photos/1157151/pexels-photo-1157151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://www.studycdn.space/sites/default/files/2022-03/rediger-memoire-rapport-stage-master-pro_0.png",
  "https://media.istockphoto.com/id/1367295077/photo/graduation-day.jpg?s=612x612&w=0&k=20&c=xKHuyuZaUXi08aF26dWaNO-eKHZLD7dGj8CVUJrJcNY=",
];

const SlideShow = () => {
  const [current, setCurrent] = useState(0);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // change toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" h-[100vh] slideshow-bg w-full mx-auto overflow-hidden shadow-lg">
      <img
        src={images[current]}
        alt={`carousel-${current}`}
        className="w-full h-full object-cover transition duration-500 ease-in-out"
      />

      <div className="absolute inset-0 flex items-center justify-center text-center px-10 md:px-20 z-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white">
            <span className="text-white"> Publiez </span>
            <span className="text-amber-300">vos rapports, explorez</span>
            <br />
            <span className="text-white"> ceux des autres commentez,</span>{" "}
            <span className="text-amber-300">téléchargez visualisez</span>
          </h1>
          <p className="mt-4 mb-6 text-white">
            Et faites partie d’une communauté de savoir en évolution.
          </p>
          <Link to="/rapports" className="mt-6 bg-amber-300  text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition">
         Découvrir les meilleurs rapports  
         </Link> 
        </div>
      </div>

      {/* Indicateurs */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;

// const SlideShow = () => {
//   return (
//     <div
//       className="relative bg-cover bg-center slideshow-bg mt-18 max-w-7xl mx-auto mt-30 rounded-2xl"
//       style={{
//         backgroundImage: "url('https://cdn.pixabay.com/photo/2020/07/05/10/00/books-5372392_1280.jpg')",
//       }}
//     >
// <div className="flex items-center justify-between rounded-2xl px-20 py-15 max-w-7xl mx-auto relative z-10">
//   <div className="max-w-2xl">
//     <h1 className="text-4xl font-[var(--font-title)] text-black leading-tight">
//       Publiez vos rapports, <span className="text-white">explorez ceux des autres</span><br />
//       commentez, téléchargez <span className="text-black">visualisez</span>
//     </h1>
//     <p className="text-white mt-4">
//       et faites partie d’une communauté de savoir en évolution.
//     </p>
//     <button className="mt-8 bg-yellow-600 text-white px-6 py-3 rounded-full flex items-center gap-2 font-semibold transition">
//       Découvrir les meilleurs rapports
//     </button>
//   </div>

//         <button className="bg-yellow-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-yellow-700 transition">
//           <span className="text-xl">{'>'}</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SlideShow;
