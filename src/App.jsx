import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import Inscription from "./pages/Inscription";
import { DashboardUsers } from "./pages/DashboardUsers/DashboardUsers";
import { Acceuil } from "./Composants/DashboardUsers/Acceuil";
import { Rapport } from "./pages/DashboardUsers/Rapport";
import { RapportTelecharger } from "./pages/DashboardUsers/Telecharger";
import { PageParametresCompte } from "./pages/DashboardUsers/PageParametre";
import  Connexion  from "./pages/Connexion";
import { ContextProvider } from "./Contexts/DashboardUser/UseContext";
import PublicationForm from "./Composants/PublicationForm";

function App() {
  return (
    // <Admin />
    <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={< Connexion/>} />
        <Route path="/users" element={<DashboardUsers />}>
          <Route index element={< Acceuil/>} />
          <Route path="rapport" element={< Rapport/>} />
          <Route path="rapportTelecharger" element={< RapportTelecharger/>} />
        </Route>
        <Route path="/pageParametre" element={<PageParametresCompte />} />
        <Route path="/publicationRapport" element={<PublicationForm />} />
      </Routes>
    </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
