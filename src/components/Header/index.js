import React from 'react';
import tw from "twin.macro"
import SearchComponent from "../SearchBox";
import { useCategoriesList, useSiteMetadata } from "../../hooks";
import { kebabCase } from 'lodash/string';
import { Link } from 'gatsby';
import {orderBy} from "lodash/collection";
import { CENTER_PHOTO_NORMAL } from "../Tailwind";

const Header = ({}) => {
  const { headerImage } = useSiteMetadata();

  const StickyDiv = tw.div`lg:sticky lg:top-0 lg:z-20 bg-white shadow-lg`;
  const Nav = tw.nav`flex items-center justify-between flex-wrap container mx-auto px-8`;
  const SvgWrap = tw.div`flex items-center flex-shrink-0 text-black mr-4`;
  const Svg = tw.svg`fill-current w-4 h-4`;
  const Content = tw.div`hidden md:w-1/2 md:flex-grow md:flex md:items-center`;
  const ContentInner = tw.div`text-base flex-grow flex-grow`;
  const NAV_GATSBY_LINK = ({ to, children }) =>
    <Link tw="block inline-block mr-4 text-xl font-bold text-gray-700 hover:text-blue-700 border-b-4 border-white hover:border-b-4 hover:border-blue-700 uppercase" to={to}>
      {children}
    </Link>;

  const categories = useCategoriesList();
  const sortTotalCount = (items) => orderBy(items, ['totalCount', 'fieldValue'], ['desc']).slice(0, 8);

  return (
    <StickyDiv>
      {headerImage && (<CENTER_PHOTO_NORMAL photo={headerImage} name={'header'}/>)}

      <Nav>
        <Link to={'/'}>
          <SvgWrap>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/>
            </Svg>
          </SvgWrap>
        </Link>

        <Content>
          <ContentInner>
            {sortTotalCount(categories).map(category => (
                <NAV_GATSBY_LINK to={`category/${kebabCase(category.fieldValue)}`}>{category.fieldValue}</NAV_GATSBY_LINK>
            ))}
          </ContentInner>
        </Content>
        <div tw="sm:w-1/3 lg:w-auto">
          <SearchComponent/>
        </div>
      </Nav>
    </StickyDiv>
  );
};

export default Header;
