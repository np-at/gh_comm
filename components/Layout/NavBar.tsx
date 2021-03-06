import React, { Fragment, KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { useId } from "react-id-generator";
import classNames from "classnames";
import Icon from "./Icon/Icon";
import styled from "styled-components";
import { useRouter } from "next/router";
import { breakpoints } from "@styles/MediaBreakpoints";

export interface NavBarProps {
  children: React.ReactNode;
  collapsed?: boolean;
  propId?: string;
  className?: string;
  initialActiveIndex?: number;
  navTriggerLabel?: string;
}

// TODO: remove this if not used
//
// const darkThemeTopBarCss = css<AppThemeProps>`
//   --top-bar-background-color: var(--accent-dark);
//   --top-bar-menuitem-separator: #5d676f;
//   --top-bar-border-bottom-color: var(--gray-70);
//   --top-bar-text-color: var(--accent-light);
//   --top-bar-background-color-active: #0b0e11;
// `;
// const darkThemeNavBarCss = css`
//   --top-nav-background-color: var(--top-bar-background-color);
//   --top-nav-background-color-hover: var(--accent-medium);
//   --top-nav-text-color: var(--top-bar-text-color);
//   --top-nav-border-bottom-color: #5d676f;
//   --top-nav-active-shadow-color: var(--accent-info);
//   --top-nav-box-shadow-color: #5d676f;
// `;
// const lightThemeNavBarCss = css`
//   --top-bar-background-color: var(--white);
//   --top-bar-background-color-active: var(--white);
//   --top-bar-text-color: var(--accent-dark);
//   --top-bar-menuitem-separator: #b3bfc6;
//   --top-bar-border-bottom-color: var(--gray-40);
//
//   --top-nav-background-color: var(--top-bar-background-color);
//   --top-nav-background-color-hover: var(--gray-20);
//   --top-nav-border-bottom-color: var(--gray-40);
//   --top-nav-active-shadow-color: var(--accent-primary);
//   --top-nav-box-shadow-color: var(--gray-40);
//   --top-nav-text-color: var(--top-bar-text-color);
// `;
const NavBarWrapper = styled.nav`
  --top-bar-accent-primary: var(--accent-info);
  --top-bar-accent-warning: var(--accent-warning);
  --top-bar-accent-error: var(--accent-danger);
  --top-bar-accent-success: #62e86b;
  --top-bar-accent-warning-other: var(--accent-danger-light);
  --top-bar-height: 69px;
  --top-bar-height-thin: 43px;
  --top-nav-height: 3rem;
  --top-nav-text-color: var(--text-color-base);
  --top-nav-background-color: var(--menu-background-color);
  --top-nav-active-shadow-color: var(--accent-primary);
  --top-nav-box-shadow-color: var(--accent-secondary);
  --z-index-top-nav:1;
  height: var(--top-nav-height);
  /* allow the top bar dropdown to be higher in stacking order */
  z-index: var(--z-index-top-nav);
  width: var(--mod-width);
  display: flex;
  align-items: center;
  background-color: var(--top-nav-background-color);
  color: var(--top-nav-text-color);
  //border-bottom: 2px solid var(--menu-border);
  //position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //background-color: transparent;
    pointer-events: none;
    transform: translateY(1%);
    border-bottom: 1px solid var(--menu-border);
  }

  & > ul {
    width: 100%;
    list-style-type: none;
    display: flex;
    z-index: var(--z-index-top-nav);
    justify-content: space-around;
    //padding-inline-start: 0;
    //padding-inline-end: .5em;
  }

  & > ul > li {
    //margin-left: auto;
    //margin-right:auto;
    height: var(--top-nav-height);
    font-size: var(--text-size-normal);
    min-width: 9.375rem;
    cursor: pointer;
    position: relative;
    //display: block;
    align-items: center;
    background-color: var(--top-nav-background-color);
    //border-bottom: 1px solid var(--menu-border);
    //border-bottom: transparent;
    border-right: 1px solid var(--menu-shadow);
    transition: background-color 0.3s ease;
  }

  & > ul > li:first-child:not(.NavBar__trigger) {
    border-left: 1px solid var(--menu-shadow);
    margin-left: 0;
    margin-right: auto;
    left: 0;
    -ms-flex-align: start;
  }

  & > ul > li:nth-child(2) {
    border-left: 1px solid var(--menu-shadow);
  }

  & > ul > li:hover {
    background-color: var(--top-nav-background-color-hover);
  }

  & > ul > li:focus-within {
    /* make focus outline visible */
    z-index: calc(var(--z-index-top-nav) + 1);
  }

  & > ul > li.NavItem--active {
    box-shadow: inset 0 4px 0 var(--top-nav-active-shadow-color);
    /* make focus outline visible */
    z-index: calc(var(--z-index-top-nav) + 1);
  }

  & > ul > li > a {
    color: var(--top-nav-text-color);
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--space-medium);
    /* clicking anywhere in the "item" should activate the anchor */
    height: 100%;
    width: 100%;
  }

  /* NavBar collapsed */

  &.NavBar--collapsed {
    align-items: flex-start;
    flex-direction: column;
    height: auto;
  }

  &.NavBar--collapsed > ul {
    flex-direction: column;
    width: 100%;
    overflow: auto;
  }

  &.NavBar--collapsed > ul > li {
    width: 100%;
    height: var(--top-nav-height);
    font-size: var(--text-size-small);
    color: var(--top-nav-text-color);
    flex: 0 1 3.125rem;
    border-right: none;
  }

  &.NavBar--collapsed > ul > .NavItem--active {
    box-shadow: inset 0px -1px 0px var(--top-nav-box-shadow-color),
      inset 6px 0px 0px var(--top-nav-active-shadow-color);
  }

  &.NavBar--collapsed > .NavBar__trigger--active {
    box-shadow: inset 0px -1px 0px var(--top-nav-box-shadow-color),
      inset 0px 4px 0px var(--top-nav-active-shadow-color);
    z-index: calc(var(--z-index-top-nav) + 1);
  }

  &.NavBar--collapsed > .NavBar__trigger {
    padding: 0 var(--space-small);
    background-color: var(--top-nav-background-color);
    color: var(--top-nav-text-color);
    width: 100%;
    height: 3.125rem;
  }

  &.NavBar--collapsed > .NavBar__trigger:hover {
    background-color: var(--top-nav-background-color-hover);
  }

  /* make focus outline visible */

  &.NavBar--collapsed > ul > li > a:focus,
  &.NavBar--collapsed > .NavBar__trigger:focus {
    //outline-offset: calc(var(--space-quarter) * -1);
  }

  &.NavBar--collapsed > .NavBar__trigger .Icon {
    margin-right: var(--space-smallest);
  }

  @media (max-width: ${breakpoints.md}) {
    &.NavBar > ul > li {
      font-size: var(--text-size-small);
    }

    &.NavBar > ul > li:not(.NavItem--previous):not(.NavItem--next) {
      min-width: 7.125rem;
    }
  }
`;
const NavBar: React.FC<NavBarProps> = ({ collapsed, children, propId, navTriggerLabel }) => {
  const navRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // avoid conditional react hook invocation
  const dynamicId = useId(1, "navbar");
  const [menuId] = [propId] || dynamicId;
  const showNavItems = !collapsed || (collapsed && showDropdown);

  const handleOutSideEvent = (e: FocusEvent | MouseEvent) => {
    const target = e.target as HTMLElement;
    if (navRef.current && !navRef.current?.contains(target)) {
      setShowDropdown(false);
    }
  };

  const handleKeyUp: KeyboardEventHandler<HTMLUListElement> = (
    e: React.KeyboardEvent<HTMLUListElement>
  ) => {
    if (e.key !== "Escape") {
      return;
    }

    setShowDropdown(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (collapsed && showDropdown) {
      document.addEventListener("focusin", handleOutSideEvent);

      return () => {
        document.removeEventListener("focusin", handleOutSideEvent);
      };
    }
    return undefined;
  }, [collapsed, showDropdown]);

  const handleTriggerClick = () => setShowDropdown(!showDropdown);
  const { events } = useRouter();

  useEffect(() => {
    const closeDropdown = () => setShowDropdown(false);
    events?.on("routeChangeStart", closeDropdown);

    return () => events?.off("routeChangeStart", closeDropdown);
  });

  return (
    <Fragment>
      <NavBarWrapper className={collapsed ? "NavBar--collapsed" : ""} ref={navRef}>
        {collapsed && (
          <button
            aria-haspopup="true"
            aria-expanded={showDropdown}
            aria-controls={menuId}
            ref={triggerRef}
            onClick={handleTriggerClick}
            className={classNames("NavBar__trigger", {
              "NavBar__trigger--active": showDropdown
            })}>
            <Icon type={showDropdown ? "close" : "hamburger-menu"} label={navTriggerLabel} />
          </button>
        )}
        {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
        {showNavItems && (
          <ul onKeyUp={handleKeyUp} id={menuId}>
            {children}
          </ul>
        )}
      </NavBarWrapper>
    </Fragment>
  );
};

export default NavBar;
