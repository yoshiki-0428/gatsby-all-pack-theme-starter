import { useStaticQuery, graphql } from 'gatsby';

const useAllMarkdownRemarkForPopularList = (paths) => {
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

  const list = allMarkdownRemark.nodes
      .filter(a => paths.includes(a.fields.slug))
      .map(a => {
        return {
          title: a.frontmatter.title,
          socialImage: a.frontmatter.socialImage,
          slug: a.fields.slug
        }
      });

  return list;
};

export default useAllMarkdownRemarkForPopularList;
