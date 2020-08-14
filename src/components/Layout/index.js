import React from 'react';
import Helmet from 'react-helmet';
import {useAllMarkdownRemarkForPopularList, useSiteMetadata, useCategoriesList} from '../../hooks';
import tw from "twin.macro"
import {Link} from "gatsby";
import ImageWrap from "../Image/ImageWrap";
import {SPACER, TEXT_GATSBY_LINK_H3} from "../Tailwind";
import {Header} from "../Header";

const Layout = ({
    main,
    side,
    title,
    description,
    socialImage,
    top = false
  }) => {
  const { author, copyright, topContents, headerImage } = useSiteMetadata();
  const categories = useCategoriesList();
  const items = useAllMarkdownRemarkForPopularList(topContents.map(top => top.url));
  const metaImage = socialImage != null ? socialImage : author.photo;

  const Div = tw.div`flex flex-col min-h-screen bg-base-back`;
  const Main = tw.div`container mx-auto`;
  const Body = tw.div`w-11/12 grid grid-cols-12 lg:gap-10 gap-6 sm:pt-10 py-10 mx-auto`;
  const Article = tw.div`lg:col-span-8 col-span-12`;
  const Side = tw.div`lg:col-span-4 col-span-12`;
  const Footer = tw.div`col-span-12`;

  return (
    <Div>
      <Header headerImage={headerImage} categories={categories}/>

      <Main>
        <Body>
          {top && items.length === 3 && (<TopContents items={items} />)}
          <Article>{main}</Article>
          <Side>{side}</Side>
        </Body>
      </Main>

      <Footer>
        <div tw="text-base text-base-font ml-2 mb-2">{copyright}</div>
      </Footer>
      <Helmet>
        <html lang="ja" />
        <title>{title}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css"
              integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8=" crossOrigin="anonymous"/>
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>
        <link href="https://ucarecdn.com" rel="preconnect" crossOrigin/>
        <link rel="dns-prefetch" href="https://ucarecdn.com"/>

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
  const TopContent = tw.div`lg:col-span-4 col-span-12 bg-white shadow-lg rounded`;

  return (
      <>
        {items.slice(0, 3).map(item => (
            <TopContent key={item.slug}>
              <div tw="rounded-tr rounded-tl overflow-hidden bg-white">
                <Link to={item.slug}>
                  <ImageWrap item={{ socialImage: item.socialImage, alt: '' }}/>
                </Link>
              </div>
              <SPACER>
                <TEXT_GATSBY_LINK_H3 to={item.slug}>{item.title}</TEXT_GATSBY_LINK_H3>
              </SPACER>
            </TopContent>
        ))}
      </>
  );
};

export default Layout;
