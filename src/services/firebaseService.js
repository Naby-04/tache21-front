import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWwPglE0UYs_momw02XgsTS8VLzVDwaDg",
  authDomain: "newsletter-demo-9697f.firebaseapp.com",
  projectId: "newsletter-demo-9697f",
  storageBucket: "newsletter-demo-9697f..appspot.com",
  messagingSenderId: "897028446043",
  appId: "1:897028446043:web:c1b9bd9fbd503a367f6c7e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
export { auth, db, serverTimestamp };
