import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../Login.css';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const nuevoUsuario = { name: nombre.trim() };
    setUser(nuevoUsuario);
    navigate('/chat'); 
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-titulo">Iniciar sesión</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          minLength={2}
          maxLength={20}
        />
        <button 
          className="login-button" 
          type="submit"
          disabled={!nombre.trim()}
        >
          Entrar al chat
        </button>
      </form>
    </div>
  );
};

export default Login;