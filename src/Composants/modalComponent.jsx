import React from "react";

const ModalComponent = ({isOpen,onClose,title = "Confirmation",message = "Voulez-vous vraiment continuer ?"
    ,onConfirm,confirmText = "Confirmer",cancelText = "Annuler"}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg w-[90%] max-w-md p-4 relative">
        <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
        <p className="text-sm text-white mb-6">{message}</p>

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
