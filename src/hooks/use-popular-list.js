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

  const pathList = allIPopularPage.nodes.map(p => p.path);
  return useAllMarkdownRemarkForPopularList(pathList);
};

export default usePopularList;
