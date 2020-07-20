import React from 'react';
import Helmet from 'react-helmet';
import { useSiteMetadata } from '../../hooks';
import Header from "../Header";
import tw from "twin.macro"
import {Link} from "gatsby";
import ImageWrap from "../Image/ImageWrap";
import {SPACER, TEXT_GATSBY_LINK_H3} from "../Tailwind";



const Layout = ({
    main,
    side,
    title,
    description,
    socialImage,
    top = false
  }) => {
  const { author, copyright } = useSiteMetadata();
  const metaImage = socialImage != null ? socialImage : author.photo;

  const Div = tw.div`flex flex-col min-h-screen bg-gray-200`;
  const Main = tw.div`container mx-auto`;
  const Body = tw.div`w-5/6 grid grid-cols-12 gap-10 py-10 mx-auto`;
  const Article = tw.div`col-span-8`;
  const Side = tw.div`col-span-4`;
  const Footer = tw.div`col-span-12`;

  // TODO stub
  const items = [
    {
      slug: '/posts/try-eventsource-client1',
      socialImage: 'https://ucarecdn.com/b2035108-5e4e-4569-be86-b9bfc2f7a1aa/',
      title: 'AAAAAbbbbaaaaaあああああ',
    },
    {
      slug: '/posts/try-eventsource-client1',
      socialImage: 'https://ucarecdn.com/b2035108-5e4e-4569-be86-b9bfc2f7a1aa/',
      title: 'AAAAAbbbbaaaaaあああああ',
    },
    {
      slug: '/posts/try-eventsource-client1',
      socialImage: 'https://ucarecdn.com/b2035108-5e4e-4569-be86-b9bfc2f7a1aa/',
      title: 'AAAAAbbbbaaaaaあああああ',
    }
  ];

  return (
    <Div>
      <Header/>

      <Main>
        <Body>
          {top && (<TopContents items={items} />)}
          <Article>{main}</Article>
          <Side>{side}</Side>
        </Body>
      </Main>

      <Footer>
        <div>{copyright}</div>
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

const TopContents = ({ items }) => {
  const TopContent = tw.div`col-span-4 bg-white shadow-lg`;

  return (
      <>
        {items.slice(0, 3).map(item => (
            <TopContent>
              <div tw="rounded overflow-hidden bg-white">
                <Link to={item.slug}>
                  <ImageWrap item={{ socialImage: item.socialImage, alt: '' }}/>
                </Link>
                <SPACER>
                  <TEXT_GATSBY_LINK_H3 to={item.slug}>{item.title}</TEXT_GATSBY_LINK_H3>
                </SPACER>
              </div>
            </TopContent>
        ))}
      </>
  );
};

export default Layout;
