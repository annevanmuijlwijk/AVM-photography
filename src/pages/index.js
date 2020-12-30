import React from "react";
import { graphql, Link } from "gatsby";
import Image from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = ({
  data: {
    contentfulHomepage: { projects },
  },
}) => (
  <Layout>
    <SEO title="Home" />
    <h1>AVM Photography</h1>
    {projects.map(({ name, slug, poster }) => (
      <Link to={`/projects/${slug}`} key={slug}>
        <figure>
          <Image alt="" fluid={poster.fluid} />
          <figcaption>{name}</figcaption>
        </figure>
      </Link>
    ))}
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  {
    contentfulHomepage {
      projects {
        name
        slug
        poster {
          fluid(maxWidth: 4000, background: "rgb:000000") {
            ...GatsbyContentfulFluid_tracedSVG
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`;
