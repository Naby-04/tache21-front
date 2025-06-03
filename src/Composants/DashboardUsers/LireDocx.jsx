import { IoOpenOutline } from "react-icons/io5";
export const LireDocx = ({ isOpen, onClose, htmlContent, onOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur p-2  bg-opacity-50">
      <div className="bg-white max-h-[80vh] overflow-y-auto w-full max-w-[80vw] p-6 rounded-md shadow-lg relative">
        <button onClick={onClose} className="fixed right-25 top-[65px] md:right-65 text-red-500 text-xl font-bold
        cursor-pointer">✕</button>

        <button className="fixed top-[65px] left-25 md:left-65 text-gray-800 text-2xl font-bold cursor-pointer"
        onClick={onOpen}>
            <IoOpenOutline/>
        </button>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
};
