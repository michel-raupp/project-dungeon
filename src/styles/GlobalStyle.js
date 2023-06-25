import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


    /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    *{
        ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        }
        ::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
        }
        ::-webkit-scrollbar-thumb {
        background: #a54371;
        border: 0px none #ffffff;
        border-radius: 50px;
        }
        ::-webkit-scrollbar-thumb:hover {
        background: #ffffff;
        }
        ::-webkit-scrollbar-thumb:active {
        background: #a54371;
        }
        ::-webkit-scrollbar-track {
        background: #e2f3e4;
        border: 0px none #ffffff;
        border-radius: 50px;
        }
        ::-webkit-scrollbar-track:hover {
        background: #555568;
        }
        ::-webkit-scrollbar-track:active {
        background: #e2f3e4;
        }
        ::-webkit-scrollbar-corner {
        background: transparent;
        }
    }

    body {
        margin: 0;
        font-family: 'Press Start 2P', cursive;
        line-height: 1;

        

  
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    h1{
        
        font-size: 16px;
        font-weight: 800;
    }

    h2{  
        font-size: 14px;
        font-weight: 800;
    }

    h3{
        font-size: 12px;
        font-weight: 600;
    }

    p{
        font-size: 8px;
    }
`
export default GlobalStyle;