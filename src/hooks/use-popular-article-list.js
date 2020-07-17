import { useStaticQuery, graphql } from 'gatsby';

const useAllMarkdownRemarkForPopularList = () => {
  const { allMarkdownRemark } = useStaticQuery(
      graphql`
          query AllMarkdownRemarkForPopular {
              allMarkdownRemark {
                  nodes {
                      fields {
                          slug
                      }
                      frontmatter {
                          title
                          socialImage
                      }
                  }
              }
          }`
  );

  return allMarkdownRemark.nodes;
};

export default useAllMarkdownRemarkForPopularList;
