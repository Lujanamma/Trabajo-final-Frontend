import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const RutaPrivada = ({ children }) => {
  const { user } = useContext(UserContext);

  return user ? children : <Navigate to="/" />;
};

export default RutaPrivada;
