import React from 'react';
import { graphql } from "gatsby";
import { useSiteMetadata } from '../hooks';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import Feed from "../components/Feed";

const TagsListTemplate = ({ data, pageContext }) => {
  const { title, subtitle } = useSiteMetadata();
  const { edges, group } = data.allMarkdownRemark;

  const pageTitle = pageContext.tag === '*' ? '' : `${pageContext.tag}に関する記事一覧`;
  const mainPage = (
      <Page title={pageTitle} content={(
        <Feed edges={edges} />
      )}>
      </Page>
  );

  const side = <Sidebar/>;

  return (
    <Layout main={mainPage} side={side} title={`Tags - ${title}`} description={subtitle} />
  );
};

export const query = graphql`
query TagsListTemplate($tag: String!) {
    allMarkdownRemark(
        filter: {
            frontmatter: {
                template: { eq: "post" },
                draft: { ne: true },
                tags: { glob: $tag } }
        },
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
                    tags
                }
                excerpt
            }
        }
    }
}
`;

export default TagsListTemplate;


