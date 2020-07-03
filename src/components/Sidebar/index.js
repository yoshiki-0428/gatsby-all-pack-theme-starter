import React from 'react';
import {useCategoriesList, useSiteMetadata, useTagsList} from '../../hooks';
import tw from "twin.macro"

const SideBar = () => {
  const { author, copyright, menu } = useSiteMetadata();
  const tags = useTagsList();
  const categories = useCategoriesList();

  const Main = tw.div`max-w-xl`;
  const Inner = tw.div`mb-10`;
  const AuthorDiv = tw.div`p-4 bg-white rounded-b shadow-md`;
  const ImgWrap = tw.span`flex justify-between`;
  const AuthorImg = tw.img`w-12 h-12 rounded-full`;
  const AuthorText = tw.p`p-2 text-base`;

  return (
    <Main>
      <Inner>
        <AuthorDiv>
          <ImgWrap>
            <div/><AuthorImg src={author.photo} alt={author.name} /><div/>
          </ImgWrap>
          <AuthorText>{author.bio}</AuthorText>
        </AuthorDiv>
      </Inner>
      <Inner>
        <div tw="p-4 bg-white rounded-b shadow-md">
          TODO SearchBox
          TODO UserInfoLink
          TODO Ranking view https://gotohayato.com/content/513/
          TODO Archive YYYY MM
          TODO Category
          TODO Tags
        </div>
      </Inner>
    </Main>
  );
};

export default SideBar;
