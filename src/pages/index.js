import React from "react";
import { graphql, Link } from "gatsby";
import Flickity from "react-flickity-component";

import Image from "gatsby-image";

import useIsSmallWidth from "../lib/hooks/use-is-small-width";
import { useDefaultSEO } from "../lib/hooks/use-default-seo";

import Layout from "../components/layout";
import SEO from "../components/seo";

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
      <Flickity
        className={s.projectContainer}
        options={{
          ...flickityOptions,
          cellAlign: isSmallWidth ? "left" : "center",
        }}
      >
        {projects.map(({ id, name, slug, poster }) => (
          <Link to={`/projects/${slug}`} key={id} className={s.projectOuter}>
            <figure
              className={s.projectInner}
              style={{
                width: `calc(60vh * ${poster.fluid.aspectRatio})`,
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
        id
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
