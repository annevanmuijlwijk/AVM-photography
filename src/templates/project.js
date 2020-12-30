import React from "react";
import { graphql } from "gatsby";
import Image from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo.js";

const Project = ({
  data: {
    contentfulProject: { name, photos },
  },
}) => {
  return (
    <Layout>
      <SEO title={`${name} | Project`} />
      <h2>{name}</h2>
      {photos.map(({ id, fluid }) => (
        <Image alt="" fluid={fluid} key={id} />
      ))}
    </Layout>
  );
};

export default Project;

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      name
      photos {
        id
        fluid(maxWidth: 4000, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`;
