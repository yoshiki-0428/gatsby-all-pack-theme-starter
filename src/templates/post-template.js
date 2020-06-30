// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';
import styles from '../components/Layout/PostLayout.module.scss';
import Toc from "../components/Toc";

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const PostTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { frontmatter, excerpt } = data.markdownRemark;
  const { title: postTitle, description: postDescription, socialImage } = frontmatter;
  const metaDescription = postDescription !== null ? excerpt : siteSubtitle;

  return (
    <Layout styles={styles} title={`${postTitle} - ${siteTitle}`} description={metaDescription} socialImage={socialImage} >
      <Post post={data.markdownRemark} gridArea={{ gridArea: 'post' }} />
      <Toc tableOfContents={data.markdownRemark.tableOfContents} gridArea={{ gridArea: 'toc' }}/>
    </Layout>
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
