import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import { DashboardUsers } from "./pages/DashboardUsers/DashboardUsers";

import Admin from "./pages/Admin";
import { Acceuil } from "./Composants/DashboardUsers/Acceuil";

{/* Import des pages d'erreur */}
import NotFound from "./pages/Erreur/NotFound";
import Unauthorized from "./pages/Erreur/Unauthorized";

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
        

        <Route path="*" element={<NotFound/>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
