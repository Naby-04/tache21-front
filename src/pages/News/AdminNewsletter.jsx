// import { useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../services/firebaseService";
// import emailjs from "@emailjs/browser";
// import { toast } from "react-toastify";
// import React, { useRef } from "react";
// import { set } from "date-fns";

// const AdminNewsletter = () => {
//     const[nom, setNom]=useState("")
//     const [ subject, setSubject] = useState("");
//     const [content, setContent] = useState("");

//   const form = useRef();

//   const sendEmail = async (e) => {
//     e.preventDefault();

//      if (!nom || ! subject || !content) {
//          toast.warn("Sujet et contenu requis.");
//          return;
//        }


//         try {
//          const emailsRef = collection(db, "emails");
//          const snapshot = await getDocs(emailsRef);
//          const emailList = snapshot.docs.map((doc) => doc.data().email);

//          for (let email of emailList) {
//            await emailjs.sendForm(
//              "service_wmra0c7", // Ton service EmailJS
//              "template_sefm4xo", // Ton template adapté pour newsletter
//                {user_name: nom,
//                user_email: email,
//                message_subject: subject,
//                message_content: content,
//                unsubscribe_link: `http://localhost:5173/#/unsubscribe?email=${email}`,
//              },
//              "8uD6SuB_tZuWwNH9Y" // Ton User ID EmailJS
//            );
//          }

//     emailjs
//       .send("service_wmra0c7", "template_sefm4xo", form.current, {
//         publicKey: "8uD6SuB_tZuWwNH9Y",
//       })
//       .then(
//         () => {
//             toast.success("Newsletter envoyée à tous les inscrits !");
//              setNom("")
//          setSubject("");
//          setContent(""); 
//         },(error) => {
//           console.log("FAILED...", error.text);
//            toast.error("Échec de l’envoi de la newsletter.");
//         }
//       );
//   }
//  }
  

//   return (
//     <form
//       ref={form}
//       onSubmit={sendEmail}
//       className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg mt-10"
//     >
//       <h2 className="text-xl font-bold mb-4 text-amber-500">
//         Envoyer une newsletter
//       </h2>
//       <label>Name</label>
//       <input type="text"  className="w-full p-2 mb-3 border rounded" name="user_name" />
//       <label>Email</label>
//       <input type="email"  className="w-full p-2 mb-3 border rounded" name="user_email" />
//       <label>Message</label>
//       <textarea  className="w-full p-2 mb-3 border rounded h-32" name="message" />
//       <input type="submit" className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 disabled:opacity-50" value="Send" />
//     </form>
//   );
// };

// export default AdminNewsletter;
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseService";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const AdminNewsletter = () => {
  const [nom, setNom] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const sendNewsletter = async (e) => {
    e.preventDefault();

    if (!nom || !subject || !content) {
      toast.warn("Tous les champs sont requis.");
      return;
    }

    setLoading(true);

    try {
      const emailsRef = collection(db, "emails");
      const snapshot = await getDocs(emailsRef);
      const emailList = snapshot.docs.map((doc) => doc.data().email);

      for (let email of emailList) {
        await emailjs.send(
          "service_wmra0c7",
          "template_sefm4xo",
          {
            user_name: nom,
            user_email: email,
            message_subject: subject,
            message_content: content,
            unsubscribe_link: `http://localhost:5173/#/unsubscribe?email=${email}`,
          },
          "8uD6SuB_tZuWwNH9Y"
        );
      }

      toast.success("Newsletter envoyée à tous les inscrits !");
      setNom("");
      setSubject("");
      setContent("");
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      toast.error("Échec de l’envoi de la newsletter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={sendNewsletter}
      className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg mt-10"
    >
      <h2 className="text-xl font-bold mb-4 text-amber-500">
        Envoyer une newsletter
      </h2>

      <label>Nom de l'expéditeur</label>
      <input
        type="text"
        name="user_name"
        className="w-full p-2 mb-3 border rounded"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />

      <label>Sujet</label>
      <input
        type="text"
        name="message_subject"
        className="w-full p-2 mb-3 border rounded"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <label>Contenu</label>
      <textarea
        name="message_content"
        className="w-full p-2 mb-3 border rounded h-32"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        type="submit"
        className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Envoi en cours..." : "Envoyer à tous"}
      </button>
    </form>
  );
};

export default AdminNewsletter;
