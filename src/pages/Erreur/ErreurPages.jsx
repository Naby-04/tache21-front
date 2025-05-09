import React from 'react';

const ErreurPages = ({ code, title, message, buttonText, buttonLink }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-9xl font-extrabold text-black mb-4">{code}</h1>
      <h2 className="text-4xl font-bold text-black mb-4">{title}</h2>
      <p className="text-black text-2xl mb-6">{message}</p>
      <a
        href={buttonLink}
        className="px-6 py-3 bg-beige text-black rounded-lg hover:bg-amber-200 transition"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default ErreurPages;
