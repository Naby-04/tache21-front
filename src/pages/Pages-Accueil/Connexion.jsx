
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContext from "../../Contexts/FormContext";
import { usePublication } from "../../Contexts/DashboardUser/UseContext";
 import { signInWithPopup } from "firebase/auth";
 import { auth, provider} from "../../services/firebaseService";


const Connexion = () => {
  // const [error, setError] = useState("");
  const { formData, updateFormData, resetFormData } = useContext(FormContext);
  const navigate = useNavigate();

   const {url} = usePublication()
console.log("url",url);

    // if (!users) return null;
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const res = await fetch(`${url}/api/users/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        prenom: user.displayName, // optionnel pour l'affichage
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Échec de la connexion Google.");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("userInfo", JSON.stringify(data.user));

    toast.success("Connexion Google réussie !");
    navigate("/users");
  } catch (error) {
    console.error("Erreur lors de la connexion Google :", error);
    toast.error("Erreur lors de la connexion Google.");
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Validation des champs
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Adresse email invalide.");
      return;
    }

    if (password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      const response = await fetch(`${url}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erreur de connexion");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      // await fetchProfil();
      toast.success("Connexion réussie !");
      resetFormData();
      navigate("/users");
    } catch (error) {
      toast.error("Erreur de connexion : " + error.message);
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <div className="min-h-screen md:h-screen flex bg-gray-100">
      <div className="rounded-lg w-full flex 1/3">
        {/* Image gauche */}
        <div className="sm:flex justify-center flex-col w-[50%] p-10 hidden">
          <img src="/imge/Sign up-cuate.png" alt="illustration" />
        </div>

        {/* Formulaire de connexion */}
        <div className="md:w-[50%] text-xs px-8 w-full flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Se connecter</h2>

          <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="mb-2 w-[70%]">
              <label htmlFor="email" className="block text-gray-800 text-sm font-bold mb-2">
                Entrez votre email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Votre email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-2 w-[70%]">
              <label htmlFor="password" className="block text-gray-800 text-sm font-bold mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                placeholder="Votre mot de passe"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <Link
              to="/motdepasseoublie"
              className="inline-block text-end font-bold text-sm text-gray-800 hover:text-blue-800 mb-6 w-[70%]"
            >
              Mot de passe oublié ?
            </Link>

            <div className="w-[70%]">
              <button
                className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 h-10 rounded-2xl focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Se connecter
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4 mb-4 w-[70%]">
            <div className="border-t border-gray-500 flex-grow"></div>
            <p className="mx-4 text-gray-800">OU</p>
            <div className="border-t border-gray-500 flex-grow"></div>
          </div>
          <div className="w-[70%]">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex items-center justify-center bg-gray-200 hover:bg-blue-600 text-gray-800 font-bold py-2 px-4 rounded-2xl h-10  focus:outline-none focus:shadow-outline w-full"
            >
              <img src="/images/google.png" alt="Google" className="w-10 h-10" />
              <span>Google</span>
            </button>
          </div>

       
        s

          {/* Lien d'inscription */}
          <div className="text-center mt-3">
            Vous n'avez pas de compte ?{" "}
            <Link to="/inscription" className="font-bold text-sm text-gray-800 hover:text-gray-400">
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
