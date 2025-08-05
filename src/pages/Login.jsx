// src/pages/Login.jsx
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoUsuario = { name: nombre };
    setUser(nuevoUsuario);

    // ✅ Obtener y actualizar chats en localStorage
    const chatsGuardados = JSON.parse(localStorage.getItem('chats')) || [];

    const nuevoChat = {
      id: chatsGuardados.length + 1,
      name: nombre,
    };

    const nuevosChats = [...chatsGuardados, nuevoChat];
    localStorage.setItem('chats', JSON.stringify(nuevosChats));

    // ✅ Redirigir al nuevo chat
    navigate(`/chat/${nuevoChat.id}`);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <br /><br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;