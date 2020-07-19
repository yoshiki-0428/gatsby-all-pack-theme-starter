import React from 'react';
import tw from "twin.macro"
import SearchComponent from "../SearchBox";
import {useCategoriesList} from "../../hooks";
import { kebabCase } from 'lodash/string';
import { Link } from 'gatsby';
import {orderBy} from "lodash/collection";

const Header = ({}) => {
  const StickyDiv = tw.div`sticky top-0 z-20`;
  const Nav = tw.nav`flex items-center justify-between flex-wrap bg-white shadow-lg p-6`;
  const SvgWrap = tw.div`flex items-center flex-shrink-0 text-black mr-6`;
  const Svg = tw.svg`fill-current w-4 h-4`;
  const Content = tw.div`w-1/2 block flex-grow flex items-center`;
  const ContentInner = tw.div`text-base flex-grow flex-grow`;
  const NAV_GATSBY_LINK = ({ to, children }) =>
    <Link tw="block inline-block mr-4 text-xl font-bold text-gray-700 hover:text-blue-700 border-b-2 border-white hover:border-b-2 hover:border-blue-700 uppercase" to={to}>
      {children}
    </Link>;

  const categories = useCategoriesList();
  // TODO max categoryを定数化
  const sortTotalCount = (items) => orderBy(items, ['totalCount', 'fieldValue'], ['desc']).slice(0, 8);

  return (
    <StickyDiv>
      <Nav>
        <Link to={'/'}>
          <SvgWrap>
            <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
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
        <SearchComponent/>
      </Nav>
    </StickyDiv>
  );
};

export default Header;
