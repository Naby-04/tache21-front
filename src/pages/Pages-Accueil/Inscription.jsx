import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider, db } from '../../services/firebaseService';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { signInWithPopup } from 'firebase/auth';
import FormContext from '../../Contexts/FormContext';
import { toast } from 'react-toastify';
import { usePublication } from '../../Contexts/DashboardUser/UseContext';
import { FaEye, FaEyeSlash, FaArrowLeft, FaSignOutAlt } from 'react-icons/fa'; 
import AuthContext from '../../Contexts/AuthContext';
import ClipLoader from "react-spinners/ClipLoader";

const Inscription = () => {
  // const [error, setError] = useState("");
  const { formData, updateFormData, resetFormData } = useContext(FormContext);
  const navigate = useNavigate();
  const { url } = usePublication();
  const {setUsers} = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  


  // Ajout des états pour afficher/masquer les mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const prenom = user.displayName;
    const email = user.email;

    // 🔐 Optionnel : enregistrer dans Firestore (frontend DB)
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        prenom,
        email,
        photoURL: user.photoURL || null,
        createdAt: new Date().toISOString(),
      });
    }

    // 🔐 Récupère le token Firebase (pour sécurité si besoin)
    const idToken = await user.getIdToken();

    // 📡 Appelle ton backend pour enregistrer
    const response = await fetch(`${url}/api/users/google-register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`, // seulement si ton backend le vérifie
      },
      body: JSON.stringify({ prenom, email })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    // 💾 Stockage local
    localStorage.setItem('token', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data.user));
    setUsers(data.user);

    // ✅ Connexion OK
    toast.success('Inscription réussie avec Google !');
    navigate('/users');

  } catch (error) {
    console.error('Erreur Google Auth:', error);
    toast.error(error.message || 'Erreur lors de la connexion avec Google.');
  }
};


  // const handleGoogleLogin = async () => {
  //   try {
  //     // Connexion via Google
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;

  //     // Référence du document utilisateur dans Firestore
  //     const userRef = doc(db, 'users', user.uid);
  //     const docSnap = await getDoc(userRef);

  //     // Si l'utilisateur n'existe pas déjà, on l'ajoute
  //     if (!docSnap.exists()) {
  //       await setDoc(userRef, {
  //         prenom: user.displayName,
  //         email: user.email,
  //         photoURL: user.photoURL || null,
  //         createdAt: new Date().toISOString(),
  //       });
  //     }

  //     toast.success('Connexion réussie avec Google !');
  //     navigate('/users');
  //   } catch (error) {
  //     console.error('Erreur Google Auth:', error);
  //     toast.error('Erreur lors de la connexion avec Google.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { prenom, email, password, confirmPassword } = formData;

    // Validation des champs
    if (!prenom || !email || !password || !confirmPassword) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Adresse email invalide.');
      return;
    }

    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${url}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prenom,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erreur d'inscription");

      toast.success('Inscription réussie !');
      setTimeout(() => {
        localStorage.setItem('token', data.token);
        resetFormData();
        navigate('/connexion');
      }, 100); 

      resetFormData(); 
    } catch (error) {
      toast.error('Erreur : ' + error.message);
      console.error("Erreur lors de l'inscription :", error);
    }finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen md:h-screen bg-gray-100">
      {/*----------- Bouton retour--------- */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 sm:top-6 sm:left-10 text-gray-800 text-2xl sm:text-3xl p-1 sm:p-2 hover:text-gray-700 transition-colors duration-200 z-50"
        aria-label="Retour"
      >
        <FaSignOutAlt className="rotate-180" />
      </button>
      <div className="min-h-screen md:h-screen flex bg-gray-100">
        <div className="bg-gray-100 rounded-lg w-full flex 1/3">
          <div className="sm:flex justify-center flex-col w-[50%] p-10 hidden">
            <img src="/imge/Sign up-cuate.png" alt="photo" />
          </div>

          {/* Partie droite */}
          <div className="md:w-[50%] text-xs px-8 flex flex-col items-center justify-center">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Créer un compte
              </h2>
            </div>
            {loading && (
            <div className="mb-4 flex flex-col items-center text-gray-600 text-sm">
           <ClipLoader color="#36d7b7" size={40} />
          <span className="mt-2">Connexion en cours...</span>
              </div>
           )}
            <form
              className="w-full flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <div className="mb-2 w-[70%]">
                <label
                  className="block text-gray-800 text-base font-bold mb-2"
                  htmlFor="name"
                >
                  Entrez votre nom complet
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="prenom"
                  type="text"
                  placeholder="Votre prénom"
                  name="prenom"
                  value={formData.prenom || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2 w-[70%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Entrez votre email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  value={formData.email || ''}
                  onChange={handleChange}
                />
              </div>

              {/* Champ mot de passe avec icône */}
              <div className="mb-2 w-[70%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Votre mot de passe"
                    name="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Champ confirmation mot de passe avec icône */}
              <div className="mb-2 w-[70%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirm-password"
                >
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirmer votre mot de passe"
                    name="confirmPassword"
                    value={formData.confirmPassword || ''}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        Les mots de passe ne correspondent pas.
                      </p>
                    )}
                </div>
              </div>

              <div className="flex w-[70%] items-center justify-between">
                <button
                  className="bg-gray-800 hover:bg-gray-600 hover:text-white text-center text-white font-bold py-3 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full cursor-pointer"
                  type="submit"
                >
                  S'inscrire
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-4 mb-4 w-[70%]">
              <div className="border-t border-gray-500 flex-grow"></div>
              <p className="mx-4 text-gray-800">OU</p>
              <div className="border-t border-gray-500 flex-grow"></div>
            </div>

            <div className="flex w-[80%] items-center justify-center">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 bg-gray-200 h-10 hover:bg-gray-800 hover:text-white text-black focus:shadow-outline font-bold py-3 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-[90%] cursor-pointer"
                type="button"
              >
                <img
                  src="/images/google.png"
                  alt="Google"
                  className="w-10 h-10"
                />
                <span className="">Google</span>
              </button>
            </div>

            <div className="text-center mt-3">
              Vous avez déjà un compte ?{' '}
              <Link
                to="/connexion"
                className="font-bold text-sm text-gray-800 hover:text-gray-400"
              >
                Se connecter
              </Link>
            </div>

            {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
