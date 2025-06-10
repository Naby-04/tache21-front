import { useEffect, useRef } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export const NotificationModal = ({ isOpen, onClose, notifications, onMarkAsRead }) => {
  const modalRef = useRef(null);
console.log(notifications)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800/10 z-50 flex justify-end pt-16 px-4 md:px-8">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md h-[70vh] md:h-[80vh] rounded-t-lg md:rounded-lg shadow-xl overflow-hidden flex flex-col"
      >
        {/* En-tête */}
        <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-lg">Notifications</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Contenu */}
        <div className="overflow-y-auto flex-1">
          {notifications.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {notifications.map((notif, index) => (
                <li
                  key={index}
                  className="p-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => onMarkAsRead(notif._id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={notif?.messager?.photo || "/default-avatar.png"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border border-gray-800 shadow"
                      />
                      {!notif?.isRead && (
                        <FaCircle className="text-gray-800 absolute -top-1 -right-1 text-xs" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm break-words">
                        <span className="font-semibold">{notif.messager?.prenom}</span> a commenté : 
                        <span className="italic"> "{notif?.comment.length > 80 ? notif?.comment.slice(0, 80) + "..." : notif?.comment}" </span>
                        <br />
                        <span>Sur votre rapport : </span>
                        <span className="italic font-bold break-words">{notif.rapport?.title}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(notif?.createdAt), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center p-6">
              <IoNotificationsOutline className="text-4xl mb-2" />
              <p>Aucune notification</p>
            </div>
          )}
        </div>

        {/* Pied de page */}
        <div className="bg-gray-100 p-3 border-t text-center">
        </div>
      </div>
    </div>
  );
};
