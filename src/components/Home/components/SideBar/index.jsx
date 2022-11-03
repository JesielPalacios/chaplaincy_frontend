import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SidebarRoute, SideBtnWrap } from './SidebarElements'

export const Sidebar = ({isOpen,toggle}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to='about' onClick={toggle}>¿Quiénes somos?</SidebarLink>
          <SidebarLink to='statistics' onClick={toggle}>Estadísticas</SidebarLink>
          <SidebarLink to='objectives' onClick={toggle}>Objetivos</SidebarLink>
          <SidebarLink to='contac' onClick={toggle}>Contacto</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to='/login'>Iniciar sesión</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  )
}
