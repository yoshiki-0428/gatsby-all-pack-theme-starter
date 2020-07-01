// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import Sidebar from "../components/Sidebar";

const PostTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { frontmatter, excerpt } = data.markdownRemark;
  const { title: postTitle, description: postDescription, socialImage } = frontmatter;
  const metaDescription = postDescription !== null ? excerpt : siteSubtitle;

  const main = <Post post={data.markdownRemark} />;
  const side = <Sidebar/>;
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
        tags
        title
        socialImage
      }
      tableOfContents
    }
  }
`;

export default PostTemplate;
