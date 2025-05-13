import React, { useEffect, useRef } from "react";
import CategorieCard from "./CategorieCard";

const CardScroll = ({ services, selectedIndex, setSelectedIndex }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
  const scrollContainer = scrollRef.current;
  let intervalId;

  const startScrolling = () => {
    intervalId = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 100;
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 1000);
  };

  const stopScrolling = () => {
    clearInterval(intervalId);
  };

  if (scrollContainer) {
    scrollContainer.addEventListener("mouseenter", stopScrolling);
    scrollContainer.addEventListener("mouseleave", startScrolling);
    startScrolling(); // Commence à faire défiler automatiquement
  }

  return () => {
    clearInterval(intervalId);
    if (scrollContainer) {
      scrollContainer.removeEventListener("mouseenter", stopScrolling);
      scrollContainer.removeEventListener("mouseleave", startScrolling);
    }
  };
}, []);

  return (
    <div>
      <p className="text-center text-gray-600 mb-4">
  Filtrez les rapports par catégorie pour trouver rapidement ce que vous cherchez.
</p>
      <div
        ref={scrollRef}
        className="flex py-3 justify-start space-x-4 overflow-x-auto max-w-[700px] mx-auto"
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
    </div>
  );
};

export default CardScroll;
