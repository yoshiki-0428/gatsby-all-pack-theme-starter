import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';
import tw from "twin.macro";

const PageTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { html: pageBody } = data.markdownRemark;
  const { frontmatter } = data.markdownRemark;
  const { title: pageTitle, description: pageDescription, socialImage } = frontmatter;
  const metaDescription = pageDescription !== null ? pageDescription : siteSubtitle;
  const Card = tw.div`p-4 bg-white rounded-b shadow-md`;

  const mainPage = (
    <Page title={pageTitle} content={(
        <Card><div className={'content'} dangerouslySetInnerHTML={{ __html: pageBody }} /></Card>
    )}/>
  );

  const side = <Sidebar/>;

  return (
    <Layout main={mainPage} side={side} title={`${pageTitle} - ${siteTitle}`} description={metaDescription} socialImage={socialImage}/>
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
