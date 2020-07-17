import React from 'react';
import {useCategoriesList, usePopularList, useTagsList} from '../../hooks';
import tw from "twin.macro"
import Tags from "../Tags";
import Author from "../Author";
import Adsense from "../Adsense";
import Feed from "../Feed";
import InstantView from "../InstantView";

const SideBar = ({edges, toc}) => {
  const popularList = usePopularList();
  console.log(popularList)
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
      {popularList.length > 0 && (
          <Inner>
            <Card>
              <h3 tw="mt-2 mb-0 text-center font-bold">よく読まれている記事</h3>
              <hr tw="my-8 mx-auto w-1/5 border-gray-700"/>
              <InstantView items={popularList}/>
            </Card>
          </Inner>
      )}
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
      {toc &&(
          <Inner>
            <Card>
              <h3 tw="mt-0 mb-2 text-base font-bold">目次</h3>
              {toc}
            </Card>
          </Inner>
      )}
      <Adsense/>
    </Main>
  );
};

export default SideBar;
