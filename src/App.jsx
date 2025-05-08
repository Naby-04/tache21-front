import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import Inscription from "./pages/Inscription";
import { DashboardUsers } from "./pages/DashboardUsers/DashboardUsers";
import MotDePassOblie from "./pages/MotDePassOublie";
import Admin from "./pages/Admin";
import { Acceuil } from "./Composants/DashboardUsers/Acceuil";
import Connexion from "./pages/Connexion";

{
  /* Import des pages d'erreur */
}
import NotFound from "./pages/Erreur/NotFound";
import Unauthorized from "./pages/Erreur/Unauthorized";

function App() {
  return (
    // <Admin/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />

        <Route path="/users" element={<DashboardUsers />}>
          <Route index element={<Acceuil />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
