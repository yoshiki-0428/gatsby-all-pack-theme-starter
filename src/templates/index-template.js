import React from 'react';
import { graphql } from 'gatsby';
import { useSiteMetadata } from '../hooks';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';

const IndexTemplate = ({ data, pageContext }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath
  } = pageContext;

  const { edges } = data.allMarkdownRemark;
  const pageTitle = currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle;

  const mainPage = (
    <Page content={
      <div>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </div>
    }/>
  );

  const side = <Sidebar />;

  return (
    <Layout main={mainPage} side={side} title={pageTitle} description={siteSubtitle} top/>
  );
};

export const query = graphql`
  query IndexTemplate($postsLimit: Int!, $postsOffset: Int!) {
    allMarkdownRemark(
        limit: $postsLimit,
        skip: $postsOffset,
        filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } },
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
            updatedDate
            category
            socialImage
            tags
          }
          excerpt
        }
      }
    }
    
  }
`;

export default IndexTemplate;
