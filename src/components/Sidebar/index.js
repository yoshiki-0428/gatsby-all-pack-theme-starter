import React from 'react';
import {useCategoriesList, usePopularList, useTagsList} from '../../hooks';
import Tags from "../Tags";
import Author from "../Author";
import Adsense from "../Adsense";
import InstantView from "../InstantView";
import {CARD, HR, SPACER, TITLE_H3} from "../Tailwind";
import "twin.macro";

const SideBar = ({ toc }) => {
  const popularList = usePopularList();
  const tags = useTagsList();
  const categories = useCategoriesList();

  return (
    <div>
      <CARD>
        <SPACER>
          <Author />
        </SPACER>
      </CARD>

      {popularList.length > 0 && (
        <CARD>
          <SPACER>
            <TITLE_H3>よく読まれている記事</TITLE_H3>
            <HR/>
            <InstantView items={popularList}/>
          </SPACER>
        </CARD>
      )}

      <CARD>
        <SPACER>
          <TITLE_H3>カテゴリー</TITLE_H3>
          <HR/>
          <Tags tags={categories} urlPrefix={'category'}/>
        </SPACER>
      </CARD>

      <CARD>
        <SPACER>
          <TITLE_H3>タグ一覧</TITLE_H3>
          <HR/>
          <Tags tags={tags} urlPrefix={'tags'}/>
        </SPACER>

      </CARD>

      {toc &&(
          <div tw="hidden lg:block">
            <CARD>
              <SPACER>
                <TITLE_H3>目次</TITLE_H3>
                <HR/>
                {toc}
              </SPACER>
            </CARD>
          </div>
      )}
      <Adsense/>
    </div>
  );
};

export default SideBar;
