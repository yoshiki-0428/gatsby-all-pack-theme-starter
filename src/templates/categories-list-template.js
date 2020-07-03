import React from 'react';
import { graphql } from 'gatsby';
import { useSiteMetadata, useCategoriesList } from '../hooks';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import Feed from "../components/Feed";
import Tags from "../components/Tags/";

const CategoriesListTemplate = ({ data, pageContext }) => {
  const { title, subtitle } = useSiteMetadata();
  const categories = useCategoriesList();
  const { edges, group } = data.allMarkdownRemark;

  const pageTitle = pageContext.category === '*' ? '' : `${pageContext.category}に関する記事一覧`;
  const mainPage = (
    <Page title={pageTitle} content={(
      <Feed edges={edges} tags={group} />
    )} footerContent={(
      <Tags tags={categories} urlPrefix={'category'} selectedTag={pageContext.category}/>
    )}>
    </Page>
  );

  const side = <Sidebar/>;

  return (
    <Layout main={mainPage} side={side} title={`Categories - ${title}`} description={subtitle}/>
  );
};

export const query = graphql`
    query CategoriesListTemplate($category: String!) {
        allMarkdownRemark(
            filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true }, category: { glob: $category } } },
            sort: { order: DESC, fields: [frontmatter___date] }
        ){
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
            edges {
                node {
                    fields {
                        slug
                        categorySlug
                    }
                    frontmatter {
                        title
                        date
                        category
                        socialImage
                    }
                    excerpt
                }
            }
        }
    }
`;

export default CategoriesListTemplate;
