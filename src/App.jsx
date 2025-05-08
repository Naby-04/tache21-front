import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/Erreur/NotFound';
import Unauthorized from './pages/Erreur/Unauthorized';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<NotFound />} />
      </Routes>
    </Router>
  );


}

export default App;
