import React, { Fragment, useEffect } from "react";
import NavBar from "@components/Layout/NavBar";
import { useRouter } from "next/router";
import NavLink from "@components/Reusable/AccessibleLink/AccessibleNavLink";
import styled from "styled-components";
import NavItem from "./NavItem";

const items = [
  ["Home", ""],
  ["Timeline", "timeline"],
  ["Card Testing", "about"],
  ["Contact?", "contact"],
  ["Galerie-de-Dmitri", "gallery"],

];
const Main_Styled = styled.main`
  display: flex;
  justify-content: space-around;
  align-items: start;
  width: 100vw;
`;
const Layout: React.FC = ({ children }) => {
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
      <Main_Styled>{children}</Main_Styled>
    </Fragment>
  );
};

export default Layout;
