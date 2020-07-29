import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import Sidebar from "../components/Sidebar";
import "twin.macro"

const PostTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { frontmatter, excerpt } = data.markdownRemark;
  const { title: postTitle, description: postDescription, socialImage } = frontmatter;
  const metaDescription = postDescription !== null ? excerpt : siteSubtitle;

  const main = <Post post={data.markdownRemark} />;
  const toc = <div className={'toc'} dangerouslySetInnerHTML={{ __html: data.markdownRemark.tableOfContents }}/>;
  const side = <Sidebar toc={toc}/>;
  return (
    <Layout main={main} side={side} title={`${postTitle} - ${siteTitle}`} description={metaDescription} socialImage={socialImage} />
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        updatedDate
        tags
        title
        socialImage
        category
        relatedLinks
      }
      tableOfContents
    }
  }
`;

export default PostTemplate;
