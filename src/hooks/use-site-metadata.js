import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            siteConfig {
              author {
                name
                bio
                photo
                contacts {
                  facebook
                  linkedin
                  github
                  twitter
                  telegram
                  instagram
                  email
                  rss
                  vkontakte
                  line
                  gitlab
                  weibo
                  codepen
                  youtube
                  soundcloud
                }
              }
              menu {
                label
                path
              }
              topContents {
                url
              }
              url
              title
              subtitle
              copyright
              disqusShortname
              headerImage
            }
          }
        }
      }
    `
  );

  return site.siteMetadata.siteConfig;
};

export default useSiteMetadata;
