import React from "react";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Layout from "../components/layout";
import SEO from "../components/seo";

import s from "./about.module.scss";

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className={s.contentParagraph}>{children}</p>
    ),
  },
  renderText: (text) =>
    text.split("\n").flatMap((text, i) => [i > 0 && <br />, text]),
};

const IndexPage = ({
  data: {
    contentfulAboutPage: {
      heading,
      seoTitle,
      seoDescription: { seoDescription } = {},
      heroImage,
      heroImageCaption: { heroImageCaption } = {},
      content,
    },
  },
}) => {
  return (
    <Layout>
      <SEO title={seoTitle || null} description={seoDescription || null} />
      <div className={s.heroContainer}>
        <div className={s.heroContent}>
          <h1 className={s.heading}>{heading}</h1>
        </div>

        <figure className={s.hero}>
          <div className={s.photoWrapper}>
            <Image fluid={heroImage.fluid} className={s.photo} />
          </div>

          <figcaption className={s.caption}>{heroImageCaption}</figcaption>
        </figure>
      </div>
      <div className={s.content}>
        {documentToReactComponents(JSON.parse(content.raw), richTextOptions)}
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  {
    contentfulAboutPage {
      title
      seoTitle
      seoDescription {
        seoDescription
      }
      heading
      heroImage {
        fluid(maxWidth: 4000, background: "rgb:ffffff") {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
      heroImageCaption {
        heroImageCaption
      }
      content {
        raw
      }
    }
  }
`;
