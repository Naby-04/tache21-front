import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import { PageParametresCompte } from "./pages/DashboardUsers/PageParametre";
import { RapportTelecharger } from "./pages/DashboardUsers/Telecharger";
import { Rapport } from "./pages/DashboardUsers/Rapport";
import { Acceuil } from "./Composants/DashboardUsers/Acceuil";
import { DashboardUsers } from "./pages/DashboardUsers/DashboardUsers";
import HomePage from "./pages/HomePage";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
// import Admin from "./pages/Admin";

const App = () => {
  return (
    // <Admin />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/users" element={<DashboardUsers />}>
          <Route index element={<Acceuil />} />
          <Route path="rapport" element={<Rapport />} />
          <Route path="rapportTelecharger" element={<RapportTelecharger />} />
        </Route>
        <Route path="/pageParametre" element={<PageParametresCompte />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
