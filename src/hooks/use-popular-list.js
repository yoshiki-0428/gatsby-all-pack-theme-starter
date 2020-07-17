import { useStaticQuery, graphql } from 'gatsby';
import useAllMarkdownRemarkForPopularList from "./use-popular-article-list";

const usePopularList = () => {
  const { allIPopularPage } = useStaticQuery(
    graphql`
      query PopularListQuery {
        allIPopularPage {
          nodes {
            count
            id
            path
            title
          }
        }
      }
    `
  );

  const nodes = useAllMarkdownRemarkForPopularList();
  const pathList = allIPopularPage.nodes.map(p => p.path);
  // TODO debug
  pathList.push('/posts/try-eventsource-client1');

  const list = nodes
      .filter(a => pathList.includes(a.fields.slug))
      .map(a => {
        return {
          title: a.frontmatter.title,
          socialImage: a.frontmatter.socialImage,
          slug: a.fields.slug
        }
      });
  console.log(list)
  return list;
};

export default usePopularList;
