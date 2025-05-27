import { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-2 w-[390px] h-[430px] rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <iframe
            src="https://typebot.co/faq-n5ywjzo"
            className="w-full h-full"
          ></iframe>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-[#FFB800] hover:bg-[#e6a700] text-white flex items-center justify-center shadow-xl"
        title="FAQ"
      >
        <AiOutlineMessage size={25} />
      </button>
    </div>
  );
};

export default Chatbot;
