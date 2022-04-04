import React, {Fragment} from 'react'
import {Main, NavItem} from "@deque/cauldron-react"
//import NavBar, {NavItem} from "@components/Layout/NavBar";
import NavBar from "@components/Layout/NavBar"
import {useRouter} from "next/router";
import NavLink from "@components/Reusable/AccessibleLink/AccessibleLink";
import styled from "styled-components";

const items = [["Home", ""], ["Highlights", "highlights"], ["Bio", "about"], ["Contact", "contact"]]
const Main_Styled = styled.main`
    display: flex;
  justify-content: space-around;
  align-items: start;
`
const Layout: React.FC<{}> = ({children}) => {
    const router = useRouter();
    const [isMobile, setIsMobile] = React.useState(false);
    return <Fragment>
        <NavBar collapsed={isMobile}>
            {
                items.map((x, i) =>
                    <NavItem key={`${x[0]}-${i}`} active={router.pathname == `/${x[1]}`}>
                        <NavLink href={`/${x[1]}`}>
                            {x[0]}
                        </NavLink>
                    </NavItem>
                )
            }
        </NavBar>
        <Main_Styled>{children}</Main_Styled>
    </Fragment>;
}

export default Layout
