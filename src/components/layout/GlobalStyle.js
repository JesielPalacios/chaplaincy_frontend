import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* font-family: Poppins; */
  }

  a {
    text-decoration: none;
    color: black;
  }

  @font-face {
      font-family: Poppins;
      src: url(/fonts/Poppins/Poppins-Medium.ttf);
  }
    
  /* h1 {
      font-family: myFirstFont;
      color: darkgreen;
  } */
`
