import { Link } from 'react-router-dom'
import { useUser } from '../../core/hooks/useUser'

function Home() {
  const { logOut } = useUser()

  return (
    <div>
      <p>Home</p>
      <ul>
        <li>
          <Link to="login">Login</Link>
        </li>
        <li>
          <Link to="dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="usuarios">Usuarios</Link>
        </li>
      </ul>
      <button
        onClick={() => {
          logOut()
        }}
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default Home
