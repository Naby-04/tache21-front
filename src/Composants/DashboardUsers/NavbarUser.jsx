// import { useState } from "react";
// import { Deconnexion } from "./Decconexion";
// import { RiMenuFill } from "react-icons/ri";
// import { Profile } from "./Profile";
// import { MobileSidebar } from "./MobileAffichage";
// import { Input } from "./Recherche/Input";
// import { AddRapport } from "./Rapport/AddRapport";
// import { usePublication } from "../../Contexts/DashboardUser/UseContext";
// import { IoNotifications } from "react-icons/io5";
// import { NotificationModal } from "../NotificationModal";
// import logo from "../../assets/SenRapport.png";
// // import { FaMessage } from "react-icons/fa6";
// // import { MobileSidebar } from "./MobileSidebar"; // importe ton composant mobile

// export const NavbarUser = () => {
//   const [openMobileMenu, setOpenMobileMenu] = useState(false);
//   const {searchTerm, setSearchTerm}= usePublication()
//    const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       user: "Jean Dupont",
//       message: "a commenté votre rapport",
//       time: "10 min",
//       read: false,
//       avatar: "/images/dev.jpg"
//     },
//     {
//       id: 2,
//       user: "Marie Curie",
//       message: "a aimé votre publication",
//       time: "1h",
//       read: true,
//       avatar: "/images/dev.jpg"
//     }
//   ]);
//  const [isNotifOpen, setIsNotifOpen] = useState(false);
//    // Marquer comme lu
//   const markAsRead = (id) => {
//     setNotifications(notifications.map(notif => 
//       notif.id === id ? { ...notif, read: true } : notif
//     ));
//   };

//    // Nombre de notifications non lues
//   const unreadCount = notifications.filter(n => !n.read).length;

//     const handleNotifClick = () => {
//     setIsNotifOpen(true);
//   };

//     const handleNotifClose = () => {
//     setIsNotifOpen(false);
//   };

// 	return (
// 		<div className="relative">
// 			{/* notifications */}

// 			 <NotificationModal
//             notifications={notifications}
//              isOpen={isNotifOpen}
//             onClose={handleNotifClose}
// 			onMarkAsRead={markAsRead}
//             />



// 			{/* Navbar principale */}
// 			<div
// 				className="flex justify-between items-center  p-2 w-full z-10"
// 			>
// 				{/* Logo et profil (mobile) */}
// 				<div>
// 					<div className="md:flex items-center gap-2 hidden">
//           <img src={logo} alt="Logo" className="w-26" />
//         </div>
// 					<div className="block md:hidden">
// 						<Profile />
// 					</div>
// 				</div>

// 				{/* filter recherche */}

// 				<div className="flex items-center gap-3">
// 					<Input
// 					value={searchTerm}
// 					onSearch={setSearchTerm}
// 					/>
// 				</div>

				

// 				{/* Bouton ajout rapport */}
// 				<div className="addDocs hidden  md:flex gap-2 items-center">
// 					<div className="relative cursor-pointer" title="Notifications"
// 					onClick={handleNotifClick}>
// 					<IoNotifications  className="text-white text-2xl"/>
// 					{unreadCount > 0 && (
// 						<small className="absolute top-[-10px] right-0 w-4 h-4 bg-amber-500 text-white 
// 						rounded-full flex items-center justify-center">{unreadCount}</small>
						
// 					)}
// 					</div>
// 					<AddRapport/>
// 				</div>

//         {/* Toggle menu mobile */}
//         <div className="block md:hidden">
//           <RiMenuFill
//             className="text-white text-2xl"
//             onClick={() => setOpenMobileMenu(!openMobileMenu)}
//           />
//         </div>
//       </div>

//       <MobileSidebar
//         isOpen={openMobileMenu}
//         onClose={() => setOpenMobileMenu(false)}
//       />
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import { Deconnexion } from "./Decconexion";
import { RiMenuFill } from "react-icons/ri";
import { Profile } from "./Profile";
import { MobileSidebar } from "./MobileAffichage";
import { Input } from "./Recherche/Input";
import { AddRapport } from "./Rapport/AddRapport";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
import { IoNotifications } from "react-icons/io5";
import { NotificationModal } from "../NotificationModal";
import logo from "../../assets/SenRapport.png";


export const NavbarUser = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const { searchTerm, setSearchTerm } = usePublication();
  const [notifications, setNotifications] = useState([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const {url} = usePublication()
  // Récupérer les notifications à l'initialisation
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
  }, []);

  // Marquer une notification comme lue
  const markAsRead = async (id) => {
    try {
      await fetch(`${url}/api/notifications/${id}/read`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Erreur lors du marquage comme lu :", error);
    }
  };

  // Nombre de notifications non lues
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotifClick = () => {
    setIsNotifOpen(true);
  };

  const handleNotifClose = () => {
    setIsNotifOpen(false);
  };

  return (
    <div className="relative">
      {/* Modal de notifications */}
      <NotificationModal
        notifications={notifications}
        isOpen={isNotifOpen}
        onClose={handleNotifClose}
        onMarkAsRead={markAsRead}
      />

      {/* Navbar principale */}
      <div className="flex justify-between items-center p-2 w-full z-10">
        {/* Logo et profil (mobile) */}
        <div>
          <div className="md:flex items-center gap-2 hidden">
            <img src={logo} alt="Logo" className="w-26" />
          </div>
          <div className="block md:hidden">
            <Profile />
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="flex items-center gap-3">
          <Input value={searchTerm} onSearch={setSearchTerm} />
        </div>

        {/* Boutons à droite */}
        <div className="addDocs hidden md:flex gap-2 items-center">
          <div
            className="relative cursor-pointer"
            title="Notifications"
            onClick={handleNotifClick}
          >
            <IoNotifications className="text-white text-2xl" />
            {unreadCount > 0 && (
              <small className="absolute top-[-10px] right-0 w-4 h-4 bg-amber-500 text-white 
              rounded-full flex items-center justify-center">
                {unreadCount}
              </small>
            )}
          </div>
          <AddRapport />
        </div>

        {/* Menu mobile */}
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
