import React from 'react';
import Author from '../Author';
import Tags from '../Tags';
import { ShareSns } from "../ShareSns/ShareSns";
import Disqus from 'gatsby-plugin-disqus';
import {useAllMarkdownRemarkForPopularList, useSiteMetadata} from "../../hooks";
import moment from "moment";
import ImageWrap from "../Image/ImageWrap";
import InstantView from "../InstantView";
import { kebabCase } from 'lodash/string';
import {CARD, HR, SPACER, TEXT_BASE_CENTER, TEXT_GATSBY_LINK, TITLE_H1, TITLE_H3} from "../Tailwind";

const Post = ({ post }) => {
  const { id, html } = post;
  const { slug } = post.fields;
  const { title, date, socialImage, category, relatedLinks } = post.frontmatter;
  const { url } = useSiteMetadata();
  const articles = useAllMarkdownRemarkForPopularList();

  const relatedArticles = articles.filter(a => relatedLinks && relatedLinks.includes(a.fields.slug)).map(a => {
    return {
      slug: a.fields.slug,
      title: a.frontmatter.title,
      socialImage: a.frontmatter.socialImage,
    }
  });
  const tags = post.frontmatter.tags.map(tag => {
    return { fieldValue: tag }
  });

  return (
    <div>
      <CARD mb>
        <SPACER>
          <TEXT_BASE_CENTER>
            <time dateTime={moment(date).format('YYYY/MM/DD')}>
              {moment(date).format('YYYY/MM/DD')}
            </time>
          </TEXT_BASE_CENTER>

          <TITLE_H1>{title}</TITLE_H1>
          <TEXT_GATSBY_LINK to={`category/${kebabCase(category)}`}>{category}</TEXT_GATSBY_LINK>
        </SPACER>
      </CARD>
      <ImageWrap item={{socialImage: socialImage}} size={'normal'} />
      <CARD top>
        <SPACER>
          <div>
            <div className={'content'} dangerouslySetInnerHTML={{ __html: html }} />
          </div>
          <Tags tags={tags} urlPrefix={'tags'} />
          <ShareSns articleUrl={url + slug} articleTitle={title} />
        </SPACER>
      </CARD>

      <CARD>
        <SPACER>
          <Disqus
                identifier={id}
                title={title}
                url={url + slug}
            />
        </SPACER>
      </CARD>

      {relatedArticles.length > 0 && (
          <CARD>
            <SPACER>
              <TITLE_H3>Related Links</TITLE_H3>
              <HR/>
              <InstantView flex items={relatedArticles} />
            </SPACER>
          </CARD>
      )}
      <CARD>
        <SPACER>
          <Author/>
        </SPACER>
      </CARD>
    </div>
  );
};

export default Post;
