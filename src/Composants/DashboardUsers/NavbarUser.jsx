import { useState } from "react";
import { Deconnexion } from "./Decconexion";
import { RiMenuFill } from "react-icons/ri";
import { Profile } from "./Profile";
import { MobileSidebar } from "./MobileAffichage";
import { Input } from "./Recherche/Input";
import { AddRapport } from "./Rapport/AddRapport";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { IoNotifications } from "react-icons/io5";
import { NotificationModal } from "../NotificationModal";
import { useEffect } from "react";
import { socket } from "../DashboardUsers/socket"; 
// import { useAuth } from "../../Contexts/AuthContext";
// import { FaMessage } from "react-icons/fa6";
// import { MobileSidebar } from "./MobileSidebar"; // importe ton composant mobile

export const NavbarUser = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const {searchTerm, setSearchTerm}= usePublication()
   const [notifications, setNotifications] = useState([
     {
       id: 1,
       user: "Jean Dupont",
       message: "a commenté votre rapport",
       time: "10 min",
       read: false,
       avatar: "/images/dev.jpg"
     },
     {
       id: 2,
       user: "Marie Curie",
       message: "a aimé votre publication",
       time: "1h",
       read: true,
       avatar: "/images/dev.jpg"
     }
  ]);
//   const {user} = useAuth()

//   useEffect(() => {
//   if (user?._id) {
//     socket.emit("register", user._id); // enregistre l'utilisateur

//     socket.on("new_notification", (data) => {
//       setNotifications(prev => [
//         {
//           id: Date.now(), // ou data._id
//           user: data.senderName || "Quelqu'un", // personnalise
//           message: data.message || "a effectué une action",
//           time: "Maintenant",
//           read: false,
//           avatar: "/images/dev.jpg"
//         },
//         ...prev,
//       ]);
//     });

//     return () => {
//       socket.off("new_notification");
//     };
//   }
// }, [user]);
 const [isNotifOpen, setIsNotifOpen] = useState(false);
   // Marquer comme lu
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

   // Nombre de notifications non lues
  const unreadCount = notifications.filter(n => !n.read).length;

    const handleNotifClick = () => {
    setIsNotifOpen(true);
  };

    const handleNotifClose = () => {
    setIsNotifOpen(false);
  };

	return (
		<div className="relative">
			{/* notifications */}

			 <NotificationModal
            notifications={notifications}
             isOpen={isNotifOpen}
            onClose={handleNotifClose}
			onMarkAsRead={markAsRead}
            />



			{/* Navbar principale */}
			<div
				className="flex justify-between items-center  p-2 w-full z-10"
			>
				{/* Logo et profil (mobile) */}
				<div>
					<div className="md:flex items-center gap-2 hidden">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain bg-amber-300 rounded-full" />
          <span className="text-xl font-bold text-amber-300">SenRapport</span>
        </div>
					<div className="block md:hidden">
						<Profile />
					</div>
				</div>

				{/* filter recherche */}

				<div className="flex items-center gap-3">
					<Input
					value={searchTerm}
					onSearch={setSearchTerm}
					/>
				</div>

				

				{/* Bouton ajout rapport */}
				<div className="addDocs hidden  md:flex gap-2 items-center">
					<div className="relative cursor-pointer" title="Notifications"
					onClick={handleNotifClick}>
					<IoNotifications  className="text-white text-2xl"/>
					{unreadCount > 0 && (
						<small className="absolute top-[-10px] right-0 w-4 h-4 bg-amber-500 text-white 
						rounded-full flex items-center justify-center">{unreadCount}</small>
						
					)}

					</div>
					<AddRapport/>
				</div>

        {/* Toggle menu mobile */}
        <div className="block md:hidden">
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
