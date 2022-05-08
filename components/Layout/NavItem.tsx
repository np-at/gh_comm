import React from "react";
import classNames from "classnames";

interface NavItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ children, active, ...other }) => (
  <li
    className={classNames("NavItem", {
      "NavItem--active": active
    })}
    {...other}
  >
    {children}
  </li>
);

NavItem.displayName = "NavItem";

export default NavItem;
