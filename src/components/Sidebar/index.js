import React from 'react';
import {useCategoriesList, useSiteMetadata, useTagsList} from '../../hooks';
import tw from "twin.macro"

const SideBar = () => {
  const { author, copyright, menu } = useSiteMetadata();
  const tags = useTagsList();
  const categories = useCategoriesList();

  const Main = tw.div`max-w-sm w-full`;
  const Inner = tw.div`bg-white rounded-b p-6`;
  const AuthorDiv = tw.div`bg-gray-200 p-4`;
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
    </Main>
  );
};

export default SideBar;
