import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import PublicRoute from "./Routes/PublicRoute";

import { Toaster } from "react-hot-toast";

import ReinitialiserMdp from "./pages/ReinitialiserMdp";
import { CommentairesSection } from "./Composants/DashboardUsers/Commentaire/CommentaireSection";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggablepauseOnHover={false}
        theme="light"
      />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inscription"
            element={
              <PublicRoute>
                <Inscription />
              </PublicRoute>
            }
          />
          <Route
            path="/connexion"
            element={
              //<PublicRoute>
              <Connexion />
              //Repo</PublicRoute>
            }
          />

          <Route
            path="/users"
            element={
              //<ProtectedRoute>
              <DashboardUsers />
              //</ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute>
                  <Acceuil />
                </ProtectedRoute>
              }
            />
            <Route
              path="rapport"
              element={
                <ProtectedRoute>
                  <Rapport />
                </ProtectedRoute>
              }
            />
            <Route
              path="rapportTelecharger"
              element={
                <ProtectedRoute>
                  <RapportTelecharger />
                </ProtectedRoute>
              }
            />
            <Route
              path="publicationRapport"
              element={
                <ProtectedRoute>
                  <PublicationForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="pageParametre"
              element={
                <ProtectedRoute>
                  <PageParametresCompte />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="/rapports"
            element={
              <PublicRoute>
                <RapportsAccueil />
              </PublicRoute>
            }
          />
          <Route
            path="/reinitialisermdp/:token"
            element={
              <PublicRoute>
                <ReinitialiserMdp />
              </PublicRoute>
            }
          />
          <Route
            path="/motdepasseoublie"
            element={
              <PublicRoute>
                <MotDePassOublie />
              </PublicRoute>
            }
          />
          <Route path="/commentaires" element={<CommentairesSection />} />
          {/* <Route path="/Auth" element={<AuthProvider />} /> */}
        </Routes>

        <Toaster position="top-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
<Routes>
  <Route
    path="/"
    element={
      //<PublicRoute>
      <HomePage />
      // </PublicRoute>
    }
  />
  <Route
    path="/admin"
    element={
      //<ProtectedRoute>
      <Admin />
      // </ProtectedRoute>
    }
  />
  {/* ---------------Page authentification--------------- */}
  <Route
    path="/inscription"
    element={
      //<PublicRoute>
      <Inscription />
      //</PublicRoute>
    }
  />
  <Route
    path="/connexion"
    element={
      //<PublicRoute>
      <Connexion />
      //</PublicRoute>
    }
  />
  <Route
    path="/reinitialisermdp/:token"
    element={
      //<PublicRoute>
      <ReinitialiserMdp />
      //</PublicRoute>
    }
  />
  <Route
    path="/motdepasseoublie"
    element={
      //<PublicRoute>
      <MotDePassOublie />
      //</PublicRoute>
    }
  />
  {/* ---------------Page authentification exit--------------- */}

  <Route
    path="/users"
    element={
      //<ProtectedRoute>
      <DashboardUsers />
      //</ProtectedRoute>
    }
  >
    <Route index element={<Acceuil />} />
    <Route
      path="rapport"
      element={
        // <ProtectedRoute>
        <Rapport />
        // </ProtectedRoute>
      }
    />
    <Route
      path="rapportTelecharger"
      element={
        // <ProtectedRoute>
        <RapportTelecharger />
        // </ProtectedRoute>
      }
    />
  </Route>
  <Route
    path="/pageParametre"
    element={
      // <ProtectedRoute>
      <PageParametresCompte />
      // </ProtectedRoute>
    }
  />
  <Route
    path="/publicationRapport"
    element={
      //<ProtectedRoute>
      <PublicationForm />
      //</ProtectedRoute>
    }
  />
  <Route
    path="/rapports"
    element={
      //<PublicRoute>
      <RapportsAccueil />
      //</PublicRoute>
    }
  />
  <Route path="/commentaires" element={<CommentairesSection />} />
  {/* <Route path="/Auth" element={<AuthProvider />} /> */}
</Routes>;
