import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PageParametresCompte } from "./pages/DashboardUsers/PageParametre";
import { RapportTelecharger } from "./pages/DashboardUsers/Telecharger";
import { Rapport } from "./pages/DashboardUsers/Rapport";
import { Acceuil } from "./Composants/DashboardUsers/Acceuil";
import { DashboardUsers } from "./pages/DashboardUsers/DashboardUsers";
import HomePage from "./pages/Pages-Accueil/HomePage";
import Connexion from "./pages/Pages-Accueil/Connexion";
import Inscription from "./pages/Pages-Accueil/Inscription";
import RapportsAccueil from "./pages/Pages-Accueil/RapportsAccueil";
import MotDePassOublie from "./pages/MotDePassOublie";
import PublicationForm from "./Composants/PublicationForm";
import { Toaster } from "react-hot-toast";


  //  import Admin from "./pages/Admin";

const App = () => {
  return (
    <>
    <ToastContainer/>
     {/* <Admin /> */}
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
           <Route path="/rapports" element={<RapportsAccueil />} />
           <Route path="/motDePassOublie" element={<MotDePassOublie />} />
           <Route path="/publicationRapport" element={<PublicationForm />} />
         </Routes>
         <Toaster position="top-center"/>
       </BrowserRouter>
   </>
  );
};

export default App;
