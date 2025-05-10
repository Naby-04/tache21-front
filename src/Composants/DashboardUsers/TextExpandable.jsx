import { useState, useRef, useEffect } from 'react';

export default function TextExpandable({ children }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('60px'); // ~3 lignes

  useEffect(() => {
    if (open && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('40px');
    }
  }, [open]);

  return (
    <div className="ml-5">
      <div
        ref={contentRef}
        style={{
          maxHeight: maxHeight,
          overflow: 'hidden',
          transition: 'max-height 0.5s ease',
        }}
      >
        <div className="text-sm text-gray-700">{children}</div>
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="mt-2 text-blue-600 hover:underline text-sm"
      >
        {open ? 'Voir moins' : 'Voir plus'}
      </button>
    </div>
  );
}
