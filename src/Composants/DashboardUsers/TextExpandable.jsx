import { useState, useRef, useEffect } from 'react';

export default function TextExpandable({ children }) {
   const texteRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  

  useEffect(() => {
    if (texteRef.current) {
      const lineHeight = parseFloat(getComputedStyle(texteRef.current).lineHeight);
      const height = texteRef.current.scrollHeight;
      const numberOfLines = height / lineHeight;

      if (numberOfLines > 3) {
        setShowToggle(true);
      }
    }
  }, [children]);

  return (
    <div>
      <p
        ref={texteRef}
        className={`text-base leading-6 transition-all duration-300 ease-in-out ${
          isExpanded ? '' : 'line-clamp-3'
        }`}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: isExpanded ? 'none' : 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {children}
      </p>

      {showToggle && (
        <button
          className="text-blue-600 mt-2 hover:underline"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Voir moins" : "Voir plus"}
        </button>
      )}
    </div>
  );
}
