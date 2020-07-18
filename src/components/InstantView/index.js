import React from 'react';
import { Link } from 'gatsby';
import "twin.macro";
import tw from "twin.macro"
import ImageWrap from "../Image/ImageWrap";

const InstantView = ({ items }) => {
  const Main = tw.div`w-full rounded overflow-hidden border mb-10 bg-white`;
  const Content = tw.div`px-6 py-4`;
  const ContentText = tw.div`font-bold text-base mb-2 text-center text-gray-800 hover:underline`;

  return (
      <div>
        {items.map((item) => (
            <Main>
              <Link to={item.slug}>
                <ImageWrap
                    item={{ socialImage: item.socialImage, alt: item.alt }}/>
              </Link>
              <Content>
                <ContentText>
                  <Link tw="text-gray-700 no-underline" to={item.slug}>{item.title}</Link>
                </ContentText>
              </Content>
            </Main>
        ))}
      </div>
  )
};

export default InstantView;
