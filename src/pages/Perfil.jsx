import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx'

function Perfil() {
  const { nombre } = useParams()
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const cerrarSesion = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>¡Hola, {nombre || user || 'Invitado'}!</h1>
      <p>Bienvenido a tu perfil.</p>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </div>
  )
}

export default Perfil
