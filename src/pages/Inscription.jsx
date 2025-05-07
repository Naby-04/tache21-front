// Inscription.js
import React from "react";
import InputField from "./InputFiled";
import "../index.css";

const Inscription = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#a65f00] px-4">
      <div className="w-full max-w-md bg-[#fef3c6] p-6 sm:p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center font-[var( --font-title)] text-[#a65f00] mb-6">
          Créer un compte
        </h2>

        <form className="space-y-4">
          <InputField
            type="text"
            name="prenom"
            placeholder="Prénom"
          />
          <InputField
            type="text"
            name="nom"
            placeholder="Nom"
          />
          <InputField
            type="email"
            name="email"
            placeholder="E‑mail"
          />
          <InputField
            type="password"
            name="password"
            placeholder="Mot de passe"
          />

          <button
            type="submit"
            className="w-full bg-[#a65f00] text-white py-3 md:py-4 rounded-lg hover:bg-[#a65f00] transition font-"
          >
            S'inscrire
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-2 text-sm md:text-base">Ou</p>
          <button className="w-full bg-white text-[#a65f00] py-3 md:py-4 border rounded-lg hover:bg-[#fef3c6] transition font-Inter">
            Continuer avec Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
