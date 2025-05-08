import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import Inscription from "./pages/Inscription";
import { DashboardUsers } from "./pages/DashboardUsers/DashboardUsers";
import MotDePassOblie from "./pages/MotDePassOublie";
import Admin from "./pages/Admin";
import { Acceuil } from "./Composants/DashboardUsers/Acceuil";
import Connexion from "./pages/connexion";

function App() {
  return (
        // <Admin/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={< Connexion/>} />
        <Route path="/mot-de-passe-oublie" element={<MotDePassOblie />} />
        <Route path="/users" element={<DashboardUsers />}>
          <Route index element={< Acceuil/>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
