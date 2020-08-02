import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import Tags from "../Tags/";
import ImageWrap from "../Image/ImageWrap";
import {
  BUTTON_CENTER, CARD,
  SPACER,
  TEXT_BASE_CENTER,
  TEXT_GATSBY_LINK,
  TEXT_GATSBY_LINK_H1,
} from "../Tailwind";

const Feed = ({ edges }) => {
  return (
      <div>
        {edges.map((edge) => (
            <CARD key={edge.node.fields.slug}>
              <SPACER>
                <TEXT_BASE_CENTER>
                  <time dateTime={moment(edge.node.frontmatter.date).format('YYYY/MM/DD')}>
                    {moment(edge.node.frontmatter.date).format('YYYY/MM/DD')}
                  </time>
                  {edge.node.frontmatter.updatedDate && (
                      <> (更新日:
                        <time dateTime={moment(edge.node.frontmatter.updatedDate).format('YYYY/MM/DD')}>
                          {moment(edge.node.frontmatter.updatedDate).format('YYYY/MM/DD')}
                        </time>
                        )
                      </>
                  )}
                </TEXT_BASE_CENTER>
                <TEXT_GATSBY_LINK_H1 to={edge.node.fields.slug}>
                  {edge.node.frontmatter.title}
                </TEXT_GATSBY_LINK_H1>

                <TEXT_GATSBY_LINK to={edge.node.fields.categorySlug}>
                  {edge.node.frontmatter.category}
                </TEXT_GATSBY_LINK>
              </SPACER>
              <Link to={edge.node.fields.slug}>
                <ImageWrap
                    size={'normal'}
                    item={{ socialImage: edge.node.frontmatter.socialImage }} />
              </Link>
              <SPACER>
                <TEXT_BASE_CENTER>{edge.node.excerpt}</TEXT_BASE_CENTER>
                <BUTTON_CENTER to={edge.node.fields.slug}>READ MORE</BUTTON_CENTER>
                <Tags tags={edge.node.frontmatter.tags.map(t => {
                  return { fieldValue: t }
                })} urlPrefix={'tags'}/>
              </SPACER>
            </CARD>
        ))}
      </div>
  )
};

export default Feed;
