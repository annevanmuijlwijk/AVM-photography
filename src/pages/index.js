import React from "react";
import { graphql, Link } from "gatsby";
import Flickity from "react-flickity-component";

import Image from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { useDefaultSEO } from "../lib/hooks/useDefaultSEO";

import s from "./index.module.scss";

const flickityOptions = {
  prevNextButtons: false,
  pageDots: false,
  cellAlign: "left",
  contain: true,
};

const IndexPage = ({
  data: {
    contentfulHomePage: {
      projects,
      seoTitle,
      seoDescription: { seoDescription },
    },
  },
}) => {
  const defaultSeo = useDefaultSEO();

  const isSmallWidth =
    typeof window !== `undefined` ? window.innerWidth >= 768 : true;

  return (
    <Layout>
      <SEO title={seoTitle || null} description={seoDescription || null} />
      <h1 className={s.hidden}>{seoTitle || defaultSeo.title}</h1>
      {isSmallWidth ? (
        <Flickity
          className={s.projectContainer}
          options={flickityOptions}
          static
        >
          {projects.map(({ name, slug, poster }) => (
            <Link
              to={`/projects/${slug}`}
              key={slug}
              className={s.projectOuter}
            >
              <figure className={s.projectInner}>
                <Image
                  alt={poster.description}
                  fluid={poster.fluid}
                  className={s.projectImage}
                />
                <figcaption className={s.projectName}>{name}</figcaption>
              </figure>
            </Link>
          ))}
        </Flickity>
      ) : (
        <div className={s.projectContainer}>
          {projects.map(({ name, slug, poster }) => (
            <Link
              to={`/projects/${slug}`}
              key={slug}
              className={s.projectOuter}
            >
              <figure className={s.projectInner}>
                <Image
                  alt={poster.description}
                  fluid={poster.fluid}
                  className={s.projectImage}
                />
                <figcaption className={s.projectName}>{name}</figcaption>
              </figure>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  {
    contentfulHomePage {
      title
      seoTitle
      seoDescription {
        seoDescription
      }
      projects {
        name
        slug
        poster {
          fluid(maxWidth: 4000, background: "rgb:ffffff") {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
      }
    }
  }
`;
