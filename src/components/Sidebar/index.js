import React from 'react';
import {useCategoriesList, useSiteMetadata, useTagsList} from '../../hooks';
import tw from "twin.macro"
import Contacts from "../Contacts";
import Menu from "../Menu";
import Tags from "../Tags";

const SideBar = () => {
  const { author, copyright, menu } = useSiteMetadata();
  const tags = useTagsList();
  const categories = useCategoriesList();

  const Main = tw.div`max-w-xl`;
  const Inner = tw.div`mb-10`;
  const Card = tw.div`p-4 bg-white rounded-b shadow-md`;
  const ImgWrap = tw.span`flex justify-between`;
  const AuthorImg = tw.img`w-12 h-12 rounded-full`;
  const AuthorText = tw.p`p-2 text-base`;

  return (
    <Main>
      <Inner>
        {/*TODO Author切り出し*/}
        <Card>
          <ImgWrap>
            <div/><AuthorImg src={author.photo} alt={author.name} /><div/>
          </ImgWrap>
          <AuthorText>{author.bio}</AuthorText>
          <Contacts contacts={author.contacts} />
          <Menu items={menu}/>
        </Card>
      </Inner>
      <Inner>
        <Card>
          TODO Ranking view https://gotohayato.com/content/513/<br/>

          TODO wants? Archive YYYY MM
        </Card>
      </Inner>
      <Inner>
        <Card>
          <h3 tw="mt-0 mb-2 text-base font-bold">カテゴリー</h3>
          <Tags tags={categories} urlPrefix={'category'}/>
        </Card>
      </Inner>
      <Inner>
        <Card>
          <h3 tw="mt-0 mb-2 text-base font-bold">タグ一覧</h3>
          <Tags tags={tags} urlPrefix={'tags'}/>
        </Card>
      </Inner>
    </Main>
  );
};

export default SideBar;
