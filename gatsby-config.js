const postCssPlugins = require('./postcss-config.js');

const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.js");
const config = require("./loadYaml.js");
const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  pathPrefix: config.siteConfig.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteConfig.url,
    siteConfig: {
      ...config.siteConfig,
    },
    siteDesign: {
      ...config.siteDesign,
    },
    secretConfig: {
      ...config.secretConfig
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/media`,
        name: 'media'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'css',
        path: `${__dirname}/static/css`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static`
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteConfig {
                  url
                  title
                  description: subtitle
                }
              }
            }
          }
        `,
        feeds: [{
          serialize: ({ query: { site, allMarkdownRemark } }) => (
            allMarkdownRemark.edges.map((edge) => ({
              ...edge.node.frontmatter,
              description: edge.node.frontmatter.description,
              date: edge.node.frontmatter.date,
              url: site.siteMetadata.siteConfig.url + edge.node.fields.slug,
              guid: site.siteMetadata.url + edge.node.fields.slug,
              custom_elements: [{ 'content:encoded': edge.node.html }]
            }))
          ),
          query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        template
                        draft
                      }
                    }
                  }
                }
              }
            `,
          output: '/rss.xml',
          title: config.siteConfig.title
        }]
      }
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: config.siteConfig.url,
        sitemap: config.siteConfig.url + "/sitemap.xml",
        env: {
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }],
          },
          production: {
            policy: [{ userAgent: "*", allow: "/" }],
          },
        },
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
              withWebp: true,
              ignoreFileExtensions: [],
            }
          },
          "gatsby-remark-embed-youtube",
          "gatsby-plugin-twitter",
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' }
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-external-links'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/index.js`,
      }
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [config.secretConfig.googleAnalyticsId],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: config.secretConfig.algoliaAppId,
        apiKey: process.env['ALGOLIA_ADMIN_KEY'],
        indexName: config.secretConfig.algoliaIndexName,
        queries: [
            {
              query: `{
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { template: { eq: "post" }, draft: { eq: false } } }
                ) {
                  edges {
                    node {
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        template
                        category
                        socialImage
                        tags
                      }
                      excerpt
                      rawMarkdownBody
                    }
                  }
                }
              }`,
              transformer: ({ data }) =>
                data.allMarkdownRemark.edges.flatMap(({ node }) => {
                  return {
                    id: node.fields.slug,
                    title: node.frontmatter.title,
                    date: new Date(node.frontmatter.date),
                    template: node.fields.template,
                    category: node.fields.category,
                    socialImage: node.fields.socialImage,
                    tags: node.fields.tags,
                    excerpt: node.excerpt,
                    rawMarkdownBody: node.rawMarkdownBody,
                  }
                }),
            },
        ],
        chunkSize: 10000,
      }
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: config.siteConfig.disqusShortname
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage(
              filter: {
                path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
              }
            ) {
              edges {
                node {
                  path
                }
              }
            }
          }
        `,
        output: '/sitemap.xml',
        serialize: ({ site, allSitePage }) => allSitePage.edges.map((edge) => ({
          url: site.siteMetadata.siteUrl + edge.node.path,
          changefreq: 'daily',
          priority: 0.7
        }))
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteConfig.title,
        short_name: config.siteConfig.title,
        start_url: '/',
        background_color: '#FFF',
        theme_color: '#F7A046',
        display: 'standalone',
        icon: 'static/icon.jpg'
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [...postCssPlugins],
        cssLoaderOptions: {
          camelCase: false,
        }
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
              ? [require(`cssnano`)]
              : []),
        ],
      },
    },
    'gatsby-plugin-flow',
    'gatsby-plugin-optimize-svgs',
    'gatsby-plugin-emotion',
  ]
};
