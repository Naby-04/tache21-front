import { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  const toggleChat = () => {
    setOpen(!open);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div
          className="mb-2 w-[390px] max-w-[95vw] h-[430px] max-h-[80vh] rounded-lg shadow-lg border-4 border-gray-200 overflow-hidden animate-fade-slide"
        >
          <iframe
            src="https://typebot.co/faq-n5ywjzo"
            className="w-full h-full border-0"
            allow="clipboard-write; microphone"
            title="Chatbot FAQ"
          ></iframe>
        </div>
      )}

      <button
        onClick={toggleChat}
        className="w-12 h-12 rounded-full bg-[#FFB800] hover:bg-[#e6a700] text-white flex items-center justify-center shadow-xl"
        title="Ouvrir le chatbot FAQ"
      >
        <AiOutlineMessage size={24} />
      </button>
    </div>
  );
};

export default Chatbot;