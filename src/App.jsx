import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import { DashboardUsers } from "./pages/DashboardUsers/DashboardUsers";
import Connexion from "./pages/connexion";
import MotDePassOblie from "./pages/MotDePassOublie";
import Admin from "./pages/Admin";
import { Acceuil } from "./Composants/DashboardUsers/Acceuil";

function App() {
  return (
        // <Admin/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={< Connexion/>} />
      
        <Route path="/users" element={<DashboardUsers />}>
          <Route index element={< Acceuil/>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
