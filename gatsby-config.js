const contentfulConfig = {
  spaceId: process.env.NODE_ENV === "master" ? "79mt3m3eaftp" : "zo73pbduz6aq",
  accessToken:
    process.env.NODE_ENV === "master"
      ? "Hs6bicMR2GSQ7iXI-Kcs_PG1p9HBaTH6-9hIZnHNsEM"
      : "0illIhccDTTfGRCFDwJE8gfc3AUePBhzvApZMMRnfVY",
  environment: "master",
};

module.exports = {
  siteMetadata: {
    title: `Anne van Muijlwijk Photography`,
    description: ``,
    author: `@follywolly`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Anne van Muijlwijk Photography`,
        short_name: `AVM Photography`,
        start_url: `/`,
        background_color: `#ebebeb`,
        theme_color: `#ebebeb`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-react-svg",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
