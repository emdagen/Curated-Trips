import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  font-family: 'Roboto Mono', monospace;
  color:black;
}
    a {
    text-decoration: none;
  }
h1, h2, h3, h4 {
  font-family: 'Space Mono', monospace;

  /* color:black; */
} 
button{
  font-family: 'Roboto Mono', monospace;
  letter-spacing:1px;
}
`;
export default GlobalStyles;
