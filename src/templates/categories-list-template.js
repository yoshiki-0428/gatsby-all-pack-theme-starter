// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata, useCategoriesList } from '../hooks';
import Category from "../components/Category/Category";
import Feed from "../components/Feed";
import styles from '../components/Layout/Layout.module.scss';
import Divider from "../components/Divider";

const CategoriesListTemplate = ({ data, pageContext }) => {
  const { title, subtitle } = useSiteMetadata();
  const categories = useCategoriesList();

  return (
    <Layout styles={styles} title={`Categories - ${title}`} description={subtitle}>
      <Sidebar gridArea={{ gridArea: 'side' }} />
      <Divider gridArea={{ gridArea: 'divider' }}/>
      <Page title="Categories" gridArea={{ gridArea: 'page' }}>
        <Category category={categories} selectedCategory={pageContext.category}/>
        <Feed edges={data.allMarkdownRemark.edges} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
    query CategoriesListTemplate($category: String!) {
        allMarkdownRemark(
            filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true }, category: { glob: $category } } },
            sort: { order: DESC, fields: [frontmatter___date] }
        ){
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
