import React from 'react';
import {useCategoriesList, useTagsList} from '../../hooks';
import tw from "twin.macro"
import Tags from "../Tags";
import Author from "../Author";
import Adsense from "../Adsense";
import Feed from "../Feed";

const SideBar = ({toc}) => {
  const tags = useTagsList();
  const categories = useCategoriesList();

  const Main = tw.div`max-w-xl`;
  const Inner = tw.div`mb-10`;
  const Card = tw.div`p-4 bg-white rounded-b shadow-md`;

  //TODO 試作
  const json = JSON.parse(`[{"node":{"fields":{"slug":"/posts/try-eventsource-client2","categorySlug":"/category/frontend/"},"frontmatter":{"title":"ネイティブEventSourceクライアントとその他EventSourceクライアントを試してみた結果","date":"2020-06-20T09:00:00.000Z","category":"Frontend","socialImage":"https://ucarecdn.com/b2035108-5e4e-4569-be86-b9bfc2f7a1aa/"},"excerpt":"はじめに 今の案件でリアルタイム処理をする要件があり、SSE（Server Sent Event）のEventSource Clientライブラリを色々比較してみたので、これからクライアントで検討する際は参考に！ 内容 EventSource まずネイティブEventSource…"}},{"node":{"fields":{"slug":"/posts/try-eventsource","categorySlug":"/category/frontend/"},"frontmatter":{"title":"ネイティブEventSourceクライアントとその他EventSourceクライアントを試してみた結果","date":"2020-06-20T09:00:00.000Z","category":"Frontend","socialImage":"https://ucarecdn.com/1c3706e0-1090-48c1-ad74-f10e9cbce307/"},"excerpt":"はじめに 今の案件でリアルタイム処理をする要件があり、SSE（Server Sent Event）のEventSource Clientライブラリを色々比較してみたので、これからクライアントで検討する際は参考に！ 内容 EventSource まずネイティブEventSource…"}}]`);

  return (
    <Main>
      <Inner>
        <Author/>
      </Inner>
      <Inner>
        <Card>
          <h3 tw="mt-0 mb-2 text-base font-bold">よく読まれている記事</h3>
          <Feed edges={json} />
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
