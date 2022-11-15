import { useRef, useEffect, useContext } from 'react'
import { NavLink, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { useUser } from '../../../core/hooks/useUser'
import { routes } from '../../../core/routes/routes'
// import { Context } from '../../../../core/context/UserContext'
// import { useUser } from '../../../../core/hooks/useUser'

// import { routes } from '../../../../core/router/routes'
import { Container, LogoImg, ToggleButton, ToggleIcon } from './SidebarElements'
// import img from '../../../assets/yellowLogo.svg'
// import img from '../../../assets/unacBlueLogo.svg'
import './styles.css'
import { DarkModeContext } from '../../../core/context/darkModeContext'

export const Sidebar = ({ darkMode }) => {
  // let { url } = useRouteMatch()

  let itemList = useRef()
  let list = useRef()

  const { sidebar, showSidebar, logOut } = useUser()

  const resetItems = () => {
    for (let index = 0; index < list.current.children.length; index++) {
      list.current.children[index].className = 'list'
    }
  }
  const currentItem = (index) => {
    resetItems()

    list.current.children[index].children[2].offsetParent.className =
      'list active'
  }

  const { dispatch } = useContext(DarkModeContext)

  useEffect(() => {
    let currentlink

    for (let i = 0; i < list.current.children.length; i++) {
      for (let j = 0; j < list.current.children[i].children.length; j++) {
        currentlink = list.current.children[i].children[2]
      }
      if (currentlink.className === 'active')
        currentlink.offsetParent.className = 'list active'
    }
  }, [])

  return (
    <Container
      className={
        sidebar
          ? `navigation active ${darkMode && 'dark app'} ${
              !darkMode && 'light app'
            }`
          : `navigation ${darkMode && 'dark app'} ${!darkMode && 'light app'}`
      }
    >
      <ToggleButton sidebar={sidebar} onClick={showSidebar}>
        <ToggleIcon
          sidebar={sidebar}
          className={sidebar ? 'bx bx-menu-alt-right' : 'bx bx-menu'}
        />
      </ToggleButton>
      <LogoImg
        // src={img}
        src="img/logo-unac.png"
        sidebar={sidebar}
        darkMode={darkMode}
        onClick={() => {
          showSidebar()
        }}
      />
      <ul ref={list}>
        {routes.map(({ label, icon, path }, index) => (
          <li
            key={index}
            ref={itemList}
            className="list"
            onClick={() => currentItem(index)}
          >
            <b></b>
            <b></b>
            {/* <NavLink to={path}> */}
            <NavLink to={path}>
              <span className="icon">
                <ion-icon name={icon}></ion-icon>
              </span>
              <span className="tittle">{label}</span>
            </NavLink>
          </li>
        ))}
        <li onClick={() => logOut()} className="button">
          <b></b>
          <b></b>
          {/* <NavLink to={path}> */}
          <a className="logout">
            <span className="icon">
              <ion-icon name="log-out-outline"></ion-icon>
            </span>
            <span className="tittle">Cerrar sessión</span>
          </a>
        </li>
        <li className="button">
          <b></b>
          <b></b>
          {/* <NavLink to={path}> */}
          {/* <a className="logout"> */}
          <span className="icon">
            {/* <ion-icon name="log-out-outline"></ion-icon> */}
          </span>
          <span className="icon">
            {/* <ion-icon name="log-out-outline"></ion-icon> */}
          </span>
          {/* <span className="tittle">Cerrar sessión</span> */}
          {/* </a> */}

          <div className="bottom">
            <div
              className="colorOption"
              onClick={() => dispatch({ type: 'LIGHT' })}
            ></div>
            <div
              className="colorOption"
              onClick={() => dispatch({ type: 'DARK' })}
            ></div>
          </div>
        </li>
      </ul>
    </Container>
  )
}
