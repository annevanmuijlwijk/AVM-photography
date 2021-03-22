import React from "react";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useMediaQuery } from "beautiful-react-hooks";

import Layout from "../components/layout";
import SEO from "../components/seo.js";

import s from "./project.module.scss";

const Project = ({
  data: {
    contentfulProject: {
      name,
      description,
      photoGroups,
      seoTitle,
      seoDescription: { seoDescription } = {},
    },
  },
}) => {
  const isSmallWidth = useMediaQuery("(min-width: 768px");

  return (
    <Layout>
      <SEO title={seoTitle || null} description={seoDescription || null} />
      <div className={s.container}>
        <div className={s.content}>
          <h1 className={s.name}>{name}</h1>
          {description && (
            <div>{documentToReactComponents(JSON.parse(description.raw))}</div>
          )}
        </div>

        <div className={s.photoGroups}>
          {photoGroups.map(({ id, photos }) => (
            <div key={id} className={s.photoGroup}>
              {photos.map(({ id, fluid, description }) => (
                <div
                  className={s.photoContainer}
                  key={id}
                  style={{
                    maxWidth: isSmallWidth
                      ? `calc(80vh * ${fluid.aspectRatio})`
                      : "100%",
                  }}
                >
                  <div className={s.photoWrapper}>
                    <Image
                      alt={description}
                      fluid={fluid}
                      className={s.photo}
                    />
                  </div>
                  {description && (
                    <div className={s.photoDescription}>{description}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Project;

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      seoTitle
      seoDescription {
        seoDescription
      }
      name
      description {
        raw
      }
      photoGroups {
        id
        photos {
          id
          description
          fluid(maxWidth: 4000, background: "rgb:ffffff") {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
      }
    }
  }
`;
