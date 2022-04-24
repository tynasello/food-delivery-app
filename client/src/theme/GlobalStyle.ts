import { createGlobalStyle } from 'styled-components'
import { createTheme } from '@mui/material'

const GlobalStyle = createGlobalStyle`
    /*--------------------------------------------------------------*/
    /* Reset styles for all structural tags */
    
    a,  body, button, canvas,  div, form,
    h1, h2, h3, h4, h5, h6, head, header,  
    hr, html, i, iframe, img, input,  
    label, legend, li, nav,p, param,section,
    span, textarea, tfoot,  ul {
        border: 0;
        font-size: 100%;
        font: inherit;
        margin: 0;
        outline: none;
        padding: 0;
        text-align: left;
        text-decoration: none;
        vertical-align: baseline;
        z-index: 1;
    }
    /*--------------------------------------------------------------*/
    /* Miscellaneous resets */
    body {
        line-height: 1.25;
    }
    ul {
        list-style: none;
    }
    a{
        color: white;
    }
    
    button,
    input,
    optgroup,
    select,
    textarea {
        font-family: inherit; 
        font-size: 100%; 
        line-height: 1.15; 
        margin: 0; 
    }
    /*--------------------------------------------------------------*/
    /* Global Styling */

    html{
        scroll-behavior: smooth;
    }
    body{
      background-color: #E5E7E9;
    }
    
`

export default GlobalStyle

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#514bb2',
    },
    success: {
      main: '#229954',
    },
  },
  typography: {
    allVariants: { fontFamily: "'Karla', sans-serif" },
  },
})
