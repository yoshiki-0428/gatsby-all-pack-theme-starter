import React from 'react';
import { Link } from 'gatsby';
import "twin.macro";
import tw from "twin.macro"
import ImageWrap from "../Image/ImageWrap";
import {SPACER, TEXT_GATSBY_LINK_H3} from "../Tailwind";

const InstantView = ({ items, flex }) => {
  const Width = flex ? tw.div`w-1/2` : tw.div`w-full`;
  const Div = flex ? tw.div`flex flex-wrap content-center` : tw.div``;

  return (
      <Div>
        {items.map((item) => (
            <Width key={item.slug}>
              <div tw="m-4 rounded overflow-hidden border border-base-gray-light bg-white">
                <Link to={item.slug}>
                  <ImageWrap
                      item={{ socialImage: item.socialImage, alt: item.alt }}/>
                </Link>
                <SPACER>
                  <TEXT_GATSBY_LINK_H3 to={item.slug}>{item.title}</TEXT_GATSBY_LINK_H3>
                </SPACER>
              </div>
            </Width>
        ))}
      </Div>
  )
};

export default InstantView;
