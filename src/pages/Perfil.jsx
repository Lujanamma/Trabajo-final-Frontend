import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Perfil() {
  const { nombre } = useParams();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div style={{
      backgroundColor: '#111b21',
      minHeight: '100dvh',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#e9edef'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
        ¡Hola, {nombre || user?.name || 'Invitado'}!
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#8696a0', marginBottom: '2rem' }}>
        Bienvenido a tu perfil
      </p>
      <button 
        onClick={cerrarSesion}
        style={{
          backgroundColor: '#d32f2f',
          color: 'white',
          border: 'none',
          padding: '0.8rem 1.8rem',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontWeight: '500'
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Perfil;