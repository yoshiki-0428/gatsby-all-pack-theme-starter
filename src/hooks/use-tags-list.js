import { useStaticQuery, graphql } from 'gatsby';

const useTagsList = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query TagsListQuery {
        allMarkdownRemark(
          filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
        ) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      }
    `
  );

  return allMarkdownRemark.group;
};

export default useTagsList;
