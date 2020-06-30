// @flow strict
import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';
import styles from '../components/Layout/Layout.module.scss';
import Divider from "../components/Divider";

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle} styles={styles}>
      <Sidebar gridArea={{ gridArea: 'side' }} />
      <Divider gridArea={{ gridArea: 'divider' }}/>
      <Page gridArea={{ gridArea: 'page' }}  title="NOT FOUND">
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Page>
    </Layout>
  );
};

export default NotFoundTemplate;
