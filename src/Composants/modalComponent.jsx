import React from "react";

const ModalComponent = ({isOpen,onClose,title = "Confirmation",message = "Voulez-vous vraiment continuer ?"
    ,onConfirm,confirmText = "Confirmer",cancelText = "Annuler"}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-4 relative">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
