import React, { useEffect, useRef } from "react";
import CategorieCard from "./CategorieCard";

const CardScroll = ({ services, selectedIndex, setSelectedIndex }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const interval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 100; // scroll 100px à gauche
        // Remet au début si on atteint la fin
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      ref={scrollRef}
      className="flex py-5 justify-start space-x-4 overflow-x-auto max-w-[500px] mx-auto"
    >
      {services.map((service, index) => (
        <div key={index} onClick={() => setSelectedIndex(index)}>
          <CategorieCard
            icon={service.icon}
            label={service.label}
            selected={index === selectedIndex}
          />
        </div>
      ))}
    </div>
  );
};

export default CardScroll;
