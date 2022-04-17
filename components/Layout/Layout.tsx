import React, { Fragment, useEffect } from "react";
import NavBar from "@components/Layout/NavBar";
import { useRouter } from "next/router";
import NavLink from "@components/Reusable/AccessibleLink/AccessibleNavLink";
import styled from "styled-components";
import NavItem from "./NavItem";
import type { AppTheme } from "@styles/GlobalStylesProvider";
import HexGrid from "@components/Layout/Backgrounds/HexGrid";
import { BackgroundContainer } from "../../pages/_app.page";

const items = [
  ["Home", ""],
  ["Timeline", "timeline"],
  ["Card Testing", "about"],
  ["Contact?", "contact"],
  ["Galerie-de-Dmitri", "gallery"]
];
const Main_Styled = styled.main`
  display: flex;
  justify-content: space-around;
  align-items: start;
  width: 100%;
  @media (max-width: 48rem) {
   margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
  }
`;
const Layout: React.FC<{toggleThemeCallback?: () => void}> = ({ children, toggleThemeCallback }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = React.useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Fragment>

      <NavBar collapsed={isMobile}>
        {items.map((x, i) => (
          <NavItem key={`${x[0]}-${i}`} active={router.pathname == `/${x[1]}`}>
            <NavLink href={`/${x[1]}`}>{x[0]}</NavLink>
          </NavItem>
        ))}

      </NavBar>
      {toggleThemeCallback && <ThemeToggleButton onClick={toggleThemeCallback}>T</ThemeToggleButton>}

      <Main_Styled>{children}</Main_Styled>
    </Fragment>
  );
};

const ThemeToggleButton = styled.button<{theme: AppTheme}>`
  
  //content: ${({theme})=> theme.themeName === "light" ? "🌞 light" : "🌚 dark"};
  color: ${({theme})=> theme.themeName === "light" ? "black" : "white"};
  background: ${({theme})=> theme.themeName === "light" ? "white" : "black"};
  color: ${({theme})=> theme.themeName === "light" ? "black" : "white"};
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  outline: none;
  //transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export default Layout;
