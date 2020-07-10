import React from 'react';
import {useCategoriesList, useTagsList} from '../../hooks';
import tw from "twin.macro"
import Tags from "../Tags";
import Author from "../Author";

const SideBar = () => {
  const tags = useTagsList();
  const categories = useCategoriesList();

  const Main = tw.div`max-w-xl`;
  const Inner = tw.div`mb-10`;
  const Card = tw.div`p-4 bg-white rounded-b shadow-md`;

  return (
    <Main>
      <Inner>
        <Author/>
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
