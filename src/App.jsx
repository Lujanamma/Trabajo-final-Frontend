import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat.jsx';
import Perfil from './pages/Perfil.jsx';
import Login from './pages/Login.jsx';
import RutaPrivada from './components/RutaPrivada.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
  path="/chat/:id"
  element={
    <RutaPrivada>
      <Chat />
    </RutaPrivada>
  }
/>
  
        <Route
          path="/perfil/:nombre"
          element={
            <RutaPrivada>
              <Perfil />
            </RutaPrivada>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
