import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import "twin.macro";
import tw from "twin.macro"
import Image from "../Image";
import Tags from "../Tags/";

const InstantView = ({ items }) => {
  // tailwindcss
  const Main = tw.div`w-full rounded overflow-hidden border mb-10 bg-white`;
  const Content = tw.div`px-6 py-4`;
  const ContentDate = tw.div`text-base mb-2 text-center`;
  const ContentText = tw.div`font-bold text-xl mb-2 text-center text-gray-800 hover:underline`;
  const ContentCategory = tw.div`text-base mb-2 text-center text-blue-600`;
  const ContentExcerpt = tw.p`text-gray-700 text-center text-base`;
  const ButtonWrap = tw.div`pt-0 pb-4 text-center`;
  const Button = tw.button`bg-transparent hover:underline font-semibold py-2 px-4 border rounded`;

  return (
      <div>
        {items.map((item) => (
            <Main>
              <Link  to={item.slug}>
                <Image
                    background
                    resolutions="small"
                    alt={''}
                    src={item.socialImage}
                />
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
