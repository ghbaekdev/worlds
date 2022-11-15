import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle` 
 ${normalize} 
  body {    
    box-sizing: border-box;  
    font-family: 'Noto Sans'; 
    font-size: 20px;   
    min-width: 320px;  
}  
 a { 
  cursor: pointer; 
  text-decoration: none; }
 `;

export default GlobalStyle;
