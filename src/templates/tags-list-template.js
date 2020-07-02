import React from 'react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata, useTagsList } from '../hooks';
import Tags from "../components/Tags";
import Feed from "../components/Feed";
import { graphql } from "gatsby";

const TagsListTemplate = ({ data, pageContext }) => {
  const { title, subtitle } = useSiteMetadata();
  const tags = useTagsList();

  const mainPage = (
    <Page gridArea={{ gridArea: 'page' }} title="Tags">
      <div>
        <Tags tags={tags} selectedTag={pageContext.tag}/>
        <Feed edges={data.allMarkdownRemark.edges} />
      </div>
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
                }
                excerpt
            }
        }
    }
}
`;

export default TagsListTemplate;


