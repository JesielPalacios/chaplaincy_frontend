import { useRef, useEffect } from 'react'
import { NavLink, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { useUser } from '../../../core/hooks/useUser'
import { routes } from '../../../core/routes/routes'
// import { Context } from '../../../../core/context/UserContext'
// import { useUser } from '../../../../core/hooks/useUser'

// import { routes } from '../../../../core/router/routes'
import { LogoImg, ToggleButton, ToggleIcon } from './SidebarElements'
// import img from '../../../assets/yellowLogo.svg'
import img from '../../../assets/unacBlueLogo.svg'
import './styles.css'

export const Sidebar = () => {
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
    <div className={sidebar ? 'navigation active' : 'navigation'}>
      <ToggleButton sidebar={sidebar} onClick={showSidebar}>
        <ToggleIcon
          sidebar={sidebar}
          className={sidebar ? 'bx bx-menu-alt-right' : 'bx bx-menu'}
        />
      </ToggleButton>
      <LogoImg
        src={img}
        sidebar={sidebar}
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
      </ul>
    </div>
  )
}
