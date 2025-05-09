import { useRef, useEffect } from "react";

export default function CommentModal({ onClose, onSubmit, documentId }) {
  const textareaRef = useRef();

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.comment.value.trim();
    if (value) {
      onSubmit(value, documentId);
      e.target.reset();
      onClose();
    }
  };

  return (
    <div className="mt-4 p-4 border-t border-gray-200 bg-gray-50 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit}>
        <textarea
          name="comment"
          rows="2"
          ref={textareaRef}
          placeholder="Écrivez un commentaire..."
          className="w-full border-[var(--text-couleur)] p-2 rounded-md resize-none focus:outline-none focus:ring"
          required
        />
        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:underline"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-1 bg-blue-600 text-white rounded hover:opacity-80"
          >
            Publier
          </button>
        </div>
      </form>
    </div>
  );
}
