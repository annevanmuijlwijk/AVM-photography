const contentfulConfig = {
  spaceId:
    process.env.NODE_ENV === "development" ? "79mt3m3eaftp" : "zo73pbduz6aq",
  accessToken:
    process.env.NODE_ENV === "development"
      ? "Hs6bicMR2GSQ7iXI-Kcs_PG1p9HBaTH6-9hIZnHNsEM"
      : "0illIhccDTTfGRCFDwJE8gfc3AUePBhzvApZMMRnfVY",
  environment:
    process.env.NODE_ENV === "development" ? "development" : "master",
};

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
    "gatsby-plugin-sass",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
