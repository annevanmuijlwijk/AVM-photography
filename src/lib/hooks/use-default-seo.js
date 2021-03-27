import { useStaticQuery, graphql } from "gatsby";

export const useDefaultSEO = () => {
  const {
    contentfulGeneral: {
      seoTitle: title,
      seoDescription: { seoDescription: description },
    },
  } = useStaticQuery(
    graphql`
      {
        contentfulGeneral {
          seoTitle
          seoDescription {
            seoDescription
          }
        }
      }
    `
  );

  return {
    title,
    description,
  };
};
