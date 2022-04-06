import React from "react";
import {useRouter} from "next/router";
import Link,{LinkProps} from "next/link";
import styled from "styled-components";

export interface NavLinkProps extends LinkProps {
    stripStyling?: boolean
}

const AccessibleLink: React.FC<NavLinkProps> = ({children, href, stripStyling, ...other}) => {

    const {asPath} = useRouter();
    const ariaCurrent = href === asPath ? "page" : undefined;


    return <Link href={href}>
        <a

            aria-current={ariaCurrent}
        >
            {children}
        </a>
    </Link>
}
const NavLink = styled(AccessibleLink)`
  text-decoration: ${props => (props.stripStyling === true ? "none" : "inherit")};
  color: black;
`
export default NavLink