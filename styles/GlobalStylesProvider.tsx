import { createGlobalStyle, css, ThemeProps } from "styled-components";
export interface AppTheme {
  themeName: string;
  body?: string;
  text?: string;
  toggleBorder?: string;
  background?: string;
  menuBackground: string;
  menuBorder: string;
  menuShadow: string;
  accentColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  quaternaryColor?: string;

}
export type AppThemeProps =  ThemeProps<AppTheme>;

export const lightTheme: AppTheme = {
  themeName: "light",
  body: "#FFF",
  text: "#363537",
  toggleBorder: "#FFF",
  background: "#FFF",
  accentColor: "var(--accent-light)",
  menuBackground: "rgba(255, 255, 255, 0.9)",
  menuBorder: "black",
  menuShadow: "rgba(0, 0, 0, 0.2)"

};
export const darkTheme: AppTheme = {
  themeName: "dark",
  body: "#363537",
  text: "#FAFAFA",
  toggleBorder: "#6B8096",
  background: "#53636e",
  menuBackground: "rgb(23,23,23)",
  menuBorder: "white",
  accentColor: "var(--accent-dark)",
  menuShadow: "rgba(255, 255, 255, 0.2)"

};
const global_vars = css`
  :root {
    /* color palette */
    --white: #ffffff;
    --dark-workspace-color: #53636e;
    --gray-10: #fdfdfe;
    --gray-20: #f2f2f2;
    --gray-30: #e0e0e0;
    --gray-40: #cccccc;
    --gray-60: #666666;
    --gray-70: #4d4d4d;
    --gray-80: #4d4d4d;
    --gray-90: #333333;
    --accent-dark: #02101a;
    --accent-medium: #283640;
    --accent-light: #d4dde0;
    --accent-success: #a5db75;
    --accent-success-light: #d1ffa4;
    --accent-error: #d93251;
    --accent-error-active: #c92e40;
    --accent-danger: #fe6d6b;
    --accent-danger-light: #f7846c;
    --accent-warning: #ffdd75;
    --accent-warning-light: #ffa1a1;
    --accent-caution: #ffe69f;
    --accent-info: #6cdaf2;
    --accent-info-light: #83e4fa;
    --accent-primary: #3c7aae;
    --accent-primary-active: #316091;
    --accent-secondary: var(--gray-20);
    --accent-secondary-active: var(--gray-30);
    --focus-light: #c11bde;
    --focus-dark: #eb94ff;

    /* text colours */
    --text-color-base: var(--gray-60);
    --text-color-light: var(--white);
    --text-color-light-disabled: rgba(255, 255, 255, 0.5);
    --header-text-color: var(--gray-80);
    --header-text-color-dark: var(--gray-90);

    /* accents */
    --error: var(--accent-error);
    --disabled: var(--gray-40);
    --focus: var(--focus-light);
    --warning: var(--accent-caution);
    --error-alt: var(--accent-warning-light);
    --info: var(--accent-info-light);
    --success: var(--accent-success-light);
    --focus-active: rgba(215, 30, 247, 0.25);
    --focus-glow: rgba(193, 27, 222, 0.75);
    --metric-accent-low: var(--accent-danger-light);
    --metric-accent-mid: #8ba6c5;
    --metric-accent-full: var(--accent-success);

    /* spacing (padding/margin) */
    --space-smallest: 8px;
    --space-small: 16px;
    --space-medium: 18px;
    --space-large: 24px;
    --space-largest: 29px;
    --space-half: 4px;
    --space-three-quarters: 6px;
    --space-quarter: 2px;
    --space-large-with-underborder: 18px 24px;
    --space-gutter: 40px;

    /* text size */
    --text-size-largest: 112px;
    --text-size-larger: 56px;
    --text-size-large: 45px;
    --text-size-large-medium: 34px;
    --text-size-medium: 24px;
    --text-small-medium: 20px;
    --text-size-normal: 18px;
    --text-size-small: 15px;
    --text-size-smaller: 13px;
    --text-size-smallest: 12px;

    /* font weight */
    --font-weight-thin: 100;
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;
    --font-weight-ultra-bold: 900;

    /* dimensions */
    --border-width: 6px;
    --layout-padding: 9px;
    --content-max-width: 1000px;
  }

  //@media (prefers-color-scheme: light) {
  //  :root {
  //    --theme: light;
  //    --text-color-base: black;
  //    --workspace-color: white;
  //  }
  //}
  //
  //@media (prefers-color-scheme: dark), (prefers-color-scheme: no-preference) {
  //  :root {
  //    --focus: var(--focus-dark);
  //    --text-color-base: var(--white);
  //    --workspace-color: var(--dark-workspace-color);
  //  }
  //}
`;

const base_css = css`
  :root {
    --breakpoint-small: 30rem;
    --breakpoint-medium: 48rem;
    --breakpoint-large: 64rem;
    --breakpoint-xlarge: 75rem;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    //font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
      //Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-family: "EB Garamond", serif;
    font-size: 16pt;
    color: var(--text-color-base);
    background-color: var(--workspace-color);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    display: block;
    width: 100%;
    text-align: center;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  button,
  a {
    cursor: pointer;
  }

  /*Screen Reader Only Class*/

  .sr-only,
  .Offscreen {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    margin-top: -1px;
  }

  *:focus {
    outline: 2px solid var(--focus);
    outline-offset: var(--space-quarter);
  }
`;
const themedVars = (theme: AppTheme) => css`
  :root {
    --text-color-base: ${theme.text};
    --workspace-color: ${theme.background};
    --accent-theme: ${theme.accentColor};
    --menu-background-color: ${theme.menuBackground};
    --menu-border: ${theme.menuBorder};
    --menu-shadow: ${theme.menuShadow};
  }
`;
const GlobalStylesProvider = createGlobalStyle<ThemeProps<AppTheme>>`
  ${global_vars}
  @media (prefers-color-scheme: dark),(prefers-color-scheme: no-preference) {
    ${themedVars(darkTheme)}
  }
  @media (prefers-color-scheme: light) {
    ${themedVars(lightTheme)}
  }
  // If the user has selected a color theme via the theme picker, use that instead of the
  // preference supplied by "prefers-color-scheme".
  ${({theme}) => {
    if (theme) {
      return themedVars(theme);
    }
    return undefined;
  }}
  ${base_css}
//  :root {
//      
//      //--white: #fff;
//      --body-color: ${(props) => props.theme.body};
//      --text-color: ${(props) => props.theme.text};
//      --toggle-border-color: ${(props) => props.theme.toggleBorder};
//      --background-color: ${(props) => props.theme.background};
//    }
  body, html {
    background: ${(t) => t.theme.background};
    color: ${({ theme }) => theme.text} ;

  }
    //* {
    //  transition: all 0.50s linear;
    //
    //}

`;
export default GlobalStylesProvider;
