import React from "react";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Layout from "../components/layout";
import SEO from "../components/seo.js";

import s from "./project.module.scss";

const Project = ({
  data: {
    contentfulProject: {
      name,
      description,
      photos,
      seoTitle,
      seoDescription: { seoDescription },
    },
  },
}) => {
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

        <div className={s.photoContainer}>
          {photos.map(({ id, fluid, description }) => (
            <Image
              alt={description}
              fluid={fluid}
              key={id}
              className={s.photo}
            />
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
      photos {
        id
        fluid(maxWidth: 4000, background: "rgb:ffffff") {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
    }
  }
`;
