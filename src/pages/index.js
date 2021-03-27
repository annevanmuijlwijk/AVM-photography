import React from "react";
import { graphql, Link } from "gatsby";
import Flickity from "react-flickity-component";

import Image from "gatsby-image";

import useIsSmallWidth from "../hooks/use-is-small-width";

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
    contentfulHomePage: { projects, seoTitle, seoDescription },
  },
}) => {
  const defaultSeo = useDefaultSEO();

  const isSmallWidth = useIsSmallWidth();

  return (
    <Layout>
      <SEO
        title={seoTitle || null}
        description={seoDescription?.seoDescription || null}
      />
      <h1 className={s.hidden}>{seoTitle || defaultSeo.title}</h1>
      {isSmallWidth ? (
        <Flickity className={s.projectContainer} options={flickityOptions}>
          {projects.map(({ name, slug, poster }) => (
            <Link
              to={`/projects/${slug}`}
              key={slug}
              className={s.projectOuter}
            >
              <figure
                className={s.projectInner}
                style={{
                  width: `calc(60vh * ${poster.fluid.aspectRatio} )`,
                }}
              >
                <div className={s.projectImageWrapper}>
                  <Image
                    alt={poster.description}
                    fluid={poster.fluid}
                    className={s.projectImage}
                  />
                </div>

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
                <div className={s.projectImageWrapper}>
                  <Image
                    alt={poster.description}
                    fluid={poster.fluid}
                    className={s.projectImage}
                  />
                </div>
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
            aspectRatio
          }
        }
      }
    }
  }
`;
