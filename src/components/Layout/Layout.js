// @flow strict
import React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import type { Node as ReactNode } from 'react';
import { useSiteMetadata } from '../../hooks';

type Props = {
  children: ReactNode,
  styles: any,
  title: string,
  description?: string,
  socialImage? :string
};

const Layout = ({
  children,
  styles,
  title,
  description,
  socialImage
}: Props) => {
  const { author } = useSiteMetadata();
  const metaImage = socialImage != null ? socialImage : author.photo;

  return (
    <div className={styles.layout}>
      <Helmet>
        <html lang="jp" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={metaImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={metaImage} />
      </Helmet>
      {children}
    </div>
  );
};

export default Layout;
