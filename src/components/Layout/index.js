import React from 'react';
import Helmet from 'react-helmet';
import { useSiteMetadata } from '../../hooks';
import Header from "../Header/Header";
import Copyright from "../Sidebar/Copyright";
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

  const Div = tw.div`flex flex-col min-h-screen`;
  const Main = tw.div`grid grid-cols-3 gap-4 flex-grow px-32`;
  const Article = tw.div`col-span-2`;
  const Side = tw.div`col-span-1`;
  const Footer = tw.div`col-span-4`;

  return (
    <Div>
      <Header/>

      <Main>
        <Article>{main}</Article>
        <Side>{side}</Side>
      </Main>

      <Footer>
        <Copyright copyright={copyright}/>
      </Footer>
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
    </Div>
  );
};

export default Layout;
