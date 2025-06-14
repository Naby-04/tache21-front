import { useState, useEffect, useRef } from "react";
import { RiMenuFill } from "react-icons/ri";
import { Profile } from "./Profile";
import { MobileSidebar } from "./MobileAffichage";
import { Input } from "./Recherche/Input";
import { AddRapport } from "./Rapport/AddRapport";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { IoNotifications } from "react-icons/io5";
import { NotificationModal } from "../NotificationModal";
import logo from "../../assets/SenRapport.png";
import { io } from "socket.io-client";
import {jwtDecode} from "jwt-decode";


export const NavbarUser = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const { searchTerm, setSearchTerm, url } = usePublication();
  const [notifications, setNotifications] = useState([]);          
  const [liveNotifications, setLiveNotifications] = useState([]); 
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [userInf, setUserInfo] = useState(null)
  const socketRef = useRef(null);

  // Initialiser le socket.io
//   useEffect(() => {
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   setUserInfo(userInfo)
//   const userId = userInfo?.id;
//   setUser(userId)

//   if (!userId) return;

//   // Crée une seule connexion
//   if (!socketRef.current) {
//     socketRef.current = io(url, {
//       transports: ['websocket'],
//       reconnection: true,
//       reconnectionAttempts: 5,
//     });

//     socketRef.current.on("connect", () => {
//       // console.log("Socket connecté !");
//       socketRef.current.emit("join", userId);
//     });

//     socketRef.current.on("connect_error", (err) => {
//       console.error("Erreur de connexion socket.io :", err.message);
//     });

//     socketRef.current.on("newNotification", (notif) => {
//       console.log("Notification reçue :", notif);
//       setLiveNotifications((prev) => [notif, ...prev]);
//     });
//   }

//   return () => {
//     if (socketRef.current) {
//       socketRef.current.disconnect();
//       socketRef.current = null;
//     }
//   };
// }, []);

// ...

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const decoded = jwtDecode(token);
    const userId = decoded.id; // ou decoded._id selon le backend
    setUser(userId);
    setUserInfo(decoded);

    if (!socketRef.current) {
      socketRef.current = io(url, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
      });

      socketRef.current.on("connect", () => {
        socketRef.current.emit("join", userId);
      });

      socketRef.current.on("connect_error", (err) => {
        console.error("Erreur de connexion socket.io :", err.message);
      });

      socketRef.current.on("newNotification", (notif) => {
        setLiveNotifications((prev) => [notif, ...prev]);
      });
    }
  } catch (err) {
    console.error("Token invalide ou expiré :", err);
    // éventuellement déconnecter l'utilisateur ici
  }

  return () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };
}, []);

console.log(user)

  // Charger les notifications depuis l’API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${url}/api/notifications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Erreur de chargement des notifications :", error);
      }
    };

    fetchNotifications();
  }, [url]);

  // Fusion des notifications socket + serveur
  const allNotifications = [...liveNotifications, ...notifications];

  // Marquer une notification comme lue
  const markAsRead = async (id) => {
    try {
      await fetch(`${url}/api/notifications/${id}/read`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Marque comme lue dans les deux listes
      const updateList = (list) =>
        list.map((notif) =>
          notif._id === id ? { ...notif, isRead: true } : notif
        );

      setNotifications(updateList);
      setLiveNotifications(updateList);
    } catch (error) {
      console.error("Erreur lors du marquage comme lu :", error);
    }
  };

  const unreadCount = allNotifications.filter((n) => !n.isRead).length;

  const handleNotifClick = () => setIsNotifOpen(true);
  const handleNotifClose = () => setIsNotifOpen(false);

  return (
    <div className="relative">
      <NotificationModal
        notifications={allNotifications}
        isOpen={isNotifOpen}
        onClose={handleNotifClose}
        onMarkAsRead={markAsRead}
      />

      <div className="flex justify-between items-center p-2 w-full z-10">
        <div>
          <div className="cursor-pointer flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-15 md:w-26" />
          </div>
          
        </div>

        <div className="flex items-center gap-3">
          <Input value={searchTerm} onSearch={setSearchTerm} className="flex-1"/>
        </div>

        <div className="addDocs  flex gap-2 items-center">
          <div
            className="relative cursor-pointer"
            title="Notifications"
            onClick={handleNotifClick}
          >
            <IoNotifications className="text-white text-2xl cursor-pointer" />
            {unreadCount > 0 && (
              <small className="absolute top-[-10px] right-0 w-4 h-4 bg-amber-500 text-white 
              rounded-full flex items-center justify-center text-xs">
                {unreadCount}
              </small>
            )}
          </div>
          <div className="cursor-pointer hidden lg:block">
          <AddRapport />
          </div>
        </div>

        <div className="block lg:hidden cursor-pointer">
          <RiMenuFill
            className="text-white text-2xl"
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          />
        </div>
      </div>

      <MobileSidebar
        isOpen={openMobileMenu}
        onClose={() => setOpenMobileMenu(false)}
      />
    </div>
  );
};
