import React from 'react';
import { Link } from 'gatsby';
import "twin.macro";
import tw from "twin.macro"
import ImageWrap from "../Image/ImageWrap";

const InstantView = ({ items, flex }) => {

  const Content = tw.div`px-6 py-4`;
  const ContentText = tw.div`font-bold text-base mb-2 text-center text-gray-800 hover:underline`;

  const Width = flex ? tw.div`w-1/2` : tw.div`w-full`;
  const Div = flex ? tw.div`flex flex-wrap content-center` : tw.div``;

  return (
      <Div>
        {items.map((item) => (
            <Width>
              <div tw="m-4 rounded overflow-hidden border bg-white">
                <Link to={item.slug}>
                  <ImageWrap
                      item={{ socialImage: item.socialImage, alt: item.alt }}/>
                </Link>
                <Content>
                  <ContentText>
                    <Link tw="text-gray-700 no-underline" to={item.slug}>{item.title}</Link>
                  </ContentText>
                </Content>
              </div>
            </Width>
        ))}
      </Div>
  )
};

export default InstantView;
