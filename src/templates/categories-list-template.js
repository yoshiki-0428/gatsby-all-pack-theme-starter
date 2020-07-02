import React from 'react';
import { graphql } from 'gatsby';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata, useCategoriesList } from '../hooks';
import Category from "../components/Category/Category";
import Feed from "../components/Feed";

const CategoriesListTemplate = ({ data, pageContext }) => {
  const { title, subtitle } = useSiteMetadata();
  const categories = useCategoriesList();
  const { edges, group } = data.allMarkdownRemark;

  const mainPage = (
    <Page title="Categories">
      <div>
        <Category category={categories} selectedCategory={pageContext.category}/>
        <Feed edges={edges} tags={group} />
      </div>
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
