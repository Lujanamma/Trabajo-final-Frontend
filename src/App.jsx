import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import RutaPrivada from './components/RutaPrivada';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<RutaPrivada><Chat /></RutaPrivada>} />
        <Route path="/chat/:id" element={<RutaPrivada><Chat /></RutaPrivada>} />
        <Route path="/perfil/:nombre" element={<RutaPrivada><Perfil /></RutaPrivada>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;