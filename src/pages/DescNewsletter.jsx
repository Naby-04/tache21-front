import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebaseService";
import { toast } from "react-toastify";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    const unsubscribeUser = async () => {
      if (!email) {
        toast.error("Aucun email fourni.");
        return;
      }

      try {
        const emailsRef = collection(db, "emails");
        const q = query(emailsRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          toast.info("Cet email n'est pas inscrit.");
          return;
        }

        querySnapshot.forEach(async (docSnap) => {
          await deleteDoc(docSnap.ref);
        });

        toast.success("Vous avez été désinscrit avec succès !");
      } catch (err) {
        console.error("Erreur désinscription :", err);
        toast.error("Erreur lors de la désinscription.");
      }
    };

    unsubscribeUser();
  }, [email]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-amber-500">Désinscription</h2>
        <p className="text-gray-700">
          Si l'adresse <strong>{email}</strong> était dans notre base de données,
          elle a bien été supprimée.
        </p>
      </div>
    </div>
  );
};

export default Unsubscribe;
