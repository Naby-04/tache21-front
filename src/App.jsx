import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import { DashboardUsers } from "./pages/DashboardUsers/DashboardUsers";
import { Acceuil } from "./pages/DashboardUsers/Acceuil";
import Admin from "./pages/Admin";

function App() {
  return (
        // <Admin/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={< Connexion/>} />
      
        <Route path="/users" element={<DashboardUsers />}>
          <Route index element={<Acceuil />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
