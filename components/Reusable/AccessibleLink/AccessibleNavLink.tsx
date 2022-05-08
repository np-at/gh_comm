import React from "react";
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import styled from "styled-components";

export interface NavLinkProps extends LinkProps {
  children?: React.ReactNode;
  _stripStyling?: boolean;
}

const AccessibleNavLink: React.FC<NavLinkProps> = ({
  children,
  href,
  _stripStyling,
  ...others
}) => {
  const { asPath } = useRouter();
  const ariaCurrent = href === asPath ? "page" : undefined;

  return (
    <Link href={href}>
      <a aria-current={ariaCurrent} {...others}>
        {children}
      </a>
    </Link>
  );
};
const NavLink = styled(AccessibleNavLink)`
  text-decoration: ${(props) =>
    props._stripStyling === true ? "none" : "inherit"};
  color: black;
`;
export default NavLink;
