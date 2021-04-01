import React from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";

import mergeClassNames from "../lib/template/merge-class-names";

import Logo from "../images/logo.svg";

import "../styles/main.scss";
import s from "./layout.module.scss";

const pageGroups = ["projects", "about"];

let seenSplash = false;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      contentfulGeneral {
        email
        phone
      }
    }
  `);
  const { phone, email } = data?.contentfulGeneral;
  const currentYear = new Date().getFullYear();

  const activePageGroup =
    pageGroups.find((group) => {
      if (typeof window === "undefined") return false;
      return window.location.pathname.includes(group);
    }) || pageGroups[0];

  return (
    <>
      {!seenSplash && (
        <div className={s.splashScreen}>
          <div
            className={s.splashScreenContent}
            onAnimationEnd={() => {
              seenSplash = true;
            }}
          >
            <Logo className={s.splashScreenLogo} />
            <span className={s.splashScreenText}>avm.photography</span>
          </div>
        </div>
      )}
      <header className={s.header}>
        <Link
          to="/"
          className={s.logoWrapper}
          title="Anne van Muijlwijk Photography"
        >
          <Logo className={s.logo} />
          <span className={s.logoText}>avm.photography</span>
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
      <div className={s.borderOuter}>
        <div className={s.contact}>
          <a href={`mailto:${email}`} className={s.contactItem}>
            {email}
          </a>
          |
          <a href={`tel:${phone}`} className={s.contactItem}>
            {phone}
          </a>
          |
          <a
            href="https://instagram.com/annevanmuijlwijk"
            target="_blank"
            rel="noopener noreferrer"
            className={s.contactItem}
          >
            @annevanmuijlwijk
          </a>
          |
          <div className={s.contactItem}>
            2021 {currentYear > 2021 ? `- ${currentYear}` : ""} © Anne van
            Muijlwijk
          </div>
        </div>
      </div>

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
