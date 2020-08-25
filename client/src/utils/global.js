import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }

    button {
        cursor: pointer;
        background-color: var(--color-secondary);
        color: var(--color-text);
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font-size: 62.5%;
        box-sizing: border-box;
        --color-primary: ${props => props.theme.colors.primary};
        --color-secondary: ${props => props.theme.colors.secondary};
        --color-text: ${props => props.theme.colors.text};
        --color-background: ${props => props.theme.colors.background};
        --color-warning: ${props => props.theme.colors.warning};
        --color-lighter: ${props => props.theme.colors.lighter};
        --shadow-color: rgba(0, 0, 0, 0.2);
        --shadow-color-dark: rgba(0, 0, 0, 0.25);
        @media ${props => props.theme.mediaQueries.largest} {
            font-size: 57.5%;
        }

        @media ${props => props.theme.mediaQueries.large} {
            font-size: 55%;
        }
    }

    body {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        line-height: 1.6;
        background-color: var(--color-background);
        color: var(--color-text);
    }

    form,
    input,
    textarea,
    button,
    select,
    a {
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
`