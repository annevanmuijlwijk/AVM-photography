import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import "../styles/main.scss";
import s from "./layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <header className={s.header}>
        <Link to="/" className={s.logo}>
          AVM
        </Link>
        <nav className={s.nav}>
          <Link className={s.link} to="/">
            Projects
          </Link>
          <Link to="/about" className={s.link}>
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
