import React from 'react';
import Author from '../Author';
import Tags from '../Tags';
import { ShareSns } from "../ShareSns/ShareSns";
import Disqus from 'gatsby-plugin-disqus';
import {useSiteMetadata} from "../../hooks";
import tw from "twin.macro";
import Image from "../Image";
import {Link} from "gatsby";
import moment from "moment";

const Post = ({ post }) => {
  const { id, html } = post;
  const { slug } = post.fields;
  const { title, date, socialImage, category } = post.frontmatter;
  const { url } = useSiteMetadata();
  const tags = post.frontmatter.tags.map(tag => {
    return { fieldValue: tag }
  });

  // TODO 別コンポーねんと？
  const Inner = tw.div`mb-10`;
  const Card = tw.div`p-4 bg-white rounded-b shadow-md`;
  const ContentText = tw.div`font-bold text-2xl mb-2 text-center text-gray-800`;
  const ContentDate = tw.div`text-base mb-2 text-center`;
  const ContentCategory = tw.div`text-base mb-2 text-center text-blue-600`;

  return (
    <div>

      <Card>
        <ContentDate>
          <time dateTime={moment(date).format('YYYY/MM/DD')}>
            {moment(date).format('YYYY/MM/DD')}
          </time>
        </ContentDate>

        <ContentText>{title}</ContentText>
        <ContentCategory>
          <Link tw="no-underline" to={category}>
            {category}
          </Link>
        </ContentCategory>
      </Card>
      <Image
          background
          resolutions="small"
          alt={''}
          src={socialImage}
      />
      <Card>

        <div>
          <div className={'content'} dangerouslySetInnerHTML={{ __html: html }} />
        </div>

        <Tags tags={tags} urlPrefix={'tags'} />
        <ShareSns articleUrl={url + slug} articleTitle={title} />
      </Card>
      <Inner>
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
