import React from 'react';
import Helmet from 'react-helmet';
import { useSiteMetadata } from '../../hooks';
import Copyright from "../Sidebar/Copyright";
import Header from "../Header";
import tw from "twin.macro"

const Layout = ({
    main,
    side,
    title,
    description,
    socialImage
  }) => {
  const { author, copyright } = useSiteMetadata();
  const metaImage = socialImage != null ? socialImage : author.photo;

  const Div = tw.div`flex flex-col min-h-screen bg-gray-200`;
  const Body = tw.div`grid grid-cols-12 gap-10 flex-grow px-48 py-10`;
  const Article = tw.div`col-span-8`;
  const Side = tw.div`col-span-4`;
  const Footer = tw.div`col-span-10`;

  return (
    <Div>
      <Header/>

      <Body>
        <Article>{main}</Article>
        <Side>{side}</Side>
      </Body>

      <Footer>
        <Copyright copyright={copyright}/>
      </Footer>
      <Helmet>
        <html lang="jp" />
        <title>{title}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
              integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8=" crossOrigin="anonymous"/>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={metaImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={metaImage} />
      </Helmet>
    </Div>
  );
};

export default Layout;
