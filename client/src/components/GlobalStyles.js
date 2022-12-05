import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  font-family: 'Lobster', cursive, 'sans-serif';
  color:black;
}
    a {
    text-decoration: none;
  }

button{
  font-family: 'Lobster', cursive, 'sans-serif';
  letter-spacing:1px;
}
`;
export default GlobalStyles;
