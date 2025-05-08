import React from "react";
import PublicationForm from "./Composants/PublicationForm";
import CommentSection from "./Composants/CommentSection";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <CommentSection />
      <Toaster position="top-center" />

      {/* <BrowserRouter>
       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/inscription" element={<Inscription />} />
         <Route path="/connexion" element={<Connexion />} /
         <Route path="/users" element={<DashboardUsers />}>
           <Route index element={<Acceuil />} />
         </Route>
       </Routes>
    </BrowserRouter> */}
    </>
  );
};

export default App;
