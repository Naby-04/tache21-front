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
import Admin from "./pages/Admin";
import PublicationForm from "./Composants/PublicationForm";
import ProtectedRoute from "./Routes/ProtectedRoute";


import { Toaster } from "react-hot-toast";


import ReinitialiserMdp from "./pages/ReinitialiserMdp";
import { CommentairesSection } from "./Composants/DashboardUsers/Commentaire/CommentaireSection";

  

const App = () => {
  return (
    <>
    <ToastContainer/>

       <BrowserRouter>
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/admin" element={<Admin/>} />
           <Route path="/inscription" element={<Inscription />} />
           <Route path="/connexion" element={<Connexion />} />

           <Route path="/users" element={
            <ProtectedRoute>
                <DashboardUsers />
            </ProtectedRoute>
            }>
             <Route index element={<Acceuil />} />
             <Route path="rapport" element={
              <ProtectedRoute>
                <Rapport />
              </ProtectedRoute>
              } />
             <Route path="rapportTelecharger" element={
              <ProtectedRoute>
                <RapportTelecharger />
              </ProtectedRoute>
              } />
           </Route>

           <Route path="/pageParametre" element={
            <ProtectedRoute>
                <PageParametresCompte />
            </ProtectedRoute>
            } />
           <Route path="/rapports" element={<RapportsAccueil />} />
           <Route path="/reinitialisermdp/:token" element={<ReinitialiserMdp/>} />
           <Route path="/motdepasseoublie" element={<MotDePassOublie />} />
           <Route path="/publicationRapport" element={
            <ProtectedRoute>
              <PublicationForm />
            </ProtectedRoute>
            } />
           <Route path="/commentaires" element={<CommentairesSection />} />
           {/* <Route path="/Auth" element={<AuthProvider />} /> */}
         </Routes>

        
         <Toaster position="top-center"/>

       </BrowserRouter>
   </>
  );
};


export default App;
