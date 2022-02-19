const metaConfig = require('./gatsby-meta-config')

module.exports = {
  siteMetadata: metaConfig,
  pathPrefix: `/kontrolqa`,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/__about`,
        name: `about`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`,
            options: {
              margin: 36,
              scrollOffset: 0,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: '%',
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-emoji`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: metaConfig.ga,
        head: true,
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: metaConfig.title,
        short_name: metaConfig.title,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: metaConfig.icon,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: '',
        sitemap: '',
        policy: [
          {
            userAgent: '*',
            allow: '/',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: metaConfig.ad,
      },
    },
    {
      
      resolve: 'gatsby-plugin-local-search',
      options: {
          name: 'pages',
          engine: 'flexsearch',
          query:`
              query {
                allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
                  nodes {
                    excerpt
                    fields {
                      slug
                    }
                    frontmatter {
                      date(formatString: "MMMM DD, YYYY")
                      title,
                      category,
                      draft
                    }
                  }
                }
              }
            `,
          ref: 'slug',
          index: ['title', 'excerpt', 'category'],
          store: ['title', 'excerpt', 'slug', 'date', 'category', 'draft'],
          normalizer: ({ data }) =>
            data.allMarkdownRemark.nodes.map(node => ({
                title: node.frontmatter.title,
                excerpt: node.excerpt,
                slug: node.fields.slug,
                date: node.frontmatter.date,
                category: node.frontmatter.category,
                draft: node.frontmatter.draft
          })),
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-lodash`,
    `gatsby-plugin-sitemap`
  ],
}
