import { useEffect, useRef } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";

export const NotificationModal = ({ isOpen, onClose, notifications,onMarkAsRead }) => {
  const modalRef = useRef(null);

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
    <div className="fixed inset-0  bg-opacity-50 z-50 flex justify-end pt-16">
      <div 
        ref={modalRef}
        className="bg-white w-full max-w-md h-[70vh] rounded-t-lg shadow-xl overflow-hidden"
      >
        {/* En-tête */}
        <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-lg">Notifications</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {/* Contenu */}
        <div className="overflow-y-auto h-full">
          {notifications.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {notifications.map((notif, index) => (
                <li key={index} className="p-4 hover:bg-gray-50" onClick={() => onMarkAsRead(notif.id)}>
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img 
                        src={notif.avatar || "/default-avatar.png"} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full"
                      />
                      {!notif.read && (
                        <FaCircle className="text-blue-500 absolute -top-1 -right-1 text-xs" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">{notif.user}</span> {notif.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <IoNotificationsOutline className="text-4xl mb-2" />
              <p>Aucune notification</p>
            </div>
          )}
        </div>

        {/* Pied de page */}
        <div className="bg-gray-100 p-3 border-t text-center">
          <button className="text-blue-500 text-sm font-medium">
            Voir toutes les notifications
          </button>
        </div>
      </div>
    </div>
  );
};