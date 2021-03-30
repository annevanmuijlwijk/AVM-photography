import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import mergeClassNames from "../lib/template/merge-class-names";

import "../styles/main.scss";
import s from "./layout.module.scss";

const pageGroups = ["projects", "about"];

const Layout = ({ children }) => {
  const activePageGroup =
    pageGroups.find((group) => {
      if (typeof window === "undefined") return false;
      return window.location.pathname.includes(group);
    }) || pageGroups[0];

  return (
    <>
      <header className={s.header}>
        <Link to="/" className={s.logo}>
          AVM
        </Link>
        <nav className={s.nav}>
          <Link
            className={
              activePageGroup === pageGroups[0]
                ? mergeClassNames(s.link, s.activeLink)
                : s.link
            }
            to="/"
          >
            Projects
          </Link>
          <Link
            className={
              activePageGroup === pageGroups[1]
                ? mergeClassNames(s.link, s.activeLink)
                : s.link
            }
            to="/about"
          >
            About
          </Link>
        </nav>
      </header>
      <div className={s.borderInner}></div>
      <div className={s.borderOuter}></div>
      <main className={s.mainOuter}>
        <div className={s.mainInner}>{children}</div>
      </main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
