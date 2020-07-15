import React from 'react';
import tw from "twin.macro"
import SearchComponent from "../SearchBox";
import {useCategoriesList, useSiteMetadata} from "../../hooks";
import { kebabCase } from 'lodash/string';
import { Link } from 'gatsby';
import {orderBy} from "lodash/collection";

const Header = ({}) => {
  const Nav = tw.nav`flex items-center justify-between flex-wrap bg-black p-6`;
  const SvgWrap = tw.div`flex items-center flex-shrink-0 text-white mr-6`;
  const Svg = tw.svg`fill-current h-8 w-8 mr-2 w-12 h-12`;
  const NavText = tw.span`font-semibold text-xl tracking-tight`;
  const Content = tw.div`w-full block flex-grow lg:flex lg:items-center lg:w-auto`;

  const { title } = useSiteMetadata();
  const categories = useCategoriesList();
  const sortTotalCount = (items) => orderBy(items, ['totalCount', 'fieldValue'], ['desc']);
  const ContentInner = tw.div`text-base md:flex-grow lg:flex-grow`;

  return (
    <div>
      <Nav>
        <Link to={'/'}>
          <SvgWrap>
            <Svg width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/>
            </Svg>
            {/*TODO env*/}
            <NavText>{title}</NavText>
          </SvgWrap>
        </Link>

        <Content>
          <ContentInner>
            {sortTotalCount(categories).map(category => (
                <Link tw="block mt-4 lg:inline-block lg:mt-0 text-teal-200 text-white mr-4"
                      to={`category/${kebabCase(category.fieldValue)}`}>{category.fieldValue}</Link>
            ))}
          </ContentInner>
        </Content>
        <SearchComponent/>
      </Nav>
    </div>
  );
};

export default Header;
