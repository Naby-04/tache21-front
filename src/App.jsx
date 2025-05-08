import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/connexion";
import MotDePassOblie from "./pages/MotDePassOublie";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="*" element={<Inscription />} />
        <Route path="/mot-de-pass-oublie" element={<MotDePassOblie />} />
      </Routes>
    </Router>
  );
}

export default App;
