// @flow strict
import React from 'react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata, useTagsList } from '../hooks';
import Tags from "../components/Tags";
import Feed from "../components/Feed";
import { graphql } from "gatsby";
import styles from '../components/Layout/Layout.module.scss';
import Divider from "../components/Divider";

const TagsListTemplate = ({ data, pageContext }) => {
  const { title, subtitle } = useSiteMetadata();
  const tags = useTagsList();

  return (
    <Layout styles={styles} title={`Tags - ${title}`} description={subtitle}>
      <Sidebar gridArea={{ gridArea: 'side' }} />
      <Divider gridArea={{ gridArea: 'divider' }}/>
      <Page gridArea={{ gridArea: 'page' }} title="Tags">
        <Tags tags={tags} selectedTag={pageContext.tag}/>
        <Feed edges={data.allMarkdownRemark.edges} />
      </Page>
    </Layout>
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
                }
                excerpt
            }
        }
    }
}
`;

export default TagsListTemplate;


