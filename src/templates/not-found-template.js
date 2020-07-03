import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  const mainPage = (
      <Page title="NOT FOUND" content={<p>You just hit a route that doesn&#39;t exist... the sadness.</p>}/>
  );

  const side = <Sidebar/>;

  return (
    <Layout main={mainPage} side={side} title={`Not Found - ${title}`} description={subtitle} />
  );
};

export default NotFoundTemplate;
