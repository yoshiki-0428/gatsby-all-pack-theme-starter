import React from 'react';
import Author from '../Author';
import Content from './Content';
import Meta from './Meta';
import Tags from '../Tags';
import { ShareSns } from "../ShareSns/ShareSns";
import Disqus from 'gatsby-plugin-disqus';
import {useSiteMetadata} from "../../hooks";
import tw from "twin.macro";

const Post = ({ post }) => {
  const { id, html } = post;
  const { slug } = post.fields;
  const { title, date } = post.frontmatter;
  const { url } = useSiteMetadata();
  const tags = post.frontmatter.tags.map(tag => {
    return { fieldValue: tag }
  });

  // TODO 別コンポーねんと？
  const Inner = tw.div`mb-10`;
  const Card = tw.div`p-4 bg-white rounded-b shadow-md`;

  return (
    <div>

      <Inner>
        <Card>
          {/*TODO date*/}
          <Meta date={date} />
          <Content body={html} title={title} />
          <Tags tags={tags} urlPrefix={'tags'} />
          <ShareSns articleUrl={url + slug} articleTitle={title} />
        </Card>
      </Inner>

      <Inner>
        <Card>
          <Disqus
              identifier={id}
              title={title}
              url={url + slug}
          />
        </Card>
      </Inner>

      <Inner>
        <Author/>
      </Inner>
    </div>
  );
};

export default Post;
