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
      }, 2000); // défilement plus doux pour mobile
    };

    const stopScrolling = () => {
      clearInterval(intervalId);
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("mouseenter", stopScrolling);
      scrollContainer.addEventListener("mouseleave", startScrolling);
      startScrolling();
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
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
      <p className="text-center text-sm sm:text-base md:text-lg text-gray-600 mb-4">
        Filtrez les rapports par catégorie pour trouver rapidement ce que vous
        cherchez.
      </p>

      <div
        ref={scrollRef}
        className="flex items-stretch py-3 space-x-4 overflow-x-auto scrollbar-hide"
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            onClick={() => setSelectedIndex(index)}
          >
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
