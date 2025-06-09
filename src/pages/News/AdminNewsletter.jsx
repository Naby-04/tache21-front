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
      console.warn("Champs manquants :", { nom, subject, content });
      return;
    }

    setLoading(true);
    console.log("Début de l'envoi de la newsletter...");

    try {
      const emailsRef = collection(db, "emails");
      const snapshot = await getDocs(emailsRef);
      const emailList = snapshot.docs
        .map((doc) => doc.data().email)
        .filter((email) => typeof email === "string" && email.includes("@"));
      console.log("Emails filtrés :", emailList);

      console.log("Emails récupérés depuis Firestore :", emailList);

      for (let email of emailList) {
        const result = await emailjs.send(
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

        console.log(`✅ Email envoyé à ${email} :`, result);
        // Petite pause de 300ms
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      toast.success("Newsletter envoyée à tous les inscrits !");
      console.log("✅ Tous les emails ont été envoyés avec succès.");

      setNom("");
      setSubject("");
      setContent("");
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi :", error);
      toast.error("Échec de l’envoi de la newsletter.");
    } finally {
      setLoading(false);
      console.log("⏹️ Fin du processus d'envoi.");
    }
  };

  return (
    <form
      onSubmit={sendNewsletter}
      className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg mt-10"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">
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
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-amber-500 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Envoi en cours..." : "Envoyer à tous"}
      </button>
    </form>
  );
};

export default AdminNewsletter;
