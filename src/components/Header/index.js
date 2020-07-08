import React from 'react';
import tw from "twin.macro"
import SearchComponent from "../SearchBox";

const Header = ({}) => {
  const Nav = tw.nav`flex items-center justify-between flex-wrap bg-black p-6`;
  const SvgWrap = tw.div`flex items-center flex-shrink-0 text-white mr-6`;
  const Svg = tw.svg`fill-current h-8 w-8 mr-2 w-12 h-12`;
  const NavText = tw.span`font-semibold text-xl tracking-tight`;
  const Content = tw.div`w-full block flex-grow lg:flex lg:items-center lg:w-auto`;
  // TODO カテゴリーで一覧表示
  const ContentInner = tw.div`text-sm lg:flex-grow`;
  const ContentLink = tw.a`block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4`;

  return (
    <div>
      <Nav>
        <SvgWrap>
          <Svg width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/>
          </Svg>
          <NavText>YOUR TITLE</NavText>
        </SvgWrap>

        <Content>
          <ContentInner>
            <ContentLink href="/">
              Home
            </ContentLink>
            <ContentLink href="/category">
              Category
            </ContentLink>
            <ContentLink href="/tags">
              Tag
            </ContentLink>
          </ContentInner>
        </Content>
        <SearchComponent/>
      </Nav>
    </div>
  );
};

export default Header;
