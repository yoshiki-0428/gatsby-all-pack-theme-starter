// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';
import styles from '../components/Layout/Layout.module.scss';
import Divider from "../components/Divider";

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const PageTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { html: pageBody } = data.markdownRemark;
  const { frontmatter } = data.markdownRemark;
  const { title: pageTitle, description: pageDescription, socialImage } = frontmatter;
  const metaDescription = pageDescription !== null ? pageDescription : siteSubtitle;

  return (
    <Layout styles={styles} title={`${pageTitle} - ${siteTitle}`} description={metaDescription} socialImage={socialImage} >
      <Sidebar gridArea={{ gridArea: 'side' }} />
      <Divider gridArea={{ gridArea: 'divider' }}/>
      <Page title={pageTitle} gridArea={{ gridArea: 'page' }}>
        <div dangerouslySetInnerHTML={{ __html: pageBody }} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        socialImage
      }
      tableOfContents
    }
  }
`;

export default PageTemplate;
