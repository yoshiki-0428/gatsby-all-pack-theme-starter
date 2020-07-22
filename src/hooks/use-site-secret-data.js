import { useStaticQuery, graphql } from 'gatsby';

const useSiteSecretData = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteSecretData {
        site {
          siteMetadata {
            secretConfig {
              algoliaAppId
              algoliaIndexName
              algoliaSearchApiKey
              googleAdsnseClientId
              googleAdsnseClientSlot
              googleAnalyticsId
              googleAnalyticsViewId
            }
          }
        }
      }
    `
  );

  return site.siteMetadata.secretConfig;
};

export default useSiteSecretData;
