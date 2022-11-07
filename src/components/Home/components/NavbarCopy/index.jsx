import React from 'react'
import styled from 'styled-components'
import { Link as LinkRouter } from 'react-router-dom'
import { Link as LinkScroll } from 'react-scroll'
import { FaBeer, FaBars } from 'react-icons/fa'

export const Nabvar = ({ toggle }) => {
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">Capellanía FI - UNAC</NavLogo>
        <MobileIcon>
          <FaBars />
        </MobileIcon>
        <NavMenu>
          <NavItem>
            <NavLinks to="/">Home</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="discover">Discover</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="services">Services</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="about">About</NavLinks>
          </NavItem>
          <NavItem>
            <LinkRouter to="/entrevistas">Sig Up</LinkRouter>
          </NavItem>
        </NavMenu>
      </NavbarContainer>
    </Nav>
  )
}

const Nav = styled.nav`
  /* background: #000; */

  background: rgba(15, 14, 71, 0.25);
  box-shadow: rgb(31 38 135 / 37%) 0px 8px 32px 0px;
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  /* border-radius: 20px; */

  height: 80px;
  /* margin-top: -80px; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-widht: 960px) {
    transition: 0.8s all ease;
  }
`

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;

  @media screen and (max-widht: 960px) {
    transition: 0.8s all ease;
  }
`

const NavLogo = styled(LinkRouter)`
  color: #fff;
  justify-content: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
`

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-widht: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-widht: 768px) {
    display: none;
  }
`

const NavItem = styled.ul`
  height: 80px;
`

const NavLinks = styled(LinkScroll)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  /* &.active { */
  &[aria-current] {
    border-bottom: 3px solid #01bf71;
  }
`