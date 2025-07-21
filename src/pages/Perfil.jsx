import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx'

function Perfil() {
  const { nombre } = useParams() // <- acá lo usás
  const { usuario, setUsuario } = useContext(UserContext)
  const navigate = useNavigate()

  const cerrarSesion = () => {
    setUsuario('')
    localStorage.removeItem('usuario')
    navigate('/')
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>¡Hola, {nombre || usuario}!</h1>
      <p>Bienvenido a tu perfil.</p>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </div>
  )
}
export default Perfil
