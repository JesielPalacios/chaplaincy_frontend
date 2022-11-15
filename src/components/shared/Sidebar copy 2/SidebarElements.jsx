import styled from 'styled-components'

export const Container = styled.div`
  .bottom {
    display: flex;
    align-items: center;
    margin: 10px;

    .colorOption {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 1px solid #7451f8;
      cursor: pointer;
      margin: 5px;

      &:nth-child(1) {
        background-color: whitesmoke;
      }
      &:nth-child(2) {
        background-color: #333;
      }
      &:nth-child(3) {
        background-color: darkblue;
      }
    }
  }
`
export const LogoImg = styled.img`
  margin-top: ${({ sidebar }) => (sidebar ? '5%' : '70%')};
  ${({ sidebar }) => (sidebar ? 'width: 150px;' : 'width: 50px;')}
  object-fit: cover;
  transition: all 0.25s ease;
  cursor: pointer;
  user-select: none;
`

export const ToggleButton = styled.button`
  border: unset;
  background: unset;
  position: absolute;
  ${({ sidebar }) => (sidebar ? 'right: 0;' : '')}
  cursor: pointer;
`

export const ToggleIcon = styled.i`
  ${({ darkMode }) => (darkMode ? 'color: #000;' : 'color: grey;')}
  margin-top: 6px;
  margin-right: 6px;
  padding: ${({ sidebar }) => (sidebar ? '10px' : '5px')};
  ${({ sidebar }) => (sidebar ? 'margin-top: 0;' : '')}
  ${({ sidebar }) => (sidebar ? 'margin-right: 0;' : '')}
  border: 10px;
  /* min-width: 50px; */
  font-size: 28px;
  text-align: center;
  /* line-height: 60px; */
  transition: all 0.25s ease;
  background: none;
  :hover {
    background: rgba(255, 255, 255, 0.7);
    box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px,
      rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset;
    box-shadow: rgb(0 0 0 / 20%) 0px 10px 20px,
      rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset;
    /* box-shadow: #2a5784 0.5px 0px 10px 20px, #2a5784 0px 0px 0px 0.5px inset; */
    /* box-shadow: #2a5784 0.5px 0px 10px 5px, #2a5784 0px 0px 0px 0.5px inset; */
    /* box-shadow: rgb(42 87 132) 0.5px 0px 10px 20px,
      rgb(42 87 132) 0px 0px 0px 0.5px inset; */
    color: #2a5784;
  }
`
