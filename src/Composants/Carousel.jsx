import React, { useState, useEffect } from "react";

const images = [
  "https://i.pinimg.com/736x/25/1b/67/251b679cd282ef1b61673f6377b99e23.jpg",
  "https://i.pinimg.com/736x/ab/68/a5/ab68a5f7f808d25bff94d4e94c1bac97.jpg",
  "https://i.pinimg.com/736x/59/ee/40/59ee4047d303d7ccf7d9cd16fc3d864c.jpg",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // change toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" bg-black h-screen relative w-full mx-auto overflow-hidden rounded-lg shadow-lg my-7">
      <img
        src={images[current]}
        alt={`carousel-${current}`}
        className="w-full object-cover transition duration-500 ease-in-out"
      />

      {/* Boutons précédent/suivant */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
        }
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
      >
        ◀
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
      >
        ▶
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
