import React, { Fragment, useEffect } from "react";
import NavBar from "@components/Layout/NavBar";
import { useRouter } from "next/router";
import NavLink from "@components/Reusable/AccessibleLink/AccessibleNavLink";
import styled from "styled-components";
import NavItem from "./NavItem";
import type { AppTheme } from "@styles/GlobalStylesProvider";
import { breakpoints } from "@styles/MediaBreakpoints";

const items = [
  ["Home", ""],
  ["Timeline", "timeline"],
  ["Card Testing", "about"],
  ["Contact?", "contact"],
  ["Galerie-de-Dmitri", "gallery"]
];
const Main_Styled = styled.main<{fixedHeight?: string|number}>`
  height: ${({ fixedHeight }) => fixedHeight ?? "auto"};
  display: flex;
  justify-content: space-around;
  align-items: start;
  width: var(--mod-width);
  overflow-x: clip;
  @media (max-width: ${breakpoints.md}) {
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
  }
`;
const Layout: React.FC<{ toggleThemeCallback?: () => void, fixedPageSize?: string|number }> = ({
  children,
  toggleThemeCallback,
    fixedPageSize
}) => {
  const { pathname } = useRouter();

  const [isMobile, setIsMobile] = React.useState(false);
  console.log("page size",fixedPageSize)
  useEffect(() => {
    const handleResize = () => {
      // calculate width of 1 rem in pixels
      if (window && document) {

        const remConversion = parseFloat(
          window.getComputedStyle(document.documentElement).fontSize
        );
        // breakpoint is the number of navigation items that fit in the viewport (~ 9 rem each)
        const isMobileSize = window.innerWidth < remConversion * 9 * items.length;

        if (isMobile && !isMobileSize) {
          setIsMobile(false);
        } else if (!isMobile && isMobileSize) {
          setIsMobile(true);
        }
      }
    };
    handleResize();

    window?.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);
  return (
    <Fragment>
      <NavBar collapsed={isMobile} navTriggerLabel={"menu"}>
        {items &&
          items.map((x, i) => (
            <NavItem key={`${x[0]}-${i}`} active={pathname == `/${x[1]}`}>
              <NavLink href={`/${x[1]}`}>{x[0]}</NavLink>
            </NavItem>
          ))}
      </NavBar>
      {/*{toggleThemeCallback && (*/}
      {/*  <ThemeToggleButton onClick={toggleThemeCallback}>T</ThemeToggleButton>*/}
      {/*)}*/}

      <Main_Styled fixedHeight={fixedPageSize}>{children}</Main_Styled>
    </Fragment>
  );
};

const ThemeToggleButton = styled.button<{ theme: AppTheme }>`
  //content: ${({ theme }) => (theme.themeName === "light" ? "🌞 light" : "🌚 dark")};
  color: ${({ theme }) => (theme.themeName === "light" ? "black" : "white")};
  background: ${({ theme }) => (theme.themeName === "light" ? "white" : "black")};
  color: ${({ theme }) => (theme.themeName === "light" ? "black" : "white")};
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
