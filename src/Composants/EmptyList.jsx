import React, { useEffect, useState } from 'react';
import image from "../assets/emp.png";

const EmptyList = () => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000); // Animation de 1s
    }, 3000); // Toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center py-7">
      <img
        src={image}
        alt="center"
         className="w-60 md:w-70 rounded-full z-10 animate-float-image"
      />
    </div>
  );
};

export default EmptyList;
