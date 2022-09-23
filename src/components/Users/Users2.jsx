import styled from 'styled-components'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import './Users.styles.scss'

const Users = () => {
  return (
    <DashboradLayout>
      <DashboardSection title={'Usuarios'}>
        <Container>
          {/* <table>
            <tr>
              <th>Nombre</th>
              <th>Correo electrónico</th>
              <th>Número telefónico</th>
              <th>Género</th>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
              <td>Mexico</td>
            </tr>
          </table> */}

          <button className="addUser">Añadir usuario</button>

          <div className="header">
            <span>Nombre</span>
            <span>Correo electrónico</span>
            <span>Número telefónico</span>
            <span>Género</span>
          </div>

          <div className="card">
            <div className="name">
              <img src="https://via.placeholder.com/520x460" alt="" />
              <span>John Deo</span>
            </div>
            <div className="email">
              <span>johndoe2211@gmail.com</span>
            </div>
            <div className="phoneNumber">
              <span>+33757005467</span>
            </div>
            <div>
              <span className="genre maleText">Masculino</span>
            </div>
          </div>

          <div className="card">
            <div className="name">
              <img src="https://via.placeholder.com/520x460" alt="" />
              <span>Shelby Goode</span>
            </div>
            <div className="email">
              <span>shelbygoode481@gmail.com</span>
            </div>
            <div className="phoneNumber">
              <span>+33757005467</span>
            </div>
            <div>
              <span className="genre femaleText">Femenino</span>
            </div>
          </div>
        </Container>
      </DashboardSection>
    </DashboradLayout>
  )
}

export default Users

const Container = styled.div`
  position: absolute;
  top: 60px;

  width: 100%;

  display: flex;
  /* justify-content: space-around; */
  /* align-items: center; */
  gap: 10px;
  flex-direction: column;

  table {
    margin: 0 30px 0 30px;

    td {
      width: 859px;
      height: 60px;
      left: 248px;
      top: 128px;

      background: #ffffff;
      box-shadow: 1px 17px 44px rgba(3, 2, 41, 0.07);
      border-radius: 10px;

      text-align: center;
    }

    td {
      border: none;
      text-decoration: none;
    }
  }
`
