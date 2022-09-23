import styled from 'styled-components'
import { useUser } from '../../core/hooks/useUser'
import { Sidebar } from '../shared/Sidebar copy 2/Sidebar'

export const DashboradLayout = ({ children }) => {
  const { sidebar } = useUser()

  return (
    <DashboardContainer sidebar={sidebar}>
      <Sidebar />

      {/* <Wrapper sidebar={sidebar}>{children}</Wrapper> */}
      {children}
    </DashboardContainer>
  )
}

const DashboardContainer = styled.div`
  display: grid;
  /* grid-template-columns: ${({ sidebar }) =>
    sidebar ? '300px' : '70px'} auto !important; */

  /* grid-template-columns: ${({ sidebar }) =>
    sidebar ? '300px' : '70px'} fit-content !important; */

  grid-template-columns: ${({ sidebar }) => (sidebar ? '300px' : '70px')} ${({
      sidebar
    }) =>
      sidebar ? 'auto + calc(100% - 300px) ' : 'auto + calc(100% - 130px) '};

  /* ${({ sidebar }) =>
    sidebar
      ? 'grid-template-columns: 200px auto; '
      : 'grid-template-columns: 80px auto;'} */

  width: 100%;
  /* height: 100vh; */
  height: 100vh;
  /* background: #f7f7f8; */
  background: #e5e9ec;
  /* position: relative; */

  /* transition: width 0.3s; */
  /* overflow-x: hidden; */
`

const Wrapper = styled.section`
  margin-left: ${({ sidebar }) => (sidebar ? '240px' : '80px')};
  transition: all 500ms ease 0s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*
  div {
    width: 100%;
    flex: 1;
    background: #fff;
  } */
  /* border: 1px solid #000; */
  position: relative;
  overflow: hidden;
`

export const DashboardSection = ({ children, title }) => {
  const { sidebar } = useUser()

  return (
    <MainContainer id="main" sidebar={sidebar}>
      <Header>
        <SectionTittle>{title}</SectionTittle>
        {/* <button>Hola</button> */}
      </Header>{' '}
      {children}
    </MainContainer>
  )
}

export const MainContainer = styled.section`
  margin-left: ${({ sidebar }) => (sidebar ? '240px' : '80px')};
  transition: all 500ms ease 0s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*
  div {
    width: 100%;
    flex: 1;
    background: #fff;
  } */
  /* border: 1px solid #000; */
  position: relative;
  overflow: hidden;
`

export const Header = styled.div`
  width: 100%;
  width: auto;
  height: 50px;
  border: 5px;
  /* border: 1px solid #00800088; */
  position: absolute;
  top: 40px;
  top: 30px;
  top: 20px;
  left: 248px;
  left: 30px;
`

export const SectionTittle = styled.h1`
  /* width: 318px; */
  /* height: 33px; */

  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
`
