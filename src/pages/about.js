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
      <p key={children} className={s.contentParagraph}>
        {children}
      </p>
    ),
  },
  renderText: (text) =>
    text.split("\n").flatMap((text, i) => [i > 0 && <br />, text]),
};

const IndexPage = ({
  data: {
    contentfulGeneral: { email },
    contentfulAboutPage: {
      heading,
      seoTitle,
      seoDescription,
      heroImage,
      content,
    },
  },
}) => {
  return (
    <Layout>
      <SEO
        title={seoTitle || null}
        description={seoDescription?.seoDescription || null}
      />
      <div className={s.heroContainer}>
        <div className={s.headingWrapper}>
          <h1 className={s.heading}>{heading}</h1>
        </div>

        <div className={s.content}>
          {documentToReactComponents(JSON.parse(content.raw), richTextOptions)}
          {email && (
            <a className={s.email} href={`mailto:${email}`}>
              Send me an email
            </a>
          )}
        </div>

        <figure className={s.hero}>
          <div className={s.photoWrapper}>
            <Image fluid={heroImage.fluid} className={s.photo} />
          </div>

          <figcaption className={s.caption}></figcaption>
        </figure>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  {
    contentfulGeneral {
      email
    }
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
      content {
        raw
      }
    }
  }
`;
