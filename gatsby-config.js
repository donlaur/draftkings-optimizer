require('dotenv').config();

module.exports = {
    siteMetadata: {
        title: `Draftkings NBA Optimizer`,
        description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
        author: `@gatsbyjs`,
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-google-tagmanager',
            options: {
                id: 'GTM-K8CKCD2',

                // Include GTM in development.
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: false,

                // datalayer to be set before GTM is loaded
                // should be an object or a function that is executed in the browser
                // Defaults to null
                defaultDataLayer: { platform: 'gatsby' },

                // Specify optional GTM environment details.
                // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
                // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
                // dataLayerName: "YOUR_DATA_LAYER_NAME",
            },
        },
        `gatsby-plugin-typescript`,
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                sourceMap: true,
                postCssPlugins: [
                    require('postcss-inline-svg')({
                        path: 'src/',
                    }),
                ],
            },
        },
        `gatsby-plugin-react-helmet`,
        // {
        //   resolve: `gatsby-source-filesystem`,
        //   options: {
        //     name: `images`,
        //     path: `${__dirname}/src/assets/images`,
        //   },
        // },
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
                // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
